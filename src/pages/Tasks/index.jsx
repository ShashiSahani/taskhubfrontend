import { Typography, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Pencil, Trash, X } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import smile from "../../../public/smile.gif";
import DeleteConfirmationToast from "../../comman/DeleteConfirmationToast";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllTasks,
  addNewTask,
  removeTask,
  updateTask,
} from "../../redux/taskSlice";

function TaskIndex() {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const [task, setTask] = useState("");
  const [editTask, setEditTask] = useState(null);
  const [showCompleted, setShowCompleted] = useState(null);

  useEffect(() => {
    dispatch(fetchAllTasks());
  }, [dispatch]);

  const addTask = () => {
    if (task.trim() !== "") {
      console.log("Adding Task:", task);

      dispatch(addNewTask({ text: task }))
        .unwrap()
        .then((res) => {
          console.log("Task added successfully:", res);
          toast.success("Task added successfully!");
        })
        .catch((err) => {
          console.error("Error adding task:", err);
          toast.error("Failed to add task.");
        });

      setTask("");
    }
  };

  const deleteTask = (id) => {
    dispatch(removeTask(id));
  };

  const handleEditTasks = (task) => {
    setTask(task.text);
    setEditTask(task._id);
  };

  const toggleComplete = (task) => {
    const updatedTask = { ...task, completed: !task.completed };
    dispatch(updateTask(updatedTask)).unwrap().then(()=>{
      toast.success(`Task marked as ${updatedTask.completed?"Completed":"Pending"}`)
    })
  };


  const saveUpdateTask=()=>{
    if(task.trim()!=="" && editTask){
      const updatedTask={_id:editTask,text:task};
      dispatch(updateTask(updatedTask))
      .unwrap()
      .then(()=>{
        toast.success("Task Updated sucessfully!");

      }).catch(()=>{
        toast.error("failed to update task.")
      });
      setTask("");
      setEditTask(null);
    }
  }
  const confirmDelete = (id) => {
    DeleteConfirmationToast({
      onConfirm: () => deleteTask(id),
      onCancel: () =>
        toast.info("Delete Canceled", {
          position: "top-center",
          autoClose: 9000,
        }),
    });
  };  return (
    <div className="max-w-lg mx-auto p-5 rounded-lg">
      <ToastContainer />

      <Typography
        variant="h5"
        className="text-gray-800 font-semibold text-center mb-4"
      >
        <div className="flex items-center justify-center">
          Task Manager
          <img src={smile} alt="Task Manager" className="w-8 h-8 rounded-full ml-2"/>
        </div>
      </Typography>

      <div className="flex gap-3 mb-4">
        <div className="relative w-full">
          <input
            className="w-full placeholder-gray-500 text-gray-700 text-sm rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Add a new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          {task && (
            <X
              className="absolute right-3 top-2 cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={() => setTask("")}
            />
          )}
        </div>
        <Button
         onClick={editTask !== null ? saveUpdateTask : addTask} 
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          {editTask !== null ? "Save" : "Add"}
        </Button>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={() => setShowCompleted(false)}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md"
        >
          Pending
        </Button>
        <Button
          onClick={() => setShowCompleted(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Complete
        </Button>
      </div>
      {tasks?.filter((task) =>
        showCompleted === null ? true : task.completed === showCompleted
      ).length === 0 ? (
        <div className="text-center text-primary-dark mt-4">
          No Completed tasks for now.
        </div>
      ) : (
        tasks
          .filter((task) =>
            showCompleted === null ? true : task.completed === showCompleted
          )
          .map((task) => (
            <li
              key={task._id}
              className="flex justify-between items-center bg-gray-100 p-2 my-2 rounded-md"
            >
              <span
                className={`text-gray-800 ${
                  task.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {task.text}
              </span>
              <div className="flex gap-2">
                <Button
                  onClick={() => toggleComplete(task)}
                  className={`px-2 py-1 rounded-md ${
                    task.completed
                      ? "bg-green-500 cursor-not-allowed"
                      : "bg-yellow-500 text-white"
                  }`}
                  disabled={task.completed}
                >
                  {task.completed ? "Completed" : "Mark Complete"}
                </Button>
                {!task.completed && (
                  <Pencil
                    className="cursor-pointer text-blue-500 hover:text-blue-700"
                    onClick={() => handleEditTasks(task)}
                  />
                )}
                <Trash
                  className="cursor-pointer text-red-500 hover:text-red-700"
                  onClick={() => confirmDelete(task._id)}
                />
              </div>
            </li>
          ))
      )}
    </div>
  );
}

export default TaskIndex;
