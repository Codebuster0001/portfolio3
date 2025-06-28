import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    loading: false,
    messages: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllMessagesRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getAllMessagesSuccess(state, action) {
      state.loading = false;
      state.messages = action.payload;
      state.error = null;
    },
    getAllMessagesFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    deleteMessageRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteMessageSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.messages = state.messages.filter(
        (msg) => msg._id !== action.payload.id
      );
    },
    deleteMessageFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    resetMessageSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

// ✅ Thunks

export const getAllMessages = () => async (dispatch) => {
  dispatch(messageSlice.actions.getAllMessagesRequest());
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/message/getall",
      { withCredentials: true }
    );
    dispatch(
      messageSlice.actions.getAllMessagesSuccess(response.data.messages)
    );
  } catch (error) {
    dispatch(
      messageSlice.actions.getAllMessagesFailed(
        error.response?.data?.message || error.message
      )
    );
  }
};

export const deleteMessage = (id) => async (dispatch) => {
  dispatch(messageSlice.actions.deleteMessageRequest());
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/v1/message/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(
      messageSlice.actions.deleteMessageSuccess({
        message: response.data.message,
        id,
      })
    );
  } catch (error) {
    dispatch(
      messageSlice.actions.deleteMessageFailed(
        error.response?.data?.message || error.message
      )
    );
  }
};

// ✅ Helpers
export const clearAllMessageErrors = () => (dispatch) => {
  dispatch(messageSlice.actions.clearAllErrors());
};

export const resetMessagesSlice = () => (dispatch) => {
  dispatch(messageSlice.actions.resetMessageSlice());
};

export default messageSlice.reducer;
