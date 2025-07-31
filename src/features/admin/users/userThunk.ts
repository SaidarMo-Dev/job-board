import type { ApiPaginatedResponse } from "@/types/ApiPaginatedResponse";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { UserManagement } from "./usersTypes";
import { addUser, fetchAdminUsers, updateUser } from "./userApi";
import type { AddFormData, EditFormData } from "./schemas/userSchema";
import { extractAxiosErrorMessage } from "@/utils/apiErrorHandler";

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
    return rejectWithValue(
      extractAxiosErrorMessage(err, "Failed to fetch users")
    );
  }
});

const addUserThunk = createAsyncThunk<
  boolean,
  { data: AddFormData },
  { rejectValue: string }
>("admin/users/add", async (data, { rejectWithValue }) => {
  try {
    const response = await addUser(data.data);
    return response.succeeded;
  } catch (err) {
    console.log(err);
    return rejectWithValue(extractAxiosErrorMessage(err, "Failed to add user"));
  }
});

// Update user thunk
const updateUserThunk = createAsyncThunk<
  string,
  { userId: number; userData: EditFormData },
  { rejectValue: string }
>("/admin/users/update", async ({ userId, userData }, { rejectWithValue }) => {
  try {
    const response = await updateUser(userId, userData);
    return response.message;
  } catch (err) {
    return rejectWithValue(
      extractAxiosErrorMessage(err, "Failed to fetch users")
    );
  }
});

export { fetchAdminUsersThunk, addUserThunk, updateUserThunk };
