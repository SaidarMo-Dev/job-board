import { createAction, createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "./authTypes";
import {
  AddRecoveryContactInformationThunk,
  ChangePasswordThunk,
  getCurrentUserThunk,
  handleLogin,
  SendChangeEmailVerificationThunk,
  VerifyEmailChangeThunk,
} from "./authThunk";
import type { RootState } from "@/store";
import { updateUserThunk } from "../users/userThunk";

const initialState: AuthState = {
  isAuthenticated: false,
  currentUser: null,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // handle login
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
      })

      // get current user
      .addCase(getCurrentUserThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(getCurrentUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //update user
      .addCase(updateUserThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(updateUserThunk.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.error = action.payload ?? "Something wrong! ";
      })

      // handle send email change verification
      .addCase(SendChangeEmailVerificationThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(SendChangeEmailVerificationThunk.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(SendChangeEmailVerificationThunk.rejected, (state, action) => {
        state.error = action.payload ?? "Something went wrong!";
      })
      // handle email change verification
      .addCase(VerifyEmailChangeThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(VerifyEmailChangeThunk.fulfilled, (state, action) => {
        const newEmail = action.payload;

        if (state.currentUser) {
          state.currentUser.email = newEmail;
        }
      })
      .addCase(VerifyEmailChangeThunk.rejected, (state, action) => {
        state.error = action.payload ?? "Something went wrong!";
      })
      // handle change password
      .addCase(ChangePasswordThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(ChangePasswordThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(ChangePasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // handle add recovery contact information
      .addCase(AddRecoveryContactInformationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        AddRecoveryContactInformationThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;
          if (state.currentUser) {
            state.currentUser.recoveryEmail = action.payload.email;
            state.currentUser.recoveryPhone = action.payload.phoneNumber;
          }
        }
      )
      .addCase(AddRecoveryContactInformationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong!";
      });
  },
});

export default authSlice.reducer;

export const logout = createAction("auth/logout");

export const selectAuthError = (state: RootState) => state.authReducer.error;
export const selectCurrentUser = (state: RootState) =>
  state.authReducer.currentUser;
export const selectIsAuthenticated = (state: RootState) =>
  state.authReducer.isAuthenticated;
export const selectLoading = (state: RootState) => state.authReducer.loading;

export const selectCurrentUserRecoveryInfo = (state: RootState) => {
  return {
    recoveryEmail: state.authReducer.currentUser?.recoveryEmail,
    recoveryPhone: state.authReducer.currentUser?.recoveryPhone,
  };
};
