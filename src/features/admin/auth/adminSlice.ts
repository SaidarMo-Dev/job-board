import { createSlice } from "@reduxjs/toolkit";
import type { adminAuthState } from "./adminTypes";
import { getAdminProfileThunk } from "./adminThunk";

const initialState: adminAuthState = {
  isAuthenticated: false,
  hasCheckedAuth: false,
  admin: null,
  error: {
    fetch: null,
    save: null,
    remove: null,
  },
  loading: {
    fetch: false,
    save: false,
    remove: false,
  },
};

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    logoutAdmin(state) {
      state.admin = null;
      state.hasCheckedAuth = true;
      state.isAuthenticated = false;
    },
    adminLogin(state) {
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminProfileThunk.pending, (state) => {
        state.loading.fetch = true;
        state.error.fetch = null;
      })
      .addCase(getAdminProfileThunk.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.admin = action.payload;
        state.hasCheckedAuth = true;
        state.isAuthenticated = true;
      })
      .addCase(getAdminProfileThunk.rejected, (state, action) => {
        state.admin = null;
        state.hasCheckedAuth = true;
        state.loading.fetch = false;
        state.error.fetch = action.payload ?? "Network Error";

        logoutAdmin();
      });
  },
});

export default adminAuthSlice.reducer;

export const { adminLogin, logoutAdmin } = adminAuthSlice.actions;
