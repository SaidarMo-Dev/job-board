import { createSlice } from "@reduxjs/toolkit";
import type {
  ApplicationState,
  UserApplicationResponse,
} from "./applicationType";
import { applyForJobThunk, getUserApplicationsThunk } from "./applicationThunk";

const initialState: ApplicationState = {
  addedApplicationId: -1,
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
      });
  },
});

export default applicationSlice.reducer;
