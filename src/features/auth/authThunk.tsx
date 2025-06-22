import { saveToken } from "@/utils/saveToken";
import { Login } from "../auth/authApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const handleLogin = createAsyncThunk<
  boolean,
  { usernameOrEmail: string; password: string },
  { rejectValue: string }
>("auth/login", async ({ usernameOrEmail, password }, thunkApi) => {
  try {
    const data = await Login(usernameOrEmail, password);
    saveToken(data);
    return true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const msg = error.response?.data?.message || error.message;
      return thunkApi.rejectWithValue(msg);
    }
    return thunkApi.rejectWithValue("Something wont wrong!");
  }
});

export { handleLogin };
