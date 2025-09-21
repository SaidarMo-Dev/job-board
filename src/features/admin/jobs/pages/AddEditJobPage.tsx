"use client";

import AddJobHeader from "../components/AddJobHeader";

import { JobDetailsCard } from "../components/JobDetailsCard";
import { CompanyCard } from "../components/CompanyCard";
import { CategoriesCard } from "../components/CategoriesCard";
import { SkillsCard } from "../components/SkillsCard";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { JobSchema, type JobFormValues } from "../schemas/jobSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FormMode } from "@/types/formModes";
import { MAX_CATEGORIES, MAX_SKILLS } from "@/constants/config";

export default function AddEditJobPage({ mode = "Add" }: { mode: FormMode }) {
  // Lists

  const categories = [];
  const skills = [];

  const navigate = useNavigate();

  const {
    register,
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<JobFormValues>({
    resolver: zodResolver(JobSchema),
  });

  const handleCancel = () => {
    navigate(-1);
  };

  // save job
  const handleSave = () => {};
  const handleCreateCompany = () => {};
  const handleCreateCategory = () => {};
  const handleCreateSkill = () => {};

  return (
    <div className="w-full">
      <AddJobHeader onClose={handleCancel} onSave={handleSave} />
      <div className="space-y-6 py-10 max-w-3xl mx-auto">
        <JobDetailsCard register={register} errors={errors} control={control} />

        <CompanyCard
          control={control}
          onCreate={handleCreateCompany}
          error={errors.companyId?.message}
        />

        <CategoriesCard
          options={categories}
          control={control}
          onCreate={handleCreateCategory}
          error={errors.categoryIds?.message}
          max={MAX_CATEGORIES}
        />

        <SkillsCard
          options={skills}
          control={control}
          onCreate={handleCreateSkill}
          error={errors.skillIds?.message}
          max={MAX_SKILLS}
        />
      </div>
    </div>
  );
}
