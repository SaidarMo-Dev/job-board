import { createAsyncThunk } from "@reduxjs/toolkit";
import type { DashboardStatsType } from "./dashboardStatsTypes";
import { getUserDashboardStats } from "./dashboardStatsApi";
import axios from "axios";
import type { ApiResponse } from "@/shared/types/ApiResponse";

const getUserDashboardStatsThunk = createAsyncThunk<
  DashboardStatsType,
  { userId: number },
  { rejectValue: string }
>("users/dashboard-stats", async (params, thunkApi) => {
  try {
    const response = await getUserDashboardStats(params.userId);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const response = error.response?.data as ApiResponse<DashboardStatsType>;
      return thunkApi.rejectWithValue(response.message);
    }

    return thunkApi.rejectWithValue("something went wrong!");
  }
});

export { getUserDashboardStatsThunk };
