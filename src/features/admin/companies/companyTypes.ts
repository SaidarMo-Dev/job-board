import type { PaginationInfo } from "../users/usersTypes";

export type SortCompany = "NameAsc" | "NameDesc";

export interface CompanyManagement {
  CompanyId: number;
  CompanyName: string;
  Description: string;
  WebsiteUrl: string;
  Location: string;
  PhoneNumber: string;
  Email: string;
  Fax: string;
  Industry: string;
  TotalJobs: number;
  createdByUser: string;
}

export interface AdminCompaniesState {
  companies: CompanyManagement[];
  loading: {
    fetch: boolean;
    save: boolean;
    remove: boolean;
  };
  error: {
    fetch: string | null;
    save: string | null;
    remove: string | null;
  };
  pagination: PaginationInfo;
}
