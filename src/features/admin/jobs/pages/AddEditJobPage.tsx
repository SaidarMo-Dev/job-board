"use client";

import AddJobHeader from "../components/AddJobHeader";

import { JobDetailsCard } from "../components/JobDetailsCard";
import { CompanyCard } from "../components/CompanyCard";
import { CategoriesCard } from "../components/CategoriesCard";
import { SkillsCard } from "../components/SkillsCard";
import { useNavigate } from "react-router";
import { ROUTES } from "@/constants/routes";
import { useForm } from "react-hook-form";
import { JobSchema, type JobFormValues } from "../schemas/jobSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FormMode } from "@/types/formModes";
import { MAX_CATEGORIES, MAX_SKILLS } from "@/constants/config";

export default function AddEditJobPage({ mode }: { mode: FormMode }) {
  // Lists
  const companies = [];
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
    navigate(ROUTES.ADMIN.JOBS.LIST);
  };

  // save job
  const handleSave = () => {};
  const handleCreateCompany = () => {};
  const handleCreateCategory = () => {};
  const handleCreateSkill = () => {};
  
  return (
    <div className="w-full">
      <AddJobHeader onClose={handleCancel} onSave={handleSave} />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column (2/3) */}
          <div className="space-y-6 lg:col-span-2">
            <JobDetailsCard
              register={register}
              errors={errors}
              control={control}
            />

            <CompanyCard
              control={control}
              companies={companies}
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
      </main>
    </div>
  );
}
