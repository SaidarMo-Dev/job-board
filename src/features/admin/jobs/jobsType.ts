import type {
  ExperienceLevelType,
  ExperienceLevelTypekey,
  JobType,
  JobTypeKey,
} from "@/features/jobs/jobTypes";
import type { CompanyManagement } from "../companies/companyTypes";

export interface CompanyOption {
  id: number;
  name: string;
}

export interface CategoryOption {
  id: number;
  name: string;
}

export interface SkillOption {
  id: number;
  name: string;
}

export type Option = {
  id: number;
  label: string;
};

export type JobStatus =
  | "Pending"
  | "Active"
  | "Rejected"
  | "Paused"
  | "Closed"
  | "Expired";

export interface JobFilters {
  status: JobStatus[];
  categories: string[];
  companies: string[];
  locations: string[];
  datePosted?: { from?: Date; to?: Date };
}

interface Category {
  id: number;
  name: string;
}

interface Skill {
  id: number;
  name: string;
}

export interface JobManagement {
  id: number;
  title: string;
  description: string;
  company: CompanyManagement;
  categories: Category[];
  skills: Skill[];
  location: string;
  JobType: JobTypeKey;
  experienceLevel: ExperienceLevelTypekey;
  status: JobStatus;
  postedDate: Date;
  expiryDate: Date;
  applicantsCount: number;
  minSalary?: number;
  maxSalary?: number;
  createdBy: string;
}
