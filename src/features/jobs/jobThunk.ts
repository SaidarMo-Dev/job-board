import { createAsyncThunk } from "@reduxjs/toolkit";
import type { JobResponse } from "./jobTypes";
import { fetchJobs, getJobById } from "./jobApi";
import axios from "axios";
import type { ApiPaginatedResponse } from "@/types/ApiPaginatedResponse";

const fetchJobsThunk = createAsyncThunk<
  ApiPaginatedResponse<JobResponse[]>,
  { params: string },
  { rejectValue: string }
>("/jobs", async (query, thunkApi) => {
  try {
    return await fetchJobs(query.params);
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      const responseError = error.response
        ?.data as ApiPaginatedResponse<string>;
      thunkApi.rejectWithValue(responseError.message);
    }
    return thunkApi.rejectWithValue("Somethin wet wrong!");
  }
});

const getJobByIdThunk = createAsyncThunk<
  JobResponse,
  { Id: number },
  { rejectValue: string }
>("/jobs/apply", async (params, thunkApi) => {
  try {
    const response = await getJobById(params.Id);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseError = error.response
        ?.data as ApiPaginatedResponse<string>;
      thunkApi.rejectWithValue(responseError.message);
    }
    return thunkApi.rejectWithValue("Somethin wet wrong!");
  }
});

export { fetchJobsThunk, getJobByIdThunk };
