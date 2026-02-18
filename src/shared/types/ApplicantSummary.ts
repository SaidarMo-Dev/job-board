import type { applicationStatus } from "@/features/jobApplications/applicationType";

export interface ApplicantSummary {
  id: number;
  name: string;
  imagePath: string;
  profileImageFileId?: number;
  profileImageUrl?: string;
  email: string;
  experience: string;
  country?: string;
  status: applicationStatus;
  appliedDate: string;
  resumeFileId: number;
}
