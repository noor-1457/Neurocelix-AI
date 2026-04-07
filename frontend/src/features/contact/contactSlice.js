import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

/* ================= CREATE CONTACT ================= */

export const sendContactMessage = createAsyncThunk(
  "contacts/sendContactMessage",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/contact", formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ================= FETCH ALL CONTACTS ================= */

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/contact");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ================= UPDATE CONTACT ✅ ================= */

export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/contact/${id}`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ================= DELETE CONTACT ================= */

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/contact/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ================= SLICE ================= */

const contactSlice = createSlice({
  name: "contacts",

  initialState: {
    contacts: [],
    loading: false,
    success: false,
    error: null,
  },

  reducers: {
    resetContactState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* CREATE */
      .addCase(sendContactMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendContactMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        //  instant UI update
        state.contacts.unshift(action.payload);
      })
      .addCase(sendContactMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* FETCH */
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* UPDATE  */
      .addCase(updateContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.contacts = state.contacts.map((contact) =>
          contact._id === action.payload._id
            ? action.payload
            : contact
        );
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* DELETE */
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          (c) => c._id !== action.payload
        );
      });
  },
});

/* EXPORT ACTIONS */
export const { resetContactState } = contactSlice.actions;

export default contactSlice.reducer;