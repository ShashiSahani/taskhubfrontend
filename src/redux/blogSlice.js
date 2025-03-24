import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBlogs, addBlogApi, deleteBlogApi, fetchBlogsById, fetchSimilarBlogs, API_URL } from "../api/blogApi";

// Async thunk to fetch blogs
export const fetchBlogsThunk = createAsyncThunk("blogs/fetchBlogs", async (_, { rejectWithValue }) => {
  try {
    const data = await fetchBlogs();
    if (data.error) throw new Error(data.error);
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const addBlogThunk = createAsyncThunk("blogs/addBlog", async (blogData, { rejectWithValue }) => {
  try {
    const data = await addBlogApi(blogData);
    if (data.error) throw new Error(data.error);
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteBlogThunk = createAsyncThunk("blogs/deleteBlog", 
  async (id, { rejectWithValue }) => {
  try {
    await deleteBlogApi(id);
    return id; 
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
export const fetchBlogByIdThunk = createAsyncThunk("blogs/fetchBlogById",
   async (id, { rejectWithValue }) => {
  try {
    const data = await fetchBlogsById(id);
    if (data.error) throw new Error(data.error);
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
export const fetchSimilarBlogsThunk = createAsyncThunk("blogs/fetchSimilarBlogs", async (id, { rejectWithValue }) => {
  try {
    const data = await fetchSimilarBlogs(id);
    if (data.error) throw new Error(data.error);
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
export const likeBlogThunk = createAsyncThunk(
  "blogs/likeBlog",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${id}/like`, { method: "POST" });
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const dislikeBlogThunk = createAsyncThunk(
  "blogs/dislikeBlog",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${id}/dislike`, { method: "POST" });
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    selectedBlog: null,
    similarBlogs: [],
    loading: false,
    
    error: null,
  },
  reducers: {}, // No direct reducers, using async thunks
  extraReducers: (builder) => {
    builder
      // Fetch blogs
      .addCase(fetchBlogsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add blog
      .addCase(addBlogThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBlogThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.push(action.payload);
      })
      .addCase(addBlogThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete blog
      .addCase(deleteBlogThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBlogThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
      })
      .addCase(deleteBlogThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSimilarBlogsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSimilarBlogsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.similarBlogs = action.payload;
      })
      .addCase(fetchSimilarBlogsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }) .addCase(fetchBlogByIdThunk.pending, (state) => {
        state.loading = true;
        state.selectedBlog = null;
        state.error = null;
      })
      .addCase(fetchBlogByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBlog = action.payload;
      })
      .addCase(fetchBlogByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  
      .addCase(likeBlogThunk.fulfilled, (state, action) => {
        if (state.selectedBlog) state.selectedBlog.likes = action.payload.likes;
      })
      .addCase(dislikeBlogThunk.fulfilled, (state, action) => {
        if (state.selectedBlog) state.selectedBlog.dislikes = action.payload.dislikes;
      });
  },
});

export default blogSlice.reducer;
