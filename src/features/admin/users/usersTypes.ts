export interface UserManagement {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  username: string;
  phoneNumber?: string;
  address?: string;
  gender?: string;
  dateofBirth?: Date;
  imagePath: string;
  isDeleted: boolean;
  deletedAt?: Date;
  country: string;
  role: string;
}

export type RoleType = "Admin" | "Employer" | "JobSeeker";

export const FilterByRole = {
  All: "All",
  Admin: "Admin",
  Employer: "Employer",
  JobSeeker: "Job Seeker",
} as const;

export type FilterByRole = (typeof FilterByRole)[keyof typeof FilterByRole];

export type FilterByStatus = "All" | "Active" | "Suspended";

export interface PaginationInfo {
  currentPage: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface AdminUserState {
  users: UserManagement[];
  selectedUser?: UserManagement;
  selectedUserIds: Set<number>;
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

export interface UserFilterValues {
  role?: FilterByRole;
  status?: FilterByStatus;
  page: number;
  PageSize: number;
}
