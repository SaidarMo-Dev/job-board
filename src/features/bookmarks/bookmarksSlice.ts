import { createSlice } from "@reduxjs/toolkit";
import type { bookmarkState } from "./bookmarksTypes";
import { getUserSavedJobsThunk } from "./bookmarksThunk";
import type { RootState } from "@/store";

const initialState: bookmarkState = {
  bookmarkedJobs: null,
  savedJobIds: null,
  loading: false,
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
      })
      .addCase(getUserSavedJobsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error.fetch = action.payload ?? null;
        state.bookmarkedJobs = null;
      });
  },
});

export default bookmarkSlice.reducer;

export const selectBookmarkedJobs = (state: RootState) =>
  state.bookmarkReducer.bookmarkedJobs;
