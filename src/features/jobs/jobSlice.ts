import { createSlice } from "@reduxjs/toolkit";
import type { JobState } from "./jobTypes";
import { getJobByIdThunk } from "./jobThunk";
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
