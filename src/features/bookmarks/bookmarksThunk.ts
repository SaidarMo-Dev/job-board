import type { ApiPaginatedResponse } from "@/shared/types/ApiPaginatedResponse";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { bookmarkResponse } from "./bookmarksTypes";
import {
  getSavedJobIds,
  getTotalUserSavedJobs,
  getUserSavedJobs,
  saveJob,
  UnsaveJob,
} from "./bookmarksApi";
import axios from "axios";
import type { ApiResponse } from "@/shared/types/ApiResponse";

const getUserSavedJobsThunk = createAsyncThunk<
  ApiPaginatedResponse<bookmarkResponse[]>,
  { Page: number; PageSize?: number },
  { rejectValue: string }
>("/users/bookmarks", async (params, thunkApi) => {
  try {
    const response = await getUserSavedJobs(params);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      const msg = error.response?.data as ApiPaginatedResponse<null>;

      return thunkApi.rejectWithValue(msg.message);
    }
    return thunkApi.rejectWithValue("Something went wrong!");
  }
});

const getTotalUserSavedJobsThunk = createAsyncThunk<
  number,
  { userId: string },
  { rejectValue: string }
>("/users/bookmarks/count", async (params, thunkApi) => {
  try {
    const response = await getTotalUserSavedJobs(params.userId);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      const msg = error.response?.data as ApiPaginatedResponse<null>;

      return thunkApi.rejectWithValue(msg.message);
    }
    return thunkApi.rejectWithValue("Something went wrong!");
  }
});

const getSavedJobIdsThunk = createAsyncThunk<
  number[],
  { userId: number },
  { rejectValue: string }
>("/bookmarks/saved-job-ids", async (params, thunkApi) => {
  try {
    const response = await getSavedJobIds(params.userId);
    return response.data.savedJobIds;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errResponse = error.response?.data as ApiResponse<number>;
      return thunkApi.rejectWithValue(errResponse.message);
    }

    return thunkApi.rejectWithValue("Something went wrong!");
  }
});

const saveJobThunk = createAsyncThunk<
  number,
  { userId: number; jobId: number; dateBooked: Date },
  { rejectValue: string }
>("bookmarks/save-job", async (params, thunkAPi) => {
  try {
    const response = await saveJob({
      UserId: params.userId,
      JobId: params.jobId,
      DateBooked: params.dateBooked,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errResponse = error.response?.data as ApiResponse<string>;
      return thunkAPi.rejectWithValue(errResponse.message);
    }
    return thunkAPi.rejectWithValue("Something went wrong!");
  }
});

const UnsaveJobThunk = createAsyncThunk<
  string,
  { jobId: number },
  { rejectValue: string }
>("bookmarks/delete", async (params, thunkAPi) => {
  try {
    const response = await UnsaveJob(params.jobId);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errResponse = error.response?.data as ApiResponse<string>;
      return thunkAPi.rejectWithValue(errResponse.message);
    }
    return thunkAPi.rejectWithValue("Something went wrong!");
  }
});

export {
  getUserSavedJobsThunk,
  getTotalUserSavedJobsThunk,
  getSavedJobIdsThunk,
  saveJobThunk,
  UnsaveJobThunk,
};
