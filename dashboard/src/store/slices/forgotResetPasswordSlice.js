import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";

// ✅ Forgot Password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post(
        "/api/v1/user/forgot/password",
        { email }
      );
      return data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to send reset email."
      );
    }
  }
);

// ✅ Reset Password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password }, thunkAPI) => {
    try {
      const { data } = await axiosInstance.put(
        `/api/v1/user/reset/password/${token}`,
        { password }
      );
      return data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Password reset failed."
      );
    }
  }
);

// ✅ Slice
const forgotResetSlice = createSlice({
  name: "forgotReset",
  initialState: {
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearForgotResetError: (state) => {
      state.error = null;
    },
    clearForgotResetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ✅ Actions
export const {
  clearForgotResetError,
  clearForgotResetMessage,
} = forgotResetSlice.actions;

// ✅ Helpers
export const clearAllForgotResetPassErrors = () => (dispatch) => {
  dispatch(clearForgotResetError());
  dispatch(clearForgotResetMessage());
};

// ✅ Reducer
export default forgotResetSlice.reducer;
