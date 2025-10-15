import { createAsyncThunk } from "@reduxjs/toolkit";
import type { UpdateUserRequest } from "./userTypes";
import { updateUser } from "./userApi";
import axios from "axios";
import type { ApiResponse } from "@/shared/types/ApiResponse";

export const updateUserThunk = createAsyncThunk<
  boolean,
  UpdateUserRequest,
  { rejectValue: string }
>("user/update", async (user, thunkApi) => {
  try {
    const response = await updateUser(user);
    return response.succeeded;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      const errorRes = error.response?.data as ApiResponse<string>;
      return thunkApi.rejectWithValue(errorRes.statusCode.toString());
    }
    return thunkApi.rejectWithValue("Something wont wrong!");
  }
});
