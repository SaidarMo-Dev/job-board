import type { applicationStatus } from "../jobApplications/applicationType";

export interface RecentApplication {
  position: string;
  company: string;
  applicantDate: Date;
  status: applicationStatus;
}
