import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./slices/messageSlice";
import visitorTrackReducer from "./slices/visitorTrackSlice";
export const store = configureStore({
  reducer: {
    message: messageReducer,
    visitorTrack: visitorTrackReducer,
  },
});
