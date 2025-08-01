import type { ApiPaginatedResponse } from "@/types/ApiPaginatedResponse";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { UserManagement } from "./usersTypes";
import { addUser, fetchAdminUsers, updateUser } from "./userApi";
import type { AddFormData, EditFormData } from "./schemas/userSchema";
import { extractAxiosErrorMessage } from "@/utils/apiErrorHandler";
import { DeleteUser } from "@/features/users/userApi";
import { verifyPassword } from "@/features/auth/authApi";

const fetchAdminUsersThunk = createAsyncThunk<
  ApiPaginatedResponse<UserManagement[]>,
  {
    query: string;
  },
  { rejectValue: string }
>("Admin/users", async (params, { rejectWithValue }) => {
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

// delete user thunk
const deleteUserThunk = createAsyncThunk<
  string,
  { Id: number },
  { rejectValue: string }
>("/admin/users/delete", async ({ Id }, { rejectWithValue }) => {
  try {
    const response = await DeleteUser(Id);
    return response.message;
  } catch (err) {
    return rejectWithValue(
      extractAxiosErrorMessage<string>(err, "Failed to delete user")
    );
  }
});

// confirm password thunk
const verifyPasswrodThunk = createAsyncThunk<
  string,
  { password: string },
  { rejectValue: string }
>("/admin/users/verify-password", async ({ password }, { rejectWithValue }) => {
  try {
    const response = await verifyPassword(password);
    return response.message;
  } catch (err) {
    console.log(err);
    return rejectWithValue(
      extractAxiosErrorMessage(err, "Failed to verify password")
    );
  }
});

export {
  fetchAdminUsersThunk,
  addUserThunk,
  updateUserThunk,
  deleteUserThunk,
  verifyPasswrodThunk,
};
