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
export const getAllProjects = () => async (dispatch) => {
  dispatch(projectSlice.actions.getAllProjectsRequest());
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL_DASHBOARD}/api/v1/projects/getall`,
      { withCredentials: true }
    );
    dispatch(projectSlice.actions.getAllProjectsSuccess(data.projects));
  } catch (error) {
    dispatch(
      projectSlice.actions.getAllProjectsFailed(
        error?.response?.data?.message || error.message || "Failed to load projects"
      )
    );
  }
};

export const fetchProjectById = (id) => async (dispatch) => {
  dispatch(projectSlice.actions.getSingleProjectRequest());
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL_DASHBOARD}/api/v1/projects/${id}`,
      { withCredentials: true }
    );
    dispatch(projectSlice.actions.getSingleProjectSuccess(data.project));
  } catch (error) {
    dispatch(
      projectSlice.actions.getSingleProjectFailed(
        error?.response?.data?.message || error.message || "Failed to load project"
      )
    );
  }
};

export const addNewProject = (formData) => async (dispatch) => {
  dispatch(projectSlice.actions.addNewProjectRequest());
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL_DASHBOARD}/api/v1/projects/add`,
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
        error?.response?.data?.message || error.message || "Failed to add project"
      )
    );
  }
};

export const updateProject = (id, formData) => async (dispatch) => {
  dispatch(projectSlice.actions.updateProjectRequest());
  try {
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_URL_DASHBOARD}/api/v1/projects/update/${id}`,
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
        error?.response?.data?.message || error.message || "Failed to update project"
      )
    );
  }
};

export const deleteProject = (id) => async (dispatch) => {
  dispatch(projectSlice.actions.deleteProjectRequest());
  try {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_API_URL_DASHBOARD}/api/v1/projects/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(projectSlice.actions.deleteProjectSuccess(data.message));
  } catch (error) {
    dispatch(
      projectSlice.actions.deleteProjectFailed(
        error?.response?.data?.message || error.message || "Failed to delete project"
      )
    );
  }
};

export const resetProjectSlice = () => (dispatch) => {
  dispatch(projectSlice.actions.resetProjectSlice());
};

export const clearAllProjectErrors = () => (dispatch) => {
  dispatch(projectSlice.actions.clearAllErrors());
};

export default projectSlice.reducer;
