import type { JobSummary } from "../jobs/jobTypes";

export interface ApplicationData {
  userId: number;
  jobId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  resume: File | null;
  coverLetter?: string;
  linkedIn?: string;
  portfolio?: string;
  experience: string;
  availability: string;
}

export interface UserApplicationResponse {
  applicationId: number;
  job: JobSummary;
  status: string;
  lastStatusDate: Date;
}

export interface StepProps {
  applicationData: ApplicationData;
  onInputChange: (field: keyof ApplicationData, value: string) => void;
  onFileUpload?: (file: File | null) => void;
}

export interface ApplicationState {
  userApplications: Set<UserApplicationResponse>;
  hasNextPage: boolean;
  addedApplicationId: number;
  loading: {
    fetch: boolean;
    save: boolean;
    remove: boolean;
  };
  error: {
    fetch: string | null;
    save: string | null;
    remove: string | null;
  };
}

export type applicationStatus = "All" | "Pending" | "Accepted" | "Rejected";

export type ApplicationStatusFilterType =
  | "All"
  | "Pending"
  | "Accepted"
  | "Rejected";
