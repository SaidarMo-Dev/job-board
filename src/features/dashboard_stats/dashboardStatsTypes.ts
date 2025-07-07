export interface DashboardStatsType {
  totalSavedJobs: number;
  totalApplications: number;
  rejected: number;
  pending: number;
}

export interface dashboardStatsState {
  loading: boolean;
  error: string | null;
  stats: {
    totalSavedJobs: number;
    totalApplications: number;
    rejected: number;
    pending: number;
  } | null;
}
