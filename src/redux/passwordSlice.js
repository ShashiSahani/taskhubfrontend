import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); 
      if (!token) throw new Error("User not authenticated");

      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL
        }/auth/change-password`,
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

const passwordSlice = createSlice({
  name: "password",
  initialState: { loading: false, success: false, error: null },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload?.message || "Failed to change password";
      });
  },
});

export const { resetState } = passwordSlice.actions;
export default passwordSlice.reducer;
