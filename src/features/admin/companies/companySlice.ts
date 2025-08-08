import { createSlice } from "@reduxjs/toolkit";
import type { AdminCompaniesState } from "./companyTypes";
import { fetchCompaniesThunk } from "./companyThunk";
import type { RootState } from "@/store";

const initialState: AdminCompaniesState = {
  companies: [],
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

const AdminCompaniesSlice = createSlice({
  name: "admin/companies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch companies
    builder
      .addCase(fetchCompaniesThunk.pending, (state) => {
        state.loading.fetch = true;
        state.error.fetch = null;
      })
      .addCase(fetchCompaniesThunk.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.companies = action.payload.data;

        // pagination info
        state.pagination = {
          currentPage: action.payload.currentPage,
          pageSize: action.payload.pageSize,
          totalRecords: action.payload.totalRecords,
          totalPages: action.payload.totalPages,
          hasNextPage: action.payload.hasNextPage,
          hasPreviousPage: action.payload.hasPreviusPage,
        };
      })
      .addCase(fetchCompaniesThunk.rejected, (state, action) => {
        state.loading.fetch = false;
        state.error.fetch = action.payload ?? "Network error";
      });
  },
});

// selectors

export const selectAdminCompanies = (state: RootState) =>
  state.adminCompaniesReducer.companies;

export default AdminCompaniesSlice.reducer;
