import { createSlice } from "@reduxjs/toolkit";
import type { BookmarkState } from "./bookmarksTypes";
import {
  getSavedJobIdsThunk,
  getTotalUserSavedJobsThunk,
  getUserSavedJobsThunk,
  saveJobThunk,
  UnsaveJobThunk,
} from "./bookmarksThunk";
import type { RootState } from "@/store";

const initialState: BookmarkState = {
  bookmarkedJobs: null,
  savedJobIds: new Set<number>(),
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
      })
      // saved job ids
      .addCase(getSavedJobIdsThunk.pending, (state) => {
        state.error.fetch = null;
        state.loading = true;
      })
      .addCase(getSavedJobIdsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.savedJobIds = new Set(action.payload);
      })
      .addCase(getSavedJobIdsThunk.rejected, (state, action) => {
        state.loading = false;
        state.savedJobIds = null;
        state.error.fetch = action.payload ?? "Something went wrong!";
      })

      // save job
      .addCase(saveJobThunk.pending, (state, action) => {
        state.error.saved = null;
        state.loading = true;

        // Optimistically add the jobId to savedJobIds
        const jobId = action.meta.arg.jobId;
        state.savedJobIds?.add(jobId);
      })
      .addCase(saveJobThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveJobThunk.rejected, (state, action) => {
        state.loading = false;
        state.error.saved = action.payload ?? "Something went wrong!";

        // RollBack : remove the jobId that was optimistically added
        state.savedJobIds?.delete(action.meta.arg.jobId);
      })
      // Unsave job
      .addCase(UnsaveJobThunk.pending, (state, action) => {
        state.error.saved = null;
        state.loading = true;

        // Optimistically remove the jobId to savedJobIds
        state.savedJobIds?.delete(action.meta.arg.jobId);
      })
      .addCase(UnsaveJobThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(UnsaveJobThunk.rejected, (state, action) => {
        state.loading = false;
        state.error.saved = action.payload ?? "Something went wrong!";

        // RollBack : add the jobId that was optimistically removed
        const jobId = action.meta.arg.jobId;
        state.savedJobIds?.add(jobId);
      });
  },
});

export default bookmarkSlice.reducer;

export const selectIsJobSaved = (state: RootState, JobId) => {
  return state.bookmarkReducer.savedJobIds?.has(JobId) ?? false;
};

export const selectBookMarkIsLoading = (state: RootState) =>
  state.bookmarkReducer.loading;

export const selectBookmarkedJobs = (state: RootState) =>
  state.bookmarkReducer.bookmarkedJobs;

export const selectTotalBookmarkedJobs = (state: RootState) =>
  state.bookmarkReducer.totalRecord;
