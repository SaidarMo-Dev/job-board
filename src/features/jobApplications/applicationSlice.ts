import { createSlice } from "@reduxjs/toolkit";
import type { ApplicationSatate } from "./applicationType";
import { applyForJobThunk } from "./applicationThunk";

const initialState: ApplicationSatate = {
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
  userApplications: [],
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
      });
  },
});

export default applicationSlice.reducer;
