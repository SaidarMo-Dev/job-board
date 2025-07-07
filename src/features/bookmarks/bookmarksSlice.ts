import { createSlice } from "@reduxjs/toolkit";
import type { bookmarkState } from "./bookmarksTypes";
import {
  getTotalUserSavedJobsThunk,
  getUserSavedJobsThunk,
} from "./bookmarksThunk";
import type { RootState } from "@/store";

const initialState: bookmarkState = {
  bookmarkedJobs: null,
  savedJobIds: null,
  loading: false,
  totalRecord: 0,
  error: {
    fetch: null,
    saved: null,
    remove: null,
  },
};

const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserSavedJobsThunk.pending, (state) => {
        state.loading = true;
        state.error.fetch = null;
        state.bookmarkedJobs = null;
      })
      .addCase(getUserSavedJobsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error.fetch = null;
        state.bookmarkedJobs = action.payload.data;
        state.totalRecord = action.payload.totalRecords;
      })
      .addCase(getUserSavedJobsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error.fetch = action.payload ?? null;
        state.bookmarkedJobs = null;
      })

      // total saved jobs
      .addCase(getTotalUserSavedJobsThunk.pending, (state) => {
        state.loading = true;
        state.error.fetch = null;
        state.totalRecord = 0;
      })
      .addCase(getTotalUserSavedJobsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error.fetch = null;
        state.totalRecord = action.payload;
      })
      .addCase(getTotalUserSavedJobsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error.fetch = action.payload ?? null;
        state.totalRecord = 0;
      });
  },
});

export default bookmarkSlice.reducer;

export const selectBookmarkedJobs = (state: RootState) =>
  state.bookmarkReducer.bookmarkedJobs;

export const selectTotalBookmarkedJobs = (state: RootState) =>
  state.bookmarkReducer.totalRecord;
