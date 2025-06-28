import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const skillSlice = createSlice({
  name: "skill",
  initialState: {
    loading: false,
    skills: [],
    error: null,
    message: null,
  },
  reducers: {
    requestStart(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    getAllSkillsSuccess(state, action) {
      state.skills = action.payload;
      state.loading = false;
    },
    successMessage(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    failure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearAllErrors(state) {
      state.error = null;
    },
    resetSkillState(state) {
      state.loading = false;
      state.message = null;
      state.error = null;
    },
  },
});

export const {
  requestStart,
  getAllSkillsSuccess,
  successMessage,
  failure,
  clearAllErrors,
  resetSkillState,
} = skillSlice.actions;

export const getAllSkills = () => async (dispatch) => {
  dispatch(requestStart());
  try {
    const { data } = await axios.get(
      "http://localhost:5000/api/v1/skill/getall"
    );
    dispatch(getAllSkillsSuccess(data.skills));
  } catch (error) {
    dispatch(failure(error.response?.data?.message || error.message));
  }
};

export const addNewSkill = (formData) => async (dispatch) => {
  dispatch(requestStart());
  try {
    const { data } = await axios.post(
      "http://localhost:5000/api/v1/skill/create",
      formData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(successMessage(data.message));
  } catch (error) {
    dispatch(failure(error.response?.data?.message || error.message));
  }
};

export const updateSkill = (id, formData) => async (dispatch) => {
  dispatch(requestStart());
  try {
    const { data } = await axios.put(
      `http://localhost:5000/api/v1/skill/update/${id}`,
      formData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(successMessage(data.message));
  } catch (error) {
    dispatch(failure(error.response?.data?.message || error.message));
  }
};

export const deleteSkill = (id) => async (dispatch) => {
  dispatch(requestStart());
  try {
    const { data } = await axios.delete(
      `http://localhost:5000/api/v1/skill/delete/${id}`
    );
    dispatch(successMessage(data.message));
  } catch (error) {
    dispatch(failure(error.response?.data?.message || error.message));
  }
};

export default skillSlice.reducer;
