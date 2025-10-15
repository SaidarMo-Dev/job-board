import type { ApiPaginatedResponse } from "@/shared/types/ApiPaginatedResponse";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { CompanyManagement, SortCompany } from "./companyTypes";
import { extractAxiosErrorMessage } from "@/utils/apiErrorHandler";
import {
  addCompany,
  deleteCompany,
  fetchCompanies,
  fetchCompanyById,
  updateCompany,
} from "./companyApi";
import type { ApiResponse } from "@/shared/types/ApiResponse";
import type { CompanyFormValues } from "./schemas/CompanySchema";

const fetchCompaniesThunk = createAsyncThunk<
  ApiPaginatedResponse<CompanyManagement[]>,
  { page: number; size: number; search: string; sort: SortCompany },
  { rejectValue: string }
>(
  "admin/companies",
  async ({ page, size, search, sort }, { rejectWithValue }) => {
    try {
      return await fetchCompanies(page, size, search, sort);
    } catch (err) {
      return rejectWithValue(extractAxiosErrorMessage(err));
    }
  }
);

const addCompanyThunk = createAsyncThunk<
  ApiResponse<number>,
  { data: CompanyFormValues },
  { rejectValue: string }
>("admin/companies/add", async ({ data }, { rejectWithValue }) => {
  try {
    return await addCompany(data);
  } catch (err) {
    console.log(err);
    return rejectWithValue(extractAxiosErrorMessage(err));
  }
});

const updateCompanyThunk = createAsyncThunk<
  ApiResponse<string>,
  { data: CompanyFormValues; companyId: number },
  { rejectValue: string }
>(
  "admin/companies/update",
  async ({ data, companyId }, { rejectWithValue }) => {
    try {
      return await updateCompany(data, companyId);
    } catch (err) {
      return rejectWithValue(extractAxiosErrorMessage(err));
    }
  }
);

const fetchCompanyByIdThunk = createAsyncThunk<
  CompanyManagement,
  { Id: number },
  { rejectValue: string }
>("admin/companies/Id", async ({ Id }, { rejectWithValue }) => {
  try {
    return await fetchCompanyById(Id);
  } catch (err) {
    return rejectWithValue(extractAxiosErrorMessage(err));
  }
});

const deleteCompanyThunk = createAsyncThunk<
  string,
  { Id: number },
  { rejectValue: string }
>("admin/companies/delete", async ({ Id }, { rejectWithValue }) => {
  try {
    return await deleteCompany(Id);
  } catch (err) {
    return rejectWithValue(extractAxiosErrorMessage(err));
  }
});

export {
  fetchCompaniesThunk,
  addCompanyThunk,
  updateCompanyThunk,
  fetchCompanyByIdThunk,
  deleteCompanyThunk,
};
