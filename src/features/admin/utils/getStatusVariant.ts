import type { JobStatus } from "../jobs/jobsType";

// Utility functions
export const getStatusBadgeVariant = (status: JobStatus) => {
  switch (status) {
    case "Active":
      return "default";
    case "Pending":
      return "secondary";
    case "Paused":
      return "outline";
    case "Rejected":
      return "destructive";
    case "Closed":
      return "secondary";
    default:
      return "outline";
  }
};
