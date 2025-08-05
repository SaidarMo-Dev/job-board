"use client";

import { useAppSelector } from "@/hooks/useAppSelector";
import { selectAdminSkills } from "../skills/skillsSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { deleteSkillThunk } from "../skills/skillsThunk";
import { toast } from "react-toastify";

export function useSkills() {
  const dispatch = useAppDispatch();

  const skills = useAppSelector(selectAdminSkills);

  const deleteSkill = async (skillId: number) => {
    const result = await dispatch(deleteSkillThunk({ skillId }));
    if (deleteSkillThunk.fulfilled.match(result)) {
      toast.success("Deleted successfully");
    } else {
      toast.error(result.payload);
    }
  };

  const filterSkills = (searchTerm: string) => {
    if (!skills) return null;

    return skills.filter((skill) =>
      skill.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return {
    skills,
    deleteSkill,
    filterSkills,
  };
}
