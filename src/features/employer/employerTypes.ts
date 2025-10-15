import type { SkillResponse } from "@/shared/types/Skill";
import type { CategoryResponse } from "@/shared/types/Category";
import type { ExperienceLevelTypekey, JobTypeKey } from "../jobs/jobTypes";
import type { JobStatus } from "../admin/jobs/jobsType";

export interface EmployerDashboardStats {
  totalJobs: number;
  activeJobs: number;
  applicationsReceived: number;
}

export interface EmployerJob {
  id: number;
  title: string;
  description: string;
  company: string;
  categories: CategoryResponse[];
  skills: SkillResponse[];
  location: string;
  jobType: JobTypeKey;
  experienceLevel: ExperienceLevelTypekey;
  status: JobStatus;
  postedDate: Date;
  expiryDate: Date;
  applicantsCount: number;
  minSalary?: number;
  maxSalary?: number;
  createdBy: string;
}

export type employerJobActionType = "view" | "edit" | "delete" | "paused";
