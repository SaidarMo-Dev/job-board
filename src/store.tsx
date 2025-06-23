import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./features/auth/authSlice";

const store = configureStore({
  reducer: {
    authReducer: authSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
