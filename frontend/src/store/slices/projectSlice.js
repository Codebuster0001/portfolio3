// src/store/slices/projectSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get all projects
export const getAllProjects = createAsyncThunk(
  "projects/getAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/projects/getall"
      );
      return data.projects;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch projects"
      );
    }
  }
);

// Get single project by ID
export const getProjectById = createAsyncThunk(
  "projects/getById",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/projects/${id}`
      );
      return data.project;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch project"
      );
    }
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    allProjects: [],
    singleProject: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearProjectError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // All Projects
      .addCase(getAllProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.allProjects = action.payload;
      })
      .addCase(getAllProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Single Project
      .addCase(getProjectById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProject = action.payload;
      })
      .addCase(getProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProjectError } = projectSlice.actions;
export default projectSlice.reducer;
