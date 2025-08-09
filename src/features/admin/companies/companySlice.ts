import { createSlice } from "@reduxjs/toolkit";
import type { AdminCompaniesState } from "./companyTypes";
import {
  addCompanyThunk,
  deleteCompanyThunk,
  fetchCompaniesThunk,
  fetchCompanyByIdThunk,
  updateCompanyThunk,
} from "./companyThunk";
import type { RootState } from "@/store";

const initialState: AdminCompaniesState = {
  companies: [],
  editedCompany: null,
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
      })
      // add company
      .addCase(addCompanyThunk.pending, (state) => {
        state.loading.save = true;
        state.error.save = null;
      })
      .addCase(addCompanyThunk.fulfilled, (state) => {
        state.loading.save = false;
      })
      .addCase(addCompanyThunk.rejected, (state, action) => {
        state.loading.save = false;
        state.error.save = action.payload ?? "Network error";
      })

      // update company
      .addCase(updateCompanyThunk.pending, (state) => {
        state.loading.save = true;
        state.error.save = null;
      })
      .addCase(updateCompanyThunk.fulfilled, (state) => {
        state.loading.save = false;
      })
      .addCase(updateCompanyThunk.rejected, (state, action) => {
        state.loading.save = false;
        state.error.save = action.payload ?? "Network error";
      })

      // get companyby Id
      .addCase(fetchCompanyByIdThunk.pending, (state) => {
        state.loading.fetch = true;
        state.error.fetch = null;
        state.editedCompany = null;
      })
      .addCase(fetchCompanyByIdThunk.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.editedCompany = action.payload;
      })
      .addCase(fetchCompanyByIdThunk.rejected, (state, action) => {
        state.loading.fetch = false;
        state.error.fetch = action.payload ?? "Network error";
      })

      // delete thunk
      .addCase(deleteCompanyThunk.pending, (state) => {
        state.loading.remove = true;
        state.error.remove = null;
      })
      .addCase(deleteCompanyThunk.fulfilled, (state) => {
        state.loading.remove = false;
      })
      .addCase(deleteCompanyThunk.rejected, (state, action) => {
        state.loading.remove = false;
        state.error.remove = action.payload ?? "Network error";
      });
  },
});

// selectors

export const selectAdminCompanies = (state: RootState) =>
  state.adminCompaniesReducer.companies;

export const selectCompanySaveLoading = (state: RootState) =>
  state.adminCompaniesReducer.loading.save;

export default AdminCompaniesSlice.reducer;
