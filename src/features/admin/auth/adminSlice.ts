import { createSlice } from "@reduxjs/toolkit";
import type { adminAuthState } from "./adminTypes";
import { getAdminProfileThunk } from "./adminThunk";

const initialState: adminAuthState = {
  isAuthenticated: false,
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
    adminLogin(state) {
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminProfileThunk.pending, (state) => {
        state.loading.fetch = false;
        state.error.fetch = null;
      })
      .addCase(getAdminProfileThunk.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.admin = action.payload;
      })
      .addCase(getAdminProfileThunk.rejected, (state, action) => {
        state.loading.fetch = false;
        state.error.fetch = action.payload ?? "Network Error";
      });
  },
});

export default adminAuthSlice.reducer;

export const { adminLogin } = adminAuthSlice.actions;
