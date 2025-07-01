import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    loading: false,
    projects: [],
    singleProject: null,
    error: null,
    message: null,
  },
  reducers: {
    // Get All Projects
    getAllProjectsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getAllProjectsSuccess(state, action) {
      state.projects = action.payload;
      state.loading = false;
      state.error = null;
    },
    getAllProjectsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Get Single Project
    getSingleProjectRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getSingleProjectSuccess(state, action) {
      state.singleProject = action.payload;
      state.loading = false;
    },
    getSingleProjectFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Add Project
    addNewProjectRequest(state) {
      state.loading = true;
      state.error = null;
    },
    addNewProjectSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    addNewProjectFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Update Project
    updateProjectRequest(state) {
      state.loading = true;
      state.error = null;
    },
    updateProjectSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    updateProjectFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete Project
    deleteProjectRequest(state) {
      state.loading = true;
      state.error = null;
    },
    deleteProjectSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    deleteProjectFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Utilities
    resetProjectSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

// Thunks

// Get all projects
export const getAllProjects = () => async (dispatch) => {
  dispatch(projectSlice.actions.getAllProjectsRequest());
  try {
    const { data } = await axios.get(
      "https://portfolio-1dkv.onrender.com/api/v1/projects/getall",
      {
        withCredentials: true,
      }
    );
    dispatch(projectSlice.actions.getAllProjectsSuccess(data.projects));
  } catch (error) {
    dispatch(
      projectSlice.actions.getAllProjectsFailed(
        error?.response?.data?.message ||
          error.message ||
          "Failed to load projects"
      )
    );
  }
};

// Get single project
export const fetchProjectById = (id) => async (dispatch) => {
  dispatch(projectSlice.actions.getSingleProjectRequest());
  try {
    const { data } = await axios.get(
      `https://portfolio-1dkv.onrender.com/api/v1/projects/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch(projectSlice.actions.getSingleProjectSuccess(data.project));
  } catch (error) {
    dispatch(
      projectSlice.actions.getSingleProjectFailed(
        error?.response?.data?.message ||
          error.message ||
          "Failed to load project"
      )
    );
  }
};

// Add new project
export const addNewProject = (formData) => async (dispatch) => {
  dispatch(projectSlice.actions.addNewProjectRequest());
  try {
    const { data } = await axios.post(
      "https://portfolio-1dkv.onrender.com/api/v1/projects/add",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );
    dispatch(projectSlice.actions.addNewProjectSuccess(data.message));
  } catch (error) {
    dispatch(
      projectSlice.actions.addNewProjectFailed(
        error?.response?.data?.message ||
          error.message ||
          "Failed to add project"
      )
    );
  }
};

// Update project
export const updateProject = (id, formData) => async (dispatch) => {
  dispatch(projectSlice.actions.updateProjectRequest());
  try {
    const { data } = await axios.put(
      `https://portfolio-1dkv.onrender.com/api/v1/projects/update/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );
    dispatch(projectSlice.actions.updateProjectSuccess(data.message));
  } catch (error) {
    dispatch(
      projectSlice.actions.updateProjectFailed(
        error?.response?.data?.message ||
          error.message ||
          "Failed to update project"
      )
    );
  }
};

// Delete project
export const deleteProject = (id) => async (dispatch) => {
  dispatch(projectSlice.actions.deleteProjectRequest());
  try {
    const { data } = await axios.delete(
      `https://portfolio-1dkv.onrender.com/api/v1/projects/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(projectSlice.actions.deleteProjectSuccess(data.message));
  } catch (error) {
    dispatch(
      projectSlice.actions.deleteProjectFailed(
        error?.response?.data?.message ||
          error.message ||
          "Failed to delete project"
      )
    );
  }
};

// Reset all state values
export const resetProjectSlice = () => (dispatch) => {
  dispatch(projectSlice.actions.resetProjectSlice());
};

// Clear only errors
export const clearAllProjectErrors = () => (dispatch) => {
  dispatch(projectSlice.actions.clearAllErrors());
};

export default projectSlice.reducer;
