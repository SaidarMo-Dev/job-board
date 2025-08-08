import type { ApiPaginatedResponse } from "@/types/ApiPaginatedResponse";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  addCompanyRequest,
  CompanyManagement,
  SortCompany,
  updateCompanyRequest,
} from "./companyTypes";
import { extractAxiosErrorMessage } from "@/utils/apiErrorHandler";
import { addCompany, fetchCompanies, updateCompany } from "./companyApi";
import type { ApiResponse } from "@/types/ApiResponse";

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
  { company: addCompanyRequest },
  { rejectValue: string }
>("admin/companies/add", async ({ company }, { rejectWithValue }) => {
  try {
    return await addCompany(company);
  } catch (err) {
    return rejectWithValue(extractAxiosErrorMessage(err));
  }
});

const updateCompanyThunk = createAsyncThunk<
  ApiResponse<string>,
  { company: updateCompanyRequest },
  { rejectValue: string }
>("admin/companies/update", async ({ company }, { rejectWithValue }) => {
  try {
    return await updateCompany(company);
  } catch (err) {
    return rejectWithValue(extractAxiosErrorMessage(err));
  }
});

export { fetchCompaniesThunk, addCompanyThunk, updateCompanyThunk };
