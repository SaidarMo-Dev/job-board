import type { PaginationInfo } from "../users/usersTypes";

export type SortCategory =
  | "NameAsc"
  | "NameDesc"
  | "OlderFirst"
  | "NewestFirst";

export interface CategoryManagement {
  categoryId: number;
  name: string;
  description: string;
  createDate: string;
}

export interface AdminCategoriesState {
  categories: CategoryManagement[];
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

export type categoryMode = "AddNew" | "Edit";

export interface AddCategory {
  name: string;
  description?: string;
}

export interface UpdateCategory {
  categoryId: number;
  name: string;
  description?: string;
}
