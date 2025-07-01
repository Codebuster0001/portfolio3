import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";

// ✅ Thunks
export const getAllMessages = createAsyncThunk(
  "messages/getAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get("/api/v1/message/getall");
      return data.messages;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const deleteMessage = createAsyncThunk(
  "messages/delete",
  async (id, thunkAPI) => {
    try {
      const { data } = await axiosInstance.delete(`/api/v1/message/delete/${id}`);
      return { message: data.message, id };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// ✅ Slice
const messageSlice = createSlice({
  name: "messages",
  initialState: {
    loading: false,
    messages: [],
    message: null,
    error: null,
  },
  reducers: {
    clearAllErrors: (state) => {
      state.error = null;
    },
    resetMessageSlice: (state) => {
      state.message = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(getAllMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.messages = state.messages.filter((msg) => msg._id !== action.payload.id);
      })
      .addCase(deleteMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAllErrors, resetMessageSlice } = messageSlice.actions;
export default messageSlice.reducer;
