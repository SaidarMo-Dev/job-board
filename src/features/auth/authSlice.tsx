import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "./authTypes";
import { handleLogin } from "./authThunk";
import type { RootState } from "@/store";

const initialState: AuthState = {
  isAuthenticated: false,
  currentUser: null,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleLogin.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;

export const { logout } = authSlice.actions;

export const selectIsAuthenticated = (state: RootState) =>
  state.authReducer.isAuthenticated;
export const selectLoading = (state: RootState) => state.authReducer.loading;
