import {
  AddRecoveryContactInformation,
  ChangePassword,
  Login,
  Logout,
  resendCode,
  SendChangeEmailVerification,
  VerifyEmailChange,
} from "./authApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { ApiResponse } from "@/shared/types/ApiResponse";
import type { User } from "../users/userTypes";
import { getCurrentUser } from "../users/userApi";
import type { RecoveryContactInfo } from "./authTypes";
import { extractAxiosErrorMessage } from "@/utils/apiErrorHandler";
import { logoutMemberLocaly } from "./authSlice";

const handleLogin = createAsyncThunk<
  string[],
  { UsernameOrEmail: string; Password: string },
  { rejectValue: string }
>("auth/login", async ({ UsernameOrEmail, Password }, thunkApi) => {
  try {
    const response = await Login(UsernameOrEmail, Password);

    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(extractAxiosErrorMessage(error));
  }
});

const logoutThunk = createAsyncThunk("auth/logout", async (_, { dispatch }) => {
  try {
    await Logout();
  } finally {
    // Clear Redux (even if the server call fails, we want the UI to log out)
    dispatch(logoutMemberLocaly());
  }
  return true;
});

const getCurrentUserThunk = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("auth/me", async (_, thunkApi) => {
  try {
    const user = await getCurrentUser();

    return user;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const msg = error.response?.data as ApiResponse<null>;
      return thunkApi.rejectWithValue(msg.message);
    }
    return thunkApi.rejectWithValue("Something wont wrong!");
  }
});

const SendChangeEmailVerificationThunk = createAsyncThunk<
  string,
  { currentEmail: string; newEmail: string },
  { rejectValue: string }
>(
  "auth/sendChangeEmailVerification",
  async ({ currentEmail, newEmail }, thunkApi) => {
    try {
      await SendChangeEmailVerification(currentEmail, newEmail);

      return "success";
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data as ApiResponse<string>;

        return thunkApi.rejectWithValue(msg.message);
      }
      return thunkApi.rejectWithValue("Something went wrong!");
    }
  },
);

const VerifyEmailChangeThunk = createAsyncThunk<
  string,
  { oldEmail: string; newEmail: string; code: string },
  { rejectValue: string }
>("auth/verifyEmailChange", async ({ oldEmail, newEmail, code }, thunkApi) => {
  try {
    await VerifyEmailChange(oldEmail, newEmail, code);

    return newEmail;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      const msg = error.response?.data as ApiResponse<string>;

      return thunkApi.rejectWithValue(msg.message);
    }
    return thunkApi.rejectWithValue("Something went wrong!");
  }
});

const ChangePasswordThunk = createAsyncThunk<
  string,
  {
    id: number;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  },
  { rejectValue: string }
>("auth/changePassword", async (data, thunkApi) => {
  try {
    const response = await ChangePassword(data);
    return response.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const msg = error.response?.data as ApiResponse<string>;

      return thunkApi.rejectWithValue(msg.message);
    }
    return thunkApi.rejectWithValue("Something went wrong!");
  }
});

const AddRecoveryContactInformationThunk = createAsyncThunk<
  RecoveryContactInfo,
  RecoveryContactInfo,
  { rejectValue: string }
>("auth/addRecoveryContactInformation", async (recoveryInfo, thunkApi) => {
  try {
    await AddRecoveryContactInformation(recoveryInfo);
    return recoveryInfo;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const msg = error.response?.data as ApiResponse<string>;
      return thunkApi.rejectWithValue(msg.message);
    }
    return thunkApi.rejectWithValue("Something went wrong!");
  }
});

const resendCodeThunk = createAsyncThunk<
  string,
  { email: string },
  { rejectValue: string }
>("auth/resend-code", async ({ email }, { rejectWithValue }) => {
  try {
    return (await resendCode(email)).data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(extractAxiosErrorMessage(error));
  }
});

export const checkAuthThunk = createAsyncThunk(
  "auth/check",
  async (_, { rejectWithValue }) => {
    try {
      const user = await getCurrentUser();
      return user;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export {
  handleLogin,
  logoutThunk,
  getCurrentUserThunk,
  SendChangeEmailVerificationThunk,
  VerifyEmailChangeThunk,
  ChangePasswordThunk,
  AddRecoveryContactInformationThunk,
  resendCodeThunk,
};
