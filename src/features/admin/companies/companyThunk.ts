import type { ApiPaginatedResponse } from "@/types/ApiPaginatedResponse";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { CompanyManagement, SortCompany } from "./companyTypes";
import { extractAxiosErrorMessage } from "@/utils/apiErrorHandler";
import { fetchCompanies } from "./companyApi";

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

export { fetchCompaniesThunk };
