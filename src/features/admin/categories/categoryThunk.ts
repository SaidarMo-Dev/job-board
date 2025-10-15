import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  AddCategory,
  CategoryManagement,
  SortCategory,
  UpdateCategory,
} from "./categoryTypes";
import type { ApiPaginatedResponse } from "@/shared/types/ApiPaginatedResponse";
import {
  addCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from "./categoryApi";
import { extractAxiosErrorMessage } from "@/utils/apiErrorHandler";

const fetchCategoriesThunk = createAsyncThunk<
  ApiPaginatedResponse<CategoryManagement[]>,
  { page: number; size: number; search: string; sort: SortCategory },
  { rejectValue: string }
>(
  "admin/categories",
  async ({ page, size, search, sort }, { rejectWithValue }) => {
    try {
      const response = await fetchCategories(page, size, search, sort);
      return response;
    } catch (err) {
      return rejectWithValue(extractAxiosErrorMessage(err));
    }
  }
);

const addCategoryThunk = createAsyncThunk<
  number,
  { category: AddCategory },
  { rejectValue: string }
>("admin/categories/add", async ({ category }, { rejectWithValue }) => {
  try {
    const response = await addCategory(category);
    return response.data;
  } catch (err) {
    return rejectWithValue(extractAxiosErrorMessage(err));
  }
});

const updateCategoryThunk = createAsyncThunk<
  string,
  { category: UpdateCategory },
  { rejectValue: string }
>("admin/categories/update", async ({ category }, { rejectWithValue }) => {
  try {
    const response = await updateCategory(category);
    return response.data;
  } catch (err) {
    return rejectWithValue(extractAxiosErrorMessage(err));
  }
});

const deleteCategoryThunk = createAsyncThunk<
  string,
  { categoryId: number },
  { rejectValue: string }
>("admin/categories/delete", async ({ categoryId }, { rejectWithValue }) => {
  try {
    const response = await deleteCategory(categoryId);
    return response.data;
  } catch (err) {
    return rejectWithValue(extractAxiosErrorMessage(err));
  }
});

export {
  fetchCategoriesThunk,
  addCategoryThunk,
  updateCategoryThunk,
  deleteCategoryThunk,
};
