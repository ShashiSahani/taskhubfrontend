import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../utils/api';

// Async Thunk for updating user profile
export const updateUserProfile = createAsyncThunk(
    'user/updateProfile',
    async ({ userId, formData }, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem('token');
        const response = await API.put(  // ✅ Use API instance
          `/auth/user/${userId}`, 
          formData, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data", // ✅ Needed for file upload
            },
          }
        );
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data.user;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Update failed');
      }
    }
  );
  

const storedUser = localStorage.getItem('user');
const parsedUser = storedUser ? JSON.parse(storedUser) : null;

const initialState = {
  user: parsedUser,
  loading: false,
  error: null,
};

console.log("Loaded user from Redux state:", initialState.user); // Debugging log


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
