import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/api";
import { toast } from "react-toastify";


export const subscribeNewsletter = createAsyncThunk(
  "newsletter/subscribe",
  async (email, { rejectWithValue }) => {
    try {
      const response = await API.post("newsletter/subscribe", { email });
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data); 
    }
  }
);

// Slice
const newsletterSlice = createSlice({
  name: "newsletter",
  initialState: {
    status: "idle",
    message: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(subscribeNewsletter.pending, (state) => {
        state.status = "loading";
        state.message = "";
        state.error = null;
      })
      .addCase(subscribeNewsletter.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message || "Subscribed successfully!";
        toast.success(state.message)
    })
      .addCase(subscribeNewsletter.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.error || "Subscription failed!";
        toast.error(state.error)
      });
  },
});

export default newsletterSlice.reducer;
