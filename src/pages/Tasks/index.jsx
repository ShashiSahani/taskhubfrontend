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
      dispatch(addNewTask({ text: task }))
        .unwrap()
        .then(() => {
          toast.success("Task added successfully!");
          setTask("");
        })
        .catch(() => {
          toast.error("Failed to add task.");
        });
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
    dispatch(updateTask(updatedTask))
      .unwrap()
      .then(() => {
        toast.success(
          `Task marked as ${updatedTask.completed ? "Completed" : "Pending"}`
        );
      });
  };

  const saveUpdateTask = () => {
    if (task.trim() !== "" && editTask) {
      const updatedTask = { _id: editTask, text: task };
      dispatch(updateTask(updatedTask))
        .unwrap()
        .then(() => {
          toast.success("Task Updated successfully!");
          setTask("");
          setEditTask(null);
        })
        .catch(() => {
          toast.error("Failed to update task.");
        });
    }
  };

  const confirmDelete = (id) => {
    DeleteConfirmationToast({
      onConfirm: () => deleteTask(id),
      onCancel: () =>
        toast.info("Delete canceled", {
          position: "top-center",
          autoClose: 3000,
        }),
    });
  };

  return (
    <div className="max-w-lg mx-auto p-4 sm:p-6">
      <ToastContainer />
      <Typography
        variant="h5"
        className="text-gray-800 font-semibold text-center mb-4"
      >
        <div className="flex items-center justify-center">
          Task Manager
          <img src={smile} alt="Task Manager" className="w-8 h-8 rounded-full ml-2" />
        </div>
      </Typography>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative w-full">
          <textarea
            className="w-full placeholder-gray-500 text-gray-700 text-sm rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 resize-none"
            placeholder="Add a new task..."
            value={task}
            rows={2}
            onChange={(e) => setTask(e.target.value)}
          />
          {task && (
            <X
              className="absolute right-3 top-2 cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={() => setTask("")}
            />
          )}
        </div>
        <button
          onClick={editTask !== null ? saveUpdateTask : addTask}
          className="bg-primary-dark text-white  rounded-md px-5  "
        >
          {editTask !== null ? "Save" : "Add"}
        </button>
      </div>

      <div className="flex gap-3 mb-3 flex-wrap">
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
        <Button
          onClick={() => setShowCompleted(null)}
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
        >
          All
        </Button>
      </div>

      <div className="space-y-2">
        {tasks?.filter((t) =>
          showCompleted === null ? true : t.completed === showCompleted
        ).length === 0 ? (
          <div className="text-center text-gray-600 mt-4">
            No tasks available.
          </div>
        ) : (
          tasks
            .filter((t) =>
              showCompleted === null ? true : t.completed === showCompleted
            )
            .map((task) => (
              <li
                key={task._id}
                className="flex justify-between items-center bg-gray-100 p-3 rounded-md shadow-sm"
              >
                <span
                  className={`text-sm ${
                    task.completed ? "line-through text-gray-500" : "text-gray-800"
                  }`}
                >
                  {task.text}
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => toggleComplete(task)}
                    className={`px-2 py-1 text-xs rounded-md ${
                      task.completed
                        ? "bg-green-500 cursor-not-allowed"
                        : "bg-yellow-500 text-white"
                    }`}
                    disabled={task.completed}
                  >
                    {task.completed ? "Completed" : "Complete"}
                  </Button>
                  {!task.completed && (
                    <Pencil
                      className="cursor-pointer text-blue-500 hover:text-blue-700"
                      onClick={() => handleEditTasks(task)}
                      size={18}
                    />
                  )}
                  <Trash
                    className="cursor-pointer text-red-500 hover:text-red-700"
                    onClick={() => confirmDelete(task._id)}
                    size={18}
                  />
                </div>
              </li>
            ))
        )}
      </div>
    </div>
  );
}

export default TaskIndex;
