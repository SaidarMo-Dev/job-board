import type { CategoryResponse } from "@/types/Category";
import type { SkillResponse } from "@/types/Skill";

export interface JobResponse {
  jobId: number;
  title: string;
  description: string;
  companyName: string;
  location: string;
  jobType: string;
  maxSalary: number;
  minSalary: number;
  experienceLevel: ExperienceLevelType;
  datePosted: Date;
  status: string;
  skills: SkillResponse[];
  cretaedByUser: string;
  categories: CategoryResponse[];
}

export interface JobSummary {
  jobId: number;
  title: string;
  description: string;
  companyName: string;
  location: string;
  jobType: string;
  maxSalary: number;
  minSalary: number;
  experienceLevel: ExperienceLevelType;
  datePosted: Date;
  status: string;
  skills: SkillResponse[];
  cretaedByUser: string;
  categories: CategoryResponse[];
}

export interface FilterValues {
  jobType: string;
  experienceLevel: string;
  salaryRange: string;
}

export interface JobFilterProps {
  onChange: (filters: FilterValues) => void;
}
export const JobStatusType = {
  New: "New",
  Pending: "Pending",
  Accepted: "Accepted",
};

export const JobType = {
  Any: "All Types",
  FullTime: "Full Time",
  PartTime: "Part Time",
  Contract: "Contract",
  Freelance: "Freelance",
} as const;

export type JobType = keyof typeof JobType;

export const ExperienceLevelType = {
  Any: "Any Level",
  EntryLevel: "Entry Level",
  MidLevel: "Mid Level",
  SeniorLevel: "Senior Level",
  LeadPrincipal: "Lead/Principal",
};

export type ExperienceLevelType = keyof typeof ExperienceLevelType;

export const SortJobsBy = {
  HighestSalary: "Highest Salary",
  LowestSalary: "Lowest Salary",
  Recent: "Recent",
  Relevant: "Relevant",
};

export type SortJobsBy = keyof typeof SortJobsBy;

export interface JobState {
  jobs: JobResponse[] | null;
  loading: boolean;
  error: string | null;
  hasNextPage: boolean;
  jobsCount: number;
  currentPage: number;
}
