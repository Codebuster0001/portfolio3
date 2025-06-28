import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial State
const initialState = {
  loading: false,
  user: {},
  isAuthenticated: false,
  error: null,
  message: null,
  isUpdated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // ---------------- AUTH ----------------
    loginRequest: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailed: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },

    logoutSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.message = action.payload;
      state.error = null;
    },
    logoutFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ---------------- LOAD USER ----------------
    loadUserRequest: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loadUserFailed: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },

    // ---------------- UPDATE PASSWORD ----------------
    updatePasswordRequest: (state) => {
      state.loading = true;
      state.isUpdated = false;
      state.message = null;
      state.error = null;
    },
    updatePasswordSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = true;
      state.message = action.payload;
      state.error = null;
    },
    updatePasswordFailed: (state, action) => {
      state.loading = false;
      state.isUpdated = false;
      state.message = null;
      state.error = action.payload;
    },

    // ---------------- UPDATE PROFILE ----------------
    updateProfileRequest: (state) => {
      state.loading = true;
      state.isUpdated = false;
      state.message = null;
      state.error = null;
    },
    updateProfileSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = true;
      state.message = action.payload;
      state.error = null;
    },
    updateProfileFailed: (state, action) => {
      state.loading = false;
      state.isUpdated = false;
      state.message = null;
      state.error = action.payload;
    },

    // ---------------- RESET / CLEAR ----------------
    resetUpdateState: (state) => {
      state.error = null;
      state.isUpdated = false;
      state.message = null;
    },
    clearErrors: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
});

// ---------------- EXPORT ACTIONS ----------------
export const {
  loginRequest,
  loginSuccess,
  loginFailed,
  logoutSuccess,
  logoutFailed,
  loadUserRequest,
  loadUserSuccess,
  loadUserFailed,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFailed,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailed,
  resetUpdateState,
  clearErrors,
  clearMessage,
} = userSlice.actions;

// ---------------- THUNKS ----------------
export const login = (email, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const { data } = await axios.post(
      "http://localhost:5000/api/v1/user/login",
      { email, password },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(loginSuccess(data.user));
  } catch (error) {
    dispatch(
      loginFailed(
        error.response?.data?.message || error.message || "Login failed"
      )
    );
  }
};

export const getUser = () => async (dispatch) => {
  dispatch(loadUserRequest());
  try {
    const { data } = await axios.get("http://localhost:5000/api/v1/user/me", {
      withCredentials: true,
    });
    dispatch(loadUserSuccess(data.user));
  } catch (error) {
    dispatch(loadUserFailed(error.response?.data?.message || error.message));
  }
};

export const logout = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      "http://localhost:5000/api/v1/user/logout",
      {
        withCredentials: true,
      }
    );
    dispatch(logoutSuccess(data.message));
  } catch (error) {
    dispatch(logoutFailed(error.response?.data?.message || error.message));
  }
};

export const updatePassword =
  (currentPassword, newPassword, confirmNewPassword) => async (dispatch) => {
    dispatch(updatePasswordRequest());
    try {
      const { data } = await axios.put(
        "http://localhost:5000/api/v1/user/update/password",
        { currentPassword, newPassword, confirmNewPassword },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(updatePasswordSuccess(data.message));
    } catch (error) {
      dispatch(
        updatePasswordFailed(error.response?.data?.message || error.message)
      );
    }
  };

export const updateProfile = (formData) => async (dispatch) => {
  dispatch(updateProfileRequest());
  try {
    const { data } = await axios.put(
      "http://localhost:5000/api/v1/user/me/profile/update",
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(updateProfileSuccess(data.message));
  } catch (error) {
    dispatch(
      updateProfileFailed(error.response?.data?.message || error.message)
    );
  }
};

// ✅ Reset combined
export const resetProfile = () => (dispatch) => {
  dispatch(resetUpdateState());
  dispatch(clearMessage()); // ✅ Prevent message replay on reload
};

export const clearAllUserErrors = () => (dispatch) => {
  dispatch(clearErrors());
};

export default userSlice.reducer;
