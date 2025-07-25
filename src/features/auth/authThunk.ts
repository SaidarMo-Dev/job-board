import { saveToken } from "@/utils/saveToken";
import {
  AddRecoveryContactInformation,
  ChangePassword,
  Login,
  SendChangeEmailVerification,
  VerifyEmailChange,
} from "./authApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { ApiResponse } from "@/types/ApiResponse";
import type { User } from "../users/userTypes";
import { getCurrentUser } from "../users/userApi";
import type { RecoveryContactInfo } from "./authTypes";

const handleLogin = createAsyncThunk<
  boolean,
  { UsernameOrEmail: string; Password: string },
  { rejectValue: string }
>("auth/login", async ({ UsernameOrEmail, Password }, thunkApi) => {
  try {
    const data = await Login(UsernameOrEmail, Password);
    saveToken(data);
    return true;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      const msg = error.response?.data as ApiResponse<null>;
      return thunkApi.rejectWithValue(msg.message);
    }
    return thunkApi.rejectWithValue("Something wont wrong!");
  }
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
  }
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

export {
  handleLogin,
  getCurrentUserThunk,
  SendChangeEmailVerificationThunk,
  VerifyEmailChangeThunk,
  ChangePasswordThunk,
  AddRecoveryContactInformationThunk,
};
