import { createSlice } from "@reduxjs/toolkit";
import type { AdminSkillsState } from "./skillsTypes";
import {
  addSkillThunk,
  deleteSkillThunk,
  fetchSkillsThunk,
  updateSkillThunk,
} from "./skillsThunk";
import type { RootState } from "@/store";

const initialAdminUserState: AdminSkillsState = {
  skills: [],
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
  name: "admin/skills",
  initialState: initialAdminUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkillsThunk.pending, (state) => {
        state.loading.fetch = true;
        state.error.fetch = null;
      })
      .addCase(fetchSkillsThunk.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.skills = action.payload.data;
        state.pagination = {
          currentPage: action.payload.currentPage,
          pageSize: action.payload.pageSize,
          totalRecords: action.payload.totalRecords,
          totalPages: action.payload.totalPages,
          hasNextPage: action.payload.hasNextPage,
          hasPreviousPage: action.payload.hasPreviusPage,
        };
      })
      .addCase(fetchSkillsThunk.rejected, (state, action) => {
        state.loading.fetch = false;
        state.error.fetch = action.payload ?? "Network error";
      })

      // add skill
      .addCase(addSkillThunk.pending, (state) => {
        state.loading.save = true;
        state.error.save = null;
      })
      .addCase(addSkillThunk.fulfilled, (state) => {
        state.loading.save = false;
      })
      .addCase(addSkillThunk.rejected, (state, action) => {
        state.loading.save = false;
        state.error.save = action.payload ?? "Network error";
      })

      // update skill
      .addCase(updateSkillThunk.pending, (state) => {
        state.loading.save = true;
        state.error.save = null;
      })
      .addCase(updateSkillThunk.fulfilled, (state) => {
        state.loading.save = false;
      })
      .addCase(updateSkillThunk.rejected, (state, action) => {
        state.loading.save = false;
        state.error.save = action.payload ?? "Network error";
      })
      // delete skill
      .addCase(deleteSkillThunk.pending, (state) => {
        state.loading.remove = true;
        state.error.remove = null;
      })

      .addCase(deleteSkillThunk.fulfilled, (state) => {
        state.loading.remove = false;
      })
      .addCase(deleteSkillThunk.rejected, (state, action) => {
        state.loading.remove = false;
        state.error.remove = action.payload ?? "Network error";
      });
  },
});

// selectors

export const selectAdminSkills = (state: RootState) =>
  state.adminSkillsReducer.skills;

export const selectFetchLoading = (state: RootState) =>
  state.adminSkillsReducer.loading.fetch;

export const selectAdminSkillsPagination = (state: RootState) =>
  state.adminSkillsReducer.pagination;

export default adminUserSlice.reducer;
