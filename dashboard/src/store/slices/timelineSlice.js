import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const timelineSlice = createSlice({
  name: "timelines",
  initialState: {
    loading: false,
    timelines: [],
    timeline: null,
    error: null,
    message: null,
  },
  reducers: {
    request(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    getAllSuccess(state, action) {
      state.loading = false;
      state.timelines = action.payload;
    },
    createSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    deleteSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.timelines = state.timelines.filter(
        (item) => item._id !== action.payload.id
      );
    },
    updateSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.timelines = state.timelines.map((t) =>
        t._id === action.payload.timeline._id ? action.payload.timeline : t
      );
    },
    failure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors(state) {
      state.error = null;
    },
    clearMessages(state) {
      state.message = null;
    },
  },
});

// ✅ Thunks

export const getAllTimelines = () => async (dispatch) => {
  try {
    dispatch(timelineSlice.actions.request());
    const { data } = await axios.get(
      "http://localhost:5000/api/v1/timeline/getall"
    );
    dispatch(timelineSlice.actions.getAllSuccess(data.timeline));
  } catch (err) {
    dispatch(
      timelineSlice.actions.failure(err.response?.data?.message || err.message)
    );
  }
};

export const createTimeline = (timelineData) => async (dispatch) => {
  try {
    dispatch(timelineSlice.actions.request());
    const { data } = await axios.post(
      "http://localhost:5000/api/v1/timeline/create",
      timelineData,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(timelineSlice.actions.createSuccess(data.message));
  } catch (err) {
    dispatch(
      timelineSlice.actions.failure(err.response?.data?.message || err.message)
    );
  }
};

export const deleteTimeline = (id) => async (dispatch) => {
  try {
    dispatch(timelineSlice.actions.request());
    const { data } = await axios.delete(
      `http://localhost:5000/api/v1/timeline/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(
      timelineSlice.actions.deleteSuccess({ message: data.message, id })
    );
  } catch (err) {
    dispatch(
      timelineSlice.actions.failure(err.response?.data?.message || err.message)
    );
  }
};

export const updateTimeline = (id, timelineData) => async (dispatch) => {
  try {
    dispatch(timelineSlice.actions.request());
    const { data } = await axios.put(
      `http://localhost:5000/api/v1/timeline/update/${id}`,
      timelineData,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(timelineSlice.actions.updateSuccess(data));
  } catch (err) {
    dispatch(
      timelineSlice.actions.failure(err.response?.data?.message || err.message)
    );
  }
};

// ✅ Helpers

export const clearTimelineErrors = () => (dispatch) =>
  dispatch(timelineSlice.actions.clearErrors());

export const clearTimelineMessages = () => (dispatch) =>
  dispatch(timelineSlice.actions.clearMessages());

// ✅ Export reducer
export default timelineSlice.reducer;
