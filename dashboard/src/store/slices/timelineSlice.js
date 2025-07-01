import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";

// ✅ Async Thunks

export const getAllTimelines = createAsyncThunk("timeline/getAll", async (_, thunkAPI) => {
  try {
    const { data } = await axiosInstance.get("/api/v1/timeline/getall");
    return data.timeline;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const createTimeline = createAsyncThunk("timeline/create", async (timelineData, thunkAPI) => {
  try {
    const { data } = await axiosInstance.post("/api/v1/timeline/create", timelineData, {
      headers: { "Content-Type": "application/json" },
    });
    return data.message;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const deleteTimeline = createAsyncThunk("timeline/delete", async (id, thunkAPI) => {
  try {
    const { data } = await axiosInstance.delete(`/api/v1/timeline/delete/${id}`);
    return { message: data.message, id };
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const updateTimeline = createAsyncThunk("timeline/update", async ({ id, timelineData }, thunkAPI) => {
  try {
    const { data } = await axiosInstance.put(`/api/v1/timeline/update/${id}`, timelineData, {
      headers: { "Content-Type": "application/json" },
    });
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

// ✅ Slice

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
    clearTimelineErrors: (state) => {
      state.error = null;
    },
    clearTimelineMessages: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTimelines.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTimelines.fulfilled, (state, action) => {
        state.loading = false;
        state.timelines = action.payload;
      })
      .addCase(getAllTimelines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createTimeline.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTimeline.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(createTimeline.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteTimeline.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTimeline.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.timelines = state.timelines.filter((item) => item._id !== action.payload.id);
      })
      .addCase(deleteTimeline.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateTimeline.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTimeline.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.timelines = state.timelines.map((t) =>
          t._id === action.payload.timeline._id ? action.payload.timeline : t
        );
      })
      .addCase(updateTimeline.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearTimelineErrors, clearTimelineMessages } = timelineSlice.actions;
export default timelineSlice.reducer;
