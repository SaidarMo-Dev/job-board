import type { ApiPaginatedResponse } from "@/types/ApiPaginatedResponse";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { UserManagement } from "./usersTypes";
import { fetchAdminUsers } from "./userApi";
import axios from "axios";

const fetchAdminUsersThunk = createAsyncThunk<
  ApiPaginatedResponse<UserManagement[]>,
  {
    query: string;
  },
  { rejectValue: string }
>("Admin/Users", async (params, { rejectWithValue }) => {
  try {
    const response = await fetchAdminUsers(params.query);
    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorData = err.response?.data as
        | ApiPaginatedResponse<string>
        | undefined;

      return rejectWithValue(errorData?.message || "Failed to fetch users");
    }
    return rejectWithValue("Network error occurred");
  }
});

export { fetchAdminUsersThunk };
