import { createSlice } from "@reduxjs/toolkit";
import type { AdminUserState } from "./usersTypes";
import { fetchAdminUsersThunk } from "./userThunk";
import type { RootState } from "@/store";

const initialAdminUserState: AdminUserState = {
  users: [],
  selectedUser: undefined,
  selectedUserIds: new Set<number>(),
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
    selectUser: (state, action) => {
      state.selectedUserIds.add(action.payload);
    },
    deselectUser: (state, action) => {
      state.selectedUserIds.delete(action.payload);
    },
    clearSelections: (state) => {
      state.selectedUserIds.clear();
    },
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
    selectAllUsersOnPage: (state) => {
      const allUserIds = state.users.map((user) => user.id);
      state.selectedUserIds = new Set([
        ...state.selectedUserIds,
        ...allUserIds,
      ]);
    },

    deselectAllUsersOnPage: (state) => {
      const currentPageUserIds = state.users.map((user) => user.id);

      state.selectedUserIds = new Set([
        ...Array.from(state.selectedUserIds).filter(
          (id) => !currentPageUserIds.includes(id)
        ),
      ]);
    },
    toggleSelectAllOnPage: (state) => {
      const currenPageUserIds = state.users.map((user) => user.id);
      const selectedUserIdsArray = Array.from(state.selectedUserIds);

      const AllSelected = currenPageUserIds.every((id) =>
        selectedUserIdsArray.includes(id)
      );

      if (AllSelected) {
        state.selectedUserIds = new Set([
          ...selectedUserIdsArray.filter(
            (id) => !currenPageUserIds.includes(id)
          ),
        ]);
      } else {
        state.selectedUserIds = new Set([
          ...selectedUserIdsArray,
          ...currenPageUserIds,
        ]);
      }
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
export const selectFetchAdminUsersLoading = (state: RootState) =>
  state.AdminUserReducer.loading.fetch;

export const selectSaveUserLoading = (state: RootState) =>
  state.AdminUserReducer.loading.save;

export const selectAdminUsers = (state: RootState) =>
  state.AdminUserReducer.users;
export const selectUsersPagination = (state: RootState) =>
  state.AdminUserReducer.pagination;
export const selectSelectedUserIds = (state: RootState) =>
  state.AdminUserReducer.selectedUserIds;

export const selectAreAllUsersOnPageSelected = (state: RootState) => {
  if (
    !state.AdminUserReducer.users ||
    state.AdminUserReducer.users.length === 0
  )
    return false;

  const currentPageUserIds = state.AdminUserReducer.users.map(
    (user) => user.id
  );

  return currentPageUserIds.every((id) =>
    state.AdminUserReducer.selectedUserIds.has(id)
  );
};

export const {
  resetUsers,
  selectUser,
  deselectUser,
  clearSelections,
  selectAllUsersOnPage,
  deselectAllUsersOnPage,
  toggleSelectAllOnPage,
} = adminUserSlice.actions;

export default adminUserSlice.reducer;
