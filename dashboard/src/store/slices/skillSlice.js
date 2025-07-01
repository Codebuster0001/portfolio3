import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

// Initial state
const skillSlice = createSlice({
  name: "skill",
  initialState: {
    skills: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    requestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    getSkillsSuccess: (state, action) => {
      state.loading = false;
      state.skills = action.payload;
    },
    requestSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    requestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error(action.payload);
    },
    clearSkillMessages: (state) => {
      state.error = null;
      state.message = null;
    },
  },
});

export const {
  requestStart,
  getSkillsSuccess,
  requestSuccess,
  requestFail,
  clearSkillMessages,
} = skillSlice.actions;

export default skillSlice.reducer;

// Axios Config
const axiosConfig = {
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};

// ✅ 1. Get all skills
export const getAllSkills = () => async (dispatch) => {
  dispatch(requestStart());
  try {
    const { data } = await axios.get(
      "https://portfolio-1dkv.onrender.com/api/v1/skills/getall"
    );
    dispatch(getSkillsSuccess(data.skills));
  } catch (err) {
    dispatch(requestFail(err.response?.data?.message || err.message));
  }
};

// ✅ 2. Add new skill
export const addSkill = (formData) => async (dispatch) => {
  dispatch(requestStart());
  try {
    const { data } = await axios.post(
      "https://portfolio-1dkv.onrender.com/api/v1/skills/add",
      formData,
      axiosConfig
    );
    dispatch(requestSuccess(data.message));
    toast.success(data.message);
    dispatch(getAllSkills()); // Refresh list
  } catch (err) {
    dispatch(requestFail(err.response?.data?.message || err.message));
  }
};

// ✅ 3. Delete skill by order
export const deleteSkill = (order) => async (dispatch) => {
  dispatch(requestStart());
  try {
    const { data } = await axios.delete(
      `https://portfolio-1dkv.onrender.com/api/v1/skills/delete/${order}`,
      axiosConfig
    );
    dispatch(requestSuccess(data.message));
    toast.success(data.message);
    dispatch(getAllSkills()); // Refresh list
  } catch (err) {
    dispatch(requestFail(err.response?.data?.message || err.message));
  }
};
