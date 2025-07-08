import type { ApiPaginatedResponse } from "@/types/ApiPaginatedResponse";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { bookmarkResponse } from "./bookmarksTypes";
import { getTotalUserSavedJobs, getUserSavedJobs } from "./bookmarksApi";
import axios from "axios";

const getUserSavedJobsThunk = createAsyncThunk<
  ApiPaginatedResponse<bookmarkResponse[]>,
  { params: string },
  { rejectValue: string }
>("/users/bookmarks", async (params, thunkApi) => {
  try {
    const response = await getUserSavedJobs(params.params);
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

export { getUserSavedJobsThunk, getTotalUserSavedJobsThunk };
