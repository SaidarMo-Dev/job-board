import { saveToken } from "@/utils/saveToken";
import { Login } from "../auth/authApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { ApiResponse } from "@/types/ApiResponse";

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

export { handleLogin };
