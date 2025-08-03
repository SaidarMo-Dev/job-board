import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AdminProfile } from "./adminTypes";
import { getAdminProfile } from "./adminApi";
import { extractAxiosErrorMessage } from "@/utils/apiErrorHandler";

const getAdminProfileThunk = createAsyncThunk<
  AdminProfile,
  void,
  { rejectValue: string }
>("/admin/profile", async (_, { rejectWithValue }) => {
  try {
    const response = await getAdminProfile();
    return response.data;
  } catch (err) {
    return rejectWithValue(extractAxiosErrorMessage(err));
  }
});

export { getAdminProfileThunk };
