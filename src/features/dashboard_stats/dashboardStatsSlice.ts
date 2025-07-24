import { createSlice } from "@reduxjs/toolkit";
import type { dashboardStatsState } from "./dashboardStatsTypes";
import { getUserDashboardStatsThunk } from "./dashboardStatsThunk";
import type { RootState } from "@/store";
const initialState: dashboardStatsState = {
  loading: false,
  error: null,
  stats: {
    totalSavedJobs: 0,
    totalApplications: 0,
    rejected: 0,
    pending: 0,
    profileCompletion: 10,
  },
};

const dashboardStatsSlice = createSlice({
  name: "dashboardStats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserDashboardStatsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDashboardStatsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.stats = action.payload;
      })
      .addCase(getUserDashboardStatsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong!";
        state.stats = null;
      });
  },
});

export default dashboardStatsSlice.reducer;

export const selectStats = (state: RootState) =>
  state.dashboardStatsReducer.stats;
