import type { applicationStatus } from "../jobApplications/applicationType";

export interface RecentApplication {
  id: number;
  position: string;
  company: string;
  applicantDate: Date;
  status: applicationStatus;
}
