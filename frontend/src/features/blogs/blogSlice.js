import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

/* ================= ALL BLOGS ================= */
export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/blogs");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ================= SINGLE BLOG ================= */
export const fetchBlogById = createAsyncThunk(
  "blogs/fetchBlogById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/blogs/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ================= ADD BLOG ================= */
export const addBlog = createAsyncThunk(
  "blogs/addBlog",
  async (blogData, { rejectWithValue }) => {
    try {
      const res = await api.post("/blogs", blogData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ================= UPDATE BLOG ================= */
export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async ({ id, blogData }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/blogs/${id}`, blogData);
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
      await api.delete(`/blogs/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ================= ADD COMMENT ================= */
export const addComment = createAsyncThunk(
  "blogs/addComment",
  async ({ blogId, comment }, { rejectWithValue }) => {
    try {
      const res = await api.post(`/blogs/${blogId}/comments`, comment);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
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
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* FETCH SINGLE BLOG */
      .addCase(fetchBlogById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleBlog = action.payload;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ADD BLOG */
      .addCase(addBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.blogs.unshift(action.payload);
      })

      /* UPDATE BLOG */
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.blogs = state.blogs.map((blog) =>
          blog._id === action.payload._id ? action.payload : blog
        );

        if (
          state.singleBlog &&
          state.singleBlog._id === action.payload._id
        ) {
          state.singleBlog = action.payload;
        }
      })

      /* DELETE BLOG */
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter(
          (blog) => blog._id !== action.payload
        );
      })

      /* ADD COMMENT */
    .addCase(addComment.fulfilled, (state, action) => {
  if (state.singleBlog?.comments) {
    state.singleBlog.comments = action.payload.comments; 
  }
});
  },
});

export const { resetBlogState } = blogSlice.actions;
export default blogSlice.reducer;