import type { JobQuickFilters } from "@/features/jobs/jobTypes";

export function getTotalFilterCount(filters: JobQuickFilters): number {
  return (
    filters.jobTypes.length +
    filters.experienceLevels.length +
    filters.popularCategories.length +
    filters.popularCompanies.length
  );
}
