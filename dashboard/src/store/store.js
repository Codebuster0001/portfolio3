// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import forgotResetReducer from "./slices/forgotResetPasswordSlice"; // ✅ Renamed to match slice name
import messageReducer from "./slices/messageSlice";
import timelineReducer from "./slices/timelineSlice";
import skillReducer from "./slices/skillSlice";
import projectReducer from "./slices/projectSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    forgotReset: forgotResetReducer, // ✅ Now matches useSelector in ResetPassword.jsx
    messages: messageReducer,
    timelines: timelineReducer,
    skill: skillReducer,
    project: projectReducer,
  },
  devTools: import.meta.env.DEV,
});
