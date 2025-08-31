import { createSlice } from "@reduxjs/toolkit";
import type {
  ApplicationState,
  UserApplicationResponse,
} from "./applicationType";
import {
  applyForJobThunk,
  getAppliedJobIdsThunk,
  getUserApplicationsThunk,
} from "./applicationThunk";
import type { RootState } from "@/store";

const initialState: ApplicationState = {
  addedApplicationId: -1,
  appliedJobIds: new Set<number>(),
  loading: {
    fetch: false,
    save: false,
    remove: false,
  },
  error: {
    fetch: null,
    save: null,
    remove: null,
  },
  userApplications: new Set<UserApplicationResponse>(),
  hasNextPage: false,
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(applyForJobThunk.pending, (state) => {
        state.loading.fetch = true;
        state.error.fetch = null;
      })
      .addCase(applyForJobThunk.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.addedApplicationId = action.payload;
      })
      .addCase(applyForJobThunk.rejected, (state, action) => {
        state.loading.fetch = false;
        state.error.fetch = action.payload ?? "Something went wrong!";
        state.addedApplicationId = -1;
      })
      // current user applications
      .addCase(getUserApplicationsThunk.pending, (state) => {
        state.loading.fetch = true;
        state.error.fetch = null;
      })
      .addCase(getUserApplicationsThunk.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.userApplications = new Set(action.payload.data);
        state.hasNextPage = action.payload.hasNextPage;
      })
      .addCase(getUserApplicationsThunk.rejected, (state, action) => {
        state.loading.fetch = false;
        state.error.fetch = action.payload ?? "Something went wrong!";
        state.userApplications = new Set<UserApplicationResponse>();
      })

      // applied job ids
      .addCase(getAppliedJobIdsThunk.pending, (state) => {
        state.error.fetch = null;
        state.loading.fetch = true;
      })
      .addCase(getAppliedJobIdsThunk.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.appliedJobIds = new Set(action.payload);
      })
      .addCase(getAppliedJobIdsThunk.rejected, (state, action) => {
        state.loading.fetch = false;
        state.appliedJobIds = new Set<number>();
        state.error.fetch = action.payload ?? "Something went wrong!";
      });
  },
});

// selectors

export const selectAppliedJobIds = (state: RootState) =>
  state.applicationReducer.appliedJobIds;

export const selectIsJobApplied = (state: RootState, JobId) => {
  if (state.applicationReducer.appliedJobIds.size > 0)
    return state.applicationReducer.appliedJobIds?.has(JobId) ?? false;

  return false;
};

export default applicationSlice.reducer;
