import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ApplicationData } from "./applicationType";
import { applyForJob } from "./applicationApi";
import axios from "axios";
import type { ApiResponse } from "@/types/ApiResponse";

const applyForJobThunk = createAsyncThunk<
  number,
  { applicationData: ApplicationData },
  { rejectValue: string }
>("/applications/apply", async (params, thunkApi) => {
  try {
    const response = await applyForJob(params.applicationData);
    return response.data;
  } catch (err) {
    console.log(err);
    if (axios.isAxiosError(err)) {
      const errResponse = err.response?.data as ApiResponse<string>;

      return thunkApi.rejectWithValue(errResponse.message);
    }

    return thunkApi.rejectWithValue("Something went wrong!");
  }
});

export { applyForJobThunk };
