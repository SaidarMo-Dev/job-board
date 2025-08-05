import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  AddSkill,
  skillManagement,
  SortSkill,
  UpdateSkill,
} from "./skillsTypes";
import { addSkill, deleteSkill, fetchSkills, updateSkill } from "./skillsApi";
import { type ApiPaginatedResponse } from "@/types/ApiPaginatedResponse";
import { extractAxiosErrorMessage } from "@/utils/apiErrorHandler";

const fetchSkillsThunk = createAsyncThunk<
  ApiPaginatedResponse<skillManagement[]>,
  { page: number; size: number; search: string; sort: SortSkill },
  { rejectValue: string }
>("admin/skills", async ({ page, size, search, sort }, { rejectWithValue }) => {
  try {
    const response = await fetchSkills(page, size, search, sort);
    return response;
  } catch (err) {
    return rejectWithValue(extractAxiosErrorMessage(err));
  }
});

const addSkillThunk = createAsyncThunk<
  number,
  { skill: AddSkill },
  { rejectValue: string }
>("admin/skills/add", async ({ skill }, { rejectWithValue }) => {
  try {
    const response = await addSkill(skill);
    return response.data;
  } catch (err) {
    return rejectWithValue(extractAxiosErrorMessage(err));
  }
});

const updateSkillThunk = createAsyncThunk<
  string,
  { skill: UpdateSkill },
  { rejectValue: string }
>("admin/skills/update", async ({ skill }, { rejectWithValue }) => {
  try {
    const response = await updateSkill(skill);
    return response.data;
  } catch (err) {
    return rejectWithValue(extractAxiosErrorMessage(err));
  }
});

const deleteSkillThunk = createAsyncThunk<
  string,
  { skillId: number },
  { rejectValue: string }
>("admin/skills/delete", async ({ skillId }, { rejectWithValue }) => {
  try {
    const response = await deleteSkill(skillId);
    return response.data;
  } catch (err) {
    return rejectWithValue(extractAxiosErrorMessage(err));
  }
});

export { fetchSkillsThunk, addSkillThunk, updateSkillThunk, deleteSkillThunk };
