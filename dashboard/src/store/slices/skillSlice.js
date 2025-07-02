import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import axiosInstance from "../../lib/axiosInstance";

// ✅ Async Thunks

export const getAllSkills = createAsyncThunk("skills/getAll", async (_, thunkAPI) => {
  try {
    const { data } = await axiosInstance.get("/api/v1/skills/getall");
    return data.skills;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const addSkill = createAsyncThunk("skills/add", async (formData, thunkAPI) => {
  try {
    const { data } = await axiosInstance.post("/api/v1/skills/add", formData, {
      headers: { "Content-Type": "application/json" },
    });
    toast.success(data.message);
    thunkAPI.dispatch(getAllSkills());
    return data.message;
  } catch (err) {
    toast.error(err.response?.data?.message || err.message);
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const deleteSkill = createAsyncThunk("skills/delete", async (order, thunkAPI) => {
  try {
    const { data } = await axiosInstance.delete(`/api/v1/skills/delete/${order}`);
    toast.success(data.message);
    thunkAPI.dispatch(getAllSkills());
    return data.message;
  } catch (err) {
    toast.error(err.response?.data?.message || err.message);
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

// ✅ Slice

const skillSlice = createSlice({
  name: "skill",
  initialState: {
    skills: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearSkillMessages(state) {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getAllSkills.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.skills = action.payload;
      })
      .addCase(getAllSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD
      .addCase(addSkill.pending, (state) => {
        state.loading = true;
      })
      .addCase(addSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(addSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteSkill.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(deleteSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ✅ Actions
export const { clearSkillMessages } = skillSlice.actions;

// ✅ Reducer
export default skillSlice.reducer;

// ✅ Helpers
export const resetSkillSlice = () => (dispatch) => {
  dispatch(clearSkillMessages());
};
