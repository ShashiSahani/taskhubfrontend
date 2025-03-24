import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_REACT_APP_API_URL}/tasks`;

export const fetchAllTasks = createAsyncThunk("tasks/fetchAll", async () => {
  const response = await axios.get(API_URL);
  return response.data; 
});

export const addNewTask = createAsyncThunk("tasks/add", async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
});

export const removeTask = createAsyncThunk("tasks/delete", async (taskId) => {
  await axios.delete(`${API_URL}/${taskId}`);
  return taskId; 
});


export const updateTask=createAsyncThunk("tasks/update",async(task)=>{
    const response=await axios.put(`${API_URL}/${task._id}`,task)
    return response.data;
})



const taskSlice = createSlice({
  name: "tasks",
  initialState: { tasks: [], status: "idle" },
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchAllTasks.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addNewTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload); 
      })
      .addCase(updateTask.fulfilled,(state,action)=>{
        const index = state.tasks.findIndex((t) => t._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload; 
        }
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
