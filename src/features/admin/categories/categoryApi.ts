import api from "@/api/axiosInstance";
import type {
  AddCategory,
  CategoryManagement,
  UpdateCategory,
} from "./categoryTypes";
import type { ApiPaginatedResponse } from "@/types/ApiPaginatedResponse";
import type { ApiResponse } from "@/types/ApiResponse";

const CATEGORIES_BASE_URL = "/categories";

export const fetchCategories = async (page, size, search, sort) => {
  const params = new URLSearchParams({
    Page: page.toString(),
    PageSize: size.toString(),
    Search: search,
    Sort: sort,
  });

  const response = await api.get<ApiPaginatedResponse<CategoryManagement[]>>(
    `${CATEGORIES_BASE_URL}?${params.toString()}`
  );

  return response.data;
};

export async function addCategory(category: AddCategory) {
  const response = await api.post<ApiResponse<number>>(
    `${CATEGORIES_BASE_URL}`,
    {
      ...category,
    }
  );

  return response.data;
}

export async function updateCategory(category: UpdateCategory) {
  const response = await api.put<ApiResponse<string>>(
    `${CATEGORIES_BASE_URL}`,
    {
      ...category,
    }
  );

  return response.data;
}

export async function deleteCategory(categoryId: number) {
  const response = await api.delete<ApiResponse<string>>(
    `${CATEGORIES_BASE_URL}/${categoryId}`
  );

  return response.data;
}
