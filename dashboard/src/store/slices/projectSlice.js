import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../lib/axiosInstance";

// Thunks
export const getAllProjects = createAsyncThunk(
  "projects/getAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get("/api/v1/projects/getall");
      return data.projects;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

export const fetchProjectById = createAsyncThunk(
  "projects/fetchById",
  async (id, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`/api/v1/projects/${id}`);
      return data.project;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

export const addNewProject = createAsyncThunk(
  "projects/add",
  async (formData, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post("/api/v1/projects/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

export const updateProject = createAsyncThunk(
  "projects/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      const { data } = await axiosInstance.put(`/api/v1/projects/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

export const deleteProject = createAsyncThunk(
  "projects/delete",
  async (id, thunkAPI) => {
    try {
      const { data } = await axiosInstance.delete(`/api/v1/projects/delete/${id}`);
      return data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

// Slice
const projectSlice = createSlice({
  name: "projects",
  initialState: {
    loading: false,
    projects: [],
    singleProject: null,
    message: null,
    error: null,
  },
  reducers: {
    clearAllErrors: (state) => {
      state.error = null;
    },
    resetProjectSlice: (state) => {
      state.message = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(getAllProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProject = action.payload;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addNewProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewProject.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(addNewProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export slice actions
export const { clearAllErrors, resetProjectSlice } = projectSlice.actions;

// Export thunk actions for external use - using explicit function declaration
function clearAllProjectErrors() {
  return (dispatch) => {
    dispatch(clearAllErrors());
  };
}

function resetProjectSliceAction() {
  return (dispatch) => {
    dispatch(resetProjectSlice());
  };
}

export { clearAllProjectErrors, resetProjectSliceAction };

export default projectSlice.reducer;
