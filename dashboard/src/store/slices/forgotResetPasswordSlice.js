import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const forgotResetPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    forgotPasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    forgotPasswordSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    forgotPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetPasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    resetPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    clearAllErrors(state) {
      state.error = null;
      state.message = null;
    },
  },
});

// ✅ THUNK ACTIONS

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch(forgotResetPasswordSlice.actions.forgotPasswordRequest());

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL_DASHBOARD}/api/v1/user/forgot/password`,
      { email },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );

    dispatch(
      forgotResetPasswordSlice.actions.forgotPasswordSuccess(
        response.data.message
      )
    );
  } catch (error) {
    dispatch(
      forgotResetPasswordSlice.actions.forgotPasswordFailed(
        error.response?.data?.message || error.message
      )
    );
  }
};

export const resetPassword =
  (token, password, confirmPassword) => async (dispatch) => {
    try {
      dispatch(forgotResetPasswordSlice.actions.resetPasswordRequest());

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL_DASHBOARD}/api/v1/user/password/reset/${token}`,
        { password, confirmPassword },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      dispatch(
        forgotResetPasswordSlice.actions.resetPasswordSuccess(
          response.data.message
        )
      );
    } catch (error) {
      dispatch(
        forgotResetPasswordSlice.actions.resetPasswordFailed(
          error.response?.data?.message || error.message
        )
      );
    }
  };

export const clearAllForgotResetPassErrors = () => (dispatch) => {
  dispatch(forgotResetPasswordSlice.actions.clearAllErrors());
};

// ✅ EXPORT REDUCER
export default forgotResetPasswordSlice.reducer;
