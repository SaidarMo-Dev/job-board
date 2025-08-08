import type { PaginationInfo } from "../users/usersTypes";

export const sortOptions = [
  { label: "Name (A-Z)", value: "NameAsc" },
  { label: "Name (Z-A)", value: "NameDesc" },
] as const;

export type SortCompany = (typeof sortOptions)[number]["value"];

export interface CompanyManagement {
  companyId: number;
  companyName: string;
  description: string;
  websiteUrl?: string;
  location: string;
  phoneNumber?: string;
  email: string;
  fax?: string;
  industry?: string;
  totalJobs: number;
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

export interface addCompanyRequest {
  companyName: string;
  description: string;
  websiteUrl?: string;
  location: string;
  phoneNumber?: string;
  email: string;
  fax?: string;
  industry?: string;
}

export interface updateCompanyRequest {
  companyId: number;
  companyName: string;
  description: string;
  websiteUrl?: string;
  location: string;
  phoneNumber?: string;
  email: string;
  fax?: string;
  industry?: string;
}
