import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  ApplicationData,
  ApplicationStatusFilterType,
  UserApplicationResponse,
} from "./applicationType";
import { applyForJob, getUserApplications } from "./applicationApi";
import axios from "axios";
import type { ApiResponse } from "@/types/ApiResponse";
import type { ApiPaginatedResponse } from "@/types/ApiPaginatedResponse";

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

const getUserApplicationsThunk = createAsyncThunk<
  ApiPaginatedResponse<UserApplicationResponse[]>,
  { page: number; size: number; statusFilter: ApplicationStatusFilterType },
  { rejectValue: string }
>("users/applications", async (params, thunkApi) => {
  try {
    const response = await getUserApplications(
      params.page,
      params.size,
      params.statusFilter
    );
    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errResponse = err.response?.data as ApiPaginatedResponse<string>;
      return thunkApi.rejectWithValue(errResponse.message);
    }

    return thunkApi.rejectWithValue("Something went wrong!");
  }
});

export { applyForJobThunk, getUserApplicationsThunk };
