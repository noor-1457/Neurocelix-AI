import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

/* ================= FETCH SERVICES ================= */
export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/services");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ================= ADD SERVICE ================= */
export const addService = createAsyncThunk(
  "services/addService",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/services", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ================= UPDATE SERVICE ================= */
export const updateService = createAsyncThunk(
  "services/updateService",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/services/${id}`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ================= DELETE SERVICE ================= */
export const deleteService = createAsyncThunk(
  "services/deleteService",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/services/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ================= SLICE ================= */
const serviceSlice = createSlice({
  name: "services",
  initialState: {
    services: [],
    loading: false,
    error: null,
    success: false,
  },

  reducers: {
    resetServiceState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchServices.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchServices.fulfilled, (state, action) => { state.loading = false; state.services = action.payload; })
      .addCase(fetchServices.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // ADD
      .addCase(addService.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(addService.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.services.unshift(action.payload);
      })
      .addCase(addService.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // UPDATE
      .addCase(updateService.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(updateService.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.services = state.services.map(s =>
          s._id === action.payload._id ? action.payload : s
        );
      })
      .addCase(updateService.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // DELETE
      .addCase(deleteService.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.loading = false;
        state.services = state.services.filter(s => s._id !== action.payload);
      })
      .addCase(deleteService.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

/* EXPORT ACTIONS */
export const { resetServiceState } = serviceSlice.actions;

export default serviceSlice.reducer;