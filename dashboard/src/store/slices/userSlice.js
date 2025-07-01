import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";

// ✅ Initial State
const initialState = {
  loading: false,
  user: {},
  isAuthenticated: false,
  isUserLoaded: false,
  isUpdated: false,
  error: null,
  message: null,
};

// ✅ Async Thunks

export const login = createAsyncThunk("user/login", async ({ email, password }, thunkAPI) => {
  try {
    const { data } = await axiosInstance.post("/api/v1/user/login", { email, password });
    return data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

export const getUser = createAsyncThunk("user/getMe", async (_, thunkAPI) => {
  try {
    const { data } = await axiosInstance.get("/api/v1/user/me");
    return data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to load user");
  }
});

export const logout = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  try {
    const { data } = await axiosInstance.get("/api/v1/user/logout");
    return data.message;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Logout failed");
  }
});

export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async ({ currentPassword, newPassword, confirmNewPassword }, thunkAPI) => {
    try {
      const { data } = await axiosInstance.put("/api/v1/user/update/password", {
        currentPassword,
        newPassword,
        confirmNewPassword,
      });
      return data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Update password failed");
    }
  }
);

export const updateProfile = createAsyncThunk("user/updateProfile", async (formData, thunkAPI) => {
  try {
    const { data } = await axiosInstance.put("/api/v1/user/me/profile/update", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data.message;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Profile update failed");
  }
});

// ✅ Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUpdateState: (state) => {
      state.isUpdated = false;
      state.message = null;
      state.error = null;
    },
    clearErrors: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    resetUserState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = {};
        state.error = action.payload;
      })

      // LOAD USER
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.isUserLoaded = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = {};
        state.error = action.payload;
        state.isUserLoaded = true;
      })

      // LOGOUT
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = {};
        state.message = action.payload;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE PASSWORD
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.isUpdated = false;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = true;
        state.message = action.payload;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.isUpdated = false;
        state.error = action.payload;
      })

      // UPDATE PROFILE
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.isUpdated = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = true;
        state.message = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.isUpdated = false;
        state.error = action.payload;
      });
  },
});

// ✅ Actions
export const {
  resetUpdateState,
  clearErrors,
  clearMessage,
  resetUserState,
} = userSlice.actions;

// ✅ Reducer
export default userSlice.reducer;

// ✅ Helpers
export const resetProfile = () => (dispatch) => {
  dispatch(resetUpdateState());
  dispatch(clearMessage());
};

export const clearAllUserErrors = () => (dispatch) => {
  dispatch(clearErrors());
};
