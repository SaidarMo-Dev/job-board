import type { PaginationInfo } from "../users/usersTypes";

export interface skillManagement {
  id: number;
  name: string;
  description?: string;
  createDate: string;
}

export type SortSkill = "Name" | "CreateDate";

export interface AdminSkillsState {
  skills: skillManagement[];
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

export interface AddSkill {
  name: string;
  description?: string;
}

export interface UpdateSkill {
  skillId: number;
  name: string;
  description: string;
}
