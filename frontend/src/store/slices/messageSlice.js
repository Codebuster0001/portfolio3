// src/store/slices/messageSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendContactMessage = createAsyncThunk(
  "message/sendContactMessage",
  async ({ name, email, message }, thunkAPI) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/message/contact",
        {
          name,
          email,
          message,
        }
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to send message"
      );
    }
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    clearMessageState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendContactMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendContactMessage.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendContactMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessageState } = messageSlice.actions;
export default messageSlice.reducer;
