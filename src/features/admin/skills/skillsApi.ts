import api from "@/api/axiosInstance";
import type {
  AddSkill,
  skillManagement,
  SortSkill,
  UpdateSkill,
} from "./skillsTypes";
import type { ApiPaginatedResponse } from "@/types/ApiPaginatedResponse";
import type { ApiResponse } from "@/types/ApiResponse";
import type { Option } from "../jobs/jobsType";

const SKILL_BASE_URL = "/skills";

export async function fetchSkills(
  page: number,
  size: number,
  search: string,
  sort: SortSkill
) {
  const params = new URLSearchParams({
    Page: page.toString(),
    PageSize: size.toString(),
    Search: search,
    SortBy: sort,
  });

  const response = await api.get<ApiPaginatedResponse<skillManagement[]>>(
    `${SKILL_BASE_URL}?${params.toString()}`
  );

  return response.data;
}

export async function addSkill(skill: AddSkill) {
  const response = await api.post<ApiResponse<number>>(`${SKILL_BASE_URL}`, {
    ...skill,
  });

  return response.data;
}

export async function updateSkill(skill: UpdateSkill) {
  const response = await api.put<ApiResponse<string>>(`${SKILL_BASE_URL}`, {
    ...skill,
  });

  return response.data;
}

export async function deleteSkill(skillId: number) {
  const response = await api.delete<ApiResponse<string>>(
    `${SKILL_BASE_URL}/${skillId}`
  );

  return response.data;
}

export async function fetchSkillsSummary(page: number, size: number) {
  return (
    await api.get<ApiPaginatedResponse<Option[]>>(
      `${SKILL_BASE_URL}/summary?page=${page}&size=${size}`
    )
  ).data;
}
