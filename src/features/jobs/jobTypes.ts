export interface JobResponse {
  Title: string;
  Company: string;
  Location: string;
  JobType: string;
  SalaryRange: string;
  CreatedAt: string; // ISO date string
  Description: string;
  Skills: { Id: number; Skill: string }[];
}

export interface FilterValues {
  jobType: string;
  experienceLevel: string;
  salaryRange: string;
}

export interface JobFilterProps {
  onChange: (filters: FilterValues) => void;
}

export const JobType = {
  Any: "All Types",
  FullTime: "Full Time",
  PartTime: "Part Time",
  Contract: "Contract",
  Freelance: "Freelance",
} as const;

export const ExperienceLevelType = {
  Any: "Any Level",
  EntryLevel: "Entry Level",
  MidLevel: "Mid Level",
  SeniorLevel: "Senior Level",
  LeadPrincipal: "Lead/Principal",
};

export type ExperienceLevelType = keyof typeof ExperienceLevelType;
export type JobType = keyof typeof JobType;
