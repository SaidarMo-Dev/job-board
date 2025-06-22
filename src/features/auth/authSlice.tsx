import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "./authTypes";

const initialState: AuthState = {
  isAuthenticated: false,
  currentUser: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});


export default authSlice;