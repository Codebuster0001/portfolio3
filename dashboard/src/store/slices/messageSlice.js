import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../lib/axiosInstance";

// Thunks
export const getAllMessages = createAsyncThunk(
  "messages/getAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get("/api/v1/message/getall");
      return data.messages;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
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
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

// Slice
const messageSlice = createSlice({
  name: "messages",
  initialState: {
    loading: false,
    messages: [],
    error: null,
    message: null,
  },
  reducers: {
    clearAllErrors: (state) => {
      state.error = null;
    },
    resetMessageSlice: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMessages.pending, (state) => {
        state.loading = true;
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

// ✅ Exports for Dashboard
export const clearAllMessageErrors = () => (dispatch) => {
  dispatch(clearAllErrors());
};

export const resetMessagesSlice = () => (dispatch) => {
  dispatch(resetMessageSlice());
};

export default messageSlice.reducer;
