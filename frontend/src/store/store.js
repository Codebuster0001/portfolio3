import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./slices/messageSlice";
import projectReducer from "./slices/projectSlice"; 
export const store = configureStore({
  reducer: {
    message: messageReducer,
    projects: projectReducer,
  },
});
