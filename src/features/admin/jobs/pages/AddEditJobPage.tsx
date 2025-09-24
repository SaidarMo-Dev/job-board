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
import type { Option } from "../jobsType";
import { toast } from "react-toastify";
import { addJob, updateJob } from "@/features/jobs/jobApi";
import { extractAxiosErrorMessage } from "@/utils/apiErrorHandler";
import { useState } from "react";

export default function AddEditJobPage({ mode = "Add" }: { mode: FormMode }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    control,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<JobFormValues>({
    resolver: zodResolver(JobSchema),
    defaultValues: {
      title: "",
      location: "",
      jobType: "FullTime",
      experienceLevel: "Any",
    },
  });

  const selectedCategoryIds: number[] = watch("categoryIds") ?? [];
  const selectedSkillIds = watch("skillIds") ?? [];

  const handleCancel = () => {
    navigate(-1);
  };

  // save job
  const onSubmit = async (data: JobFormValues) => {
    console.log(data);
    setLoading(true);
    try {
      if (mode === "Add") {
        // add job
        const res = await addJob(data);
        toast.success(`Job added successfully with Id : ${res.data}`, {
          position: "bottom-left",
        });

        navigate(-1);
      } else {
        // update job
        await updateJob(data);
        toast.success("Job updated successfully");
      }
    } catch (err) {
      console.log(err);
      toast.error(extractAxiosErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCompany = (id: number) => {
    setValue("companyId", id);
  };
  const handleCreateCategory = (option: Option) => {
    setValue("categoryIds", [...selectedCategoryIds, option.id]);
  };
  const handleCreateSkill = (option: Option) => {
    setValue("skillIds", [...selectedSkillIds, option.id]);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <AddJobHeader onClose={handleCancel} loading={loading} />
        <div className="space-y-6 py-10 max-w-3xl mx-auto">
          <JobDetailsCard
            register={register}
            errors={errors}
            control={control}
          />

          <CompanyCard
            control={control}
            onCreate={handleCreateCompany}
            error={errors.companyId?.message}
          />

          <CategoriesCard
            control={control}
            onCreate={handleCreateCategory}
            error={errors.categoryIds?.message}
          />

          <SkillsCard
            control={control}
            onCreate={handleCreateSkill}
            error={errors.skillIds?.message}
          />
        </div>
      </form>
    </div>
  );
}
