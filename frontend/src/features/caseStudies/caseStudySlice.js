import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

// GET
export const fetchCaseStudies = createAsyncThunk(
  "caseStudies/fetchCaseStudies",
  async () => {
    const res = await api.get("/casestudies");
    return res.data;
  }
);

// ADD
export const addCaseStudy = createAsyncThunk(
  "caseStudies/addCaseStudy",
  async (data) => {
    const res = await api.post("/casestudies", data);
    return res.data;
  }
);

// UPDATE
export const updateCaseStudy = createAsyncThunk(
  "caseStudies/updateCaseStudy",
  async ({ id, data }) => {
    const res = await api.put(`/casestudies/${id}`, data);
    return res.data;
  }
);

// DELETE
export const deleteCaseStudy = createAsyncThunk(
  "caseStudies/deleteCaseStudy",
  async (id) => {
    await api.delete(`/casestudies/${id}`);
    return id;
  }
);

const caseStudySlice = createSlice({
  name: "caseStudies",
  initialState: {
    caseStudies: [],
    loading: false,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCaseStudies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCaseStudies.fulfilled, (state, action) => {
        state.loading = false;
        state.caseStudies = action.payload;
      })

      .addCase(addCaseStudy.fulfilled, (state, action) => {
        state.caseStudies.unshift(action.payload);
      })

      .addCase(updateCaseStudy.fulfilled, (state, action) => {
        state.caseStudies = state.caseStudies.map((c) =>
          c._id === action.payload._id ? action.payload : c
        );
      })

      .addCase(deleteCaseStudy.fulfilled, (state, action) => {
        state.caseStudies = state.caseStudies.filter(
          (c) => c._id !== action.payload
        );
      });
  },
});

export default caseStudySlice.reducer;