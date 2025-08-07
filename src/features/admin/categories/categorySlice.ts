import { createSlice } from "@reduxjs/toolkit";
import type { AdminCategoriesState } from "./categoryTypes";
import {
  addCategoryThunk,
  deleteCategoryThunk,
  fetchCategoriesThunk,
  updateCategoryThunk,
} from "./categoryThunk";
import type { RootState } from "@/store";

const initialState: AdminCategoriesState = {
  categories: [],
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

const AdminCategoriesSlice = createSlice({
  name: "admin/categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch categories
      .addCase(fetchCategoriesThunk.pending, (state) => {
        state.loading.fetch = true;
        state.error.fetch = null;
      })
      .addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.categories = action.payload.data;
        state.pagination = {
          currentPage: action.payload.currentPage,
          pageSize: action.payload.pageSize,
          totalRecords: action.payload.totalRecords,
          totalPages: action.payload.totalPages,
          hasNextPage: action.payload.hasNextPage,
          hasPreviousPage: action.payload.hasPreviusPage,
        };
      })
      .addCase(fetchCategoriesThunk.rejected, (state, action) => {
        state.loading.fetch = false;
        state.error.fetch = action.payload ?? "Network error";
      })

      // add catgory
      .addCase(addCategoryThunk.pending, (state) => {
        state.loading.save = true;
        state.error.save = null;
      })
      .addCase(addCategoryThunk.fulfilled, (state) => {
        state.loading.save = false;
      })
      .addCase(addCategoryThunk.rejected, (state, action) => {
        state.loading.save = false;
        state.error.save = action.payload ?? "Network error";
      })

      // update category
      .addCase(updateCategoryThunk.pending, (state) => {
        state.loading.save = true;
        state.error.save = null;
      })
      .addCase(updateCategoryThunk.fulfilled, (state) => {
        state.loading.save = false;
      })
      .addCase(updateCategoryThunk.rejected, (state, action) => {
        state.loading.save = false;
        state.error.save = action.payload ?? "Network error";
      })
      // delete category
      .addCase(deleteCategoryThunk.pending, (state) => {
        state.loading.remove = true;
        state.error.remove = null;
      })
      .addCase(deleteCategoryThunk.fulfilled, (state) => {
        state.loading.remove = false;
      })
      .addCase(deleteCategoryThunk.rejected, (state, action) => {
        state.loading.remove = false;
        state.error.remove = action.payload ?? "Network error";
      });
  },
});

// selectors
export const selectAdminCategories = (state: RootState) =>
  state.adminCategoriesReducer.categories;

export const selectSaveCategoryLoading = (state: RootState) =>
  state.adminCategoriesReducer.loading.save;

export default AdminCategoriesSlice.reducer;
