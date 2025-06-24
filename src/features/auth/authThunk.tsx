import { saveToken } from "@/utils/saveToken";
import { Login } from "../auth/authApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { ApiResponse } from "@/types/ApiResponse";
import type { User } from "../users/userTypes";
import { getCurrentUser } from "../users/userApi";

const handleLogin = createAsyncThunk<
  boolean,
  { emailOrUsername: string; password: string },
  { rejectValue: string }
>("auth/login", async ({ emailOrUsername, password }, thunkApi) => {
  try {
    const data = await Login(emailOrUsername, password);
    saveToken(data);
    return true;
  } catch (error) {
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

export { handleLogin, getCurrentUserThunk };
