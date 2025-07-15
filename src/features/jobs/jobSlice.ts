import { createSlice } from "@reduxjs/toolkit";
import type { JobState } from "./jobTypes";
import { fetchJobsThunk, getJobByIdThunk } from "./jobThunk";
import type { RootState } from "@/store";

const initialState: JobState = {
  jobs: null,
  loading: false,
  error: null,
  hasNextPage: false,
  jobsCount: 0,
  currentPage: 1,
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobsThunk.pending, (state) => {
        state.loading = true;
        state.jobs = null;
        state.error = null;
        state.hasNextPage = false;
        state.jobsCount = 0;
        state.currentPage = 1;
      })
      .addCase(fetchJobsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.data;
        state.error = null;
        state.hasNextPage = action.payload.hasNextPage;
        state.jobsCount = action.payload.totalRecords;
        state.currentPage = action.payload.currentPage;
      })

      .addCase(fetchJobsThunk.rejected, (state, action) => {
        state.loading = false;
        state.jobs = null;
        state.error = action.payload ?? null;
        state.hasNextPage = false;
        state.jobsCount = 0;
        state.currentPage = 1;
      })
      .addCase(getJobByIdThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getJobByIdThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getJobByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong!";
      });
  },
});

export default jobSlice.reducer;

// selections

export const selectJobs = (state: RootState) => state.jobReducer.jobs;
export const selectHasNextPage = (state: RootState) =>
  state.jobReducer.hasNextPage;
export const selectTotalJobs = (state: RootState) => state.jobReducer.jobsCount;
