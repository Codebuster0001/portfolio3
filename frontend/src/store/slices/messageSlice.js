import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to send contact form message with timeout
export const sendContactMessage = createAsyncThunk(
  "message/sendContactMessage",
  async ({ name, email, message }, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://portfolio-1dkv.onrender.com/api/v1/message/contact",
        { name, email, message },
        {
          timeout: 7000, // optional timeout
          withCredentials: true, // optional if you're using cookies/auth
        }
      );
      return response.data.message; // Return message string
    } catch (error) {
      console.error("Error sending message:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to send message"
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
        state.error = action.payload || "Something went wrong.";
      });
  },
});

export const { clearMessageState } = messageSlice.actions;
export default messageSlice.reducer;
