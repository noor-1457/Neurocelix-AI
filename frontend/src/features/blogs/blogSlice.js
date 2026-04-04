import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/api/blogs";

/* ================= ALL BLOGS ================= */
export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async () => {
    const res = await axios.get(API);
    return res.data;
  }
);

/* ================= SINGLE BLOG ================= */
export const fetchBlogById = createAsyncThunk(
  "blogs/fetchBlogById",
  async (id) => {
    const res = await axios.get(`${API}/${id}`);
    return res.data;
  }
);

/* ================= ADD BLOG ================= */
export const addBlog = createAsyncThunk(
  "blogs/addBlog",
  async (blogData, { rejectWithValue }) => {
    try {
      const res = await axios.post(API, blogData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ================= UPDATE BLOG ✅ ================= */
export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async ({ id, blogData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API}/${id}`, blogData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ================= DELETE BLOG ================= */
export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ================= ADD COMMENT ================= */
export const addComment = createAsyncThunk(
  "blogs/addComment",
  async ({ blogId, comment }) => {
    const res = await axios.post(`${API}/${blogId}/comment`, comment);
    return res.data;
  }
);

/* ================= SLICE ================= */
const blogSlice = createSlice({
  name: "blogs",

  initialState: {
    blogs: [],
    singleBlog: null,
    loading: false,
    error: null,
    success: false,
  },

  reducers: {
    resetBlogState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder
      /* FETCH BLOGS */
      .addCase(fetchBlogs.pending, (state) => { state.loading = true; })
      .addCase(fetchBlogs.fulfilled, (state, action) => { state.loading = false; state.blogs = action.payload; })
      .addCase(fetchBlogs.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      /* FETCH SINGLE BLOG */
      .addCase(fetchBlogById.pending, (state) => { state.loading = true; })
      .addCase(fetchBlogById.fulfilled, (state, action) => { state.loading = false; state.singleBlog = action.payload; })
      .addCase(fetchBlogById.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      /* ADD BLOG */
      .addCase(addBlog.pending, (state) => { state.loading = true; })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.blogs.unshift(action.payload);
      })
      .addCase(addBlog.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      /* UPDATE BLOG ✅ */
      .addCase(updateBlog.pending, (state) => { state.loading = true; })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // update blog in blogs array
        state.blogs = state.blogs.map(blog =>
          blog._id === action.payload._id ? action.payload : blog
        );
        // update singleBlog if it's the same one
        if (state.singleBlog && state.singleBlog._id === action.payload._id) {
          state.singleBlog = action.payload;
        }
      })
      .addCase(updateBlog.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      /* DELETE BLOG */
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter(blog => blog._id !== action.payload);
      })

      /* ADD COMMENT */
      .addCase(addComment.fulfilled, (state, action) => {
        state.singleBlog = action.payload;
      });
  },
});

/* EXPORT ACTIONS */
export const { resetBlogState } = blogSlice.actions;
export default blogSlice.reducer;