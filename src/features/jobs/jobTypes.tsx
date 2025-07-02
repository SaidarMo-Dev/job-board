export interface FilterValues {
  jobType: string;
  experienceLevel: string;
  salaryRange: string;
}

export interface JobFilterProps {
  onChange: (filters: FilterValues) => void;
}
