import { createSlice } from "@reduxjs/toolkit";
import type { AdminUserState } from "./usersTypes";
import { fetchAdminUsersThunk } from "./userThunk";
import type { RootState } from "@/store";

const initialAdminUserState: AdminUserState = {
  users: [],
  selectedUser: undefined,
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
  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalRecords: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  },
};

const adminUserSlice = createSlice({
  name: "Admin/Users",
  initialState: initialAdminUserState,
  reducers: {
    resetUsers: (state) => {
      state.users = [];
      state.pagination = {
        currentPage: 1,
        pageSize: 10,
        totalRecords: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminUsersThunk.pending, (state) => {
        state.loading.fetch = true;
        state.error.fetch = null;
      })
      .addCase(fetchAdminUsersThunk.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.users = action.payload.data;
        state.pagination = {
          currentPage: action.payload.currentPage,
          pageSize: action.payload.pageSize,
          totalRecords: action.payload.totalRecords,
          totalPages: action.payload.totalPages,
          hasNextPage: action.payload.hasNextPage,
          hasPreviousPage: action.payload.hasPreviusPage,
        };
      })
      .addCase(fetchAdminUsersThunk.rejected, (state, action) => {
        state.error.fetch = action.payload ?? "Failed to fetch users";
      });
  },
});

// selectors

export const selectAdminUsers = (state: RootState) =>
  state.AdminUserReducer.users;
export const selectUsersPagination = (state: RootState) =>
  state.AdminUserReducer.pagination;
export default adminUserSlice.reducer;

export const { resetUsers } = adminUserSlice.actions;
