import { EmployerJobsTable } from "../components/EmployerJobsTable";
import RecruitmentHeader from "../components/RecruitmentHeader";
import RecruitmentOverview from "../components/RecruitmentOverview";
import EmployerSearchJobs from "../components/EmployerSearchJobs";
import { useQuery } from "@tanstack/react-query";
import { fetchEmployerJobs, getEmployerDashboardStats } from "../employerApi";
import { useState } from "react";
import useDebounce from "@/hooks/use-debounce";

export default function RecruitmentPage() {
  const [searchJobs, setSearchJobs] = useState("");

  const debouncedSearch = useDebounce(searchJobs, 500);

  const { data: employerStats } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: () => getEmployerDashboardStats(),
    refetchOnWindowFocus: false,
  });

  const {
    data: employerJobs,
    error: jobsError,
    isLoading: jobsLoading,
  } = useQuery({
    queryKey: ["employerPostedJobs", debouncedSearch],
    queryFn: () => fetchEmployerJobs(1, debouncedSearch),
    refetchOnWindowFocus: false,
  });

  return (
    <div className="custom-container">
      <div className="py-6 space-y-6">
        <RecruitmentHeader />
        <RecruitmentOverview
          totalJobs={employerStats?.totalJobs ?? 0}
          ApplicationsReceived={employerStats?.applicationsReceived ?? 0}
          activeJobs={employerStats?.activeJobs ?? 0}
        />

        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Job Postings</span>
          <EmployerSearchJobs
            search={searchJobs}
            onSearchChange={setSearchJobs}
          />
        </div>
        <EmployerJobsTable
          jobs={employerJobs ?? []}
          selectedJobs={[]}
          onJobSelect={() => null}
          onSelectAll={() => null}
          onJobAction={() => null}
          sortBy="id"
          onSort={() => null}
          sortOrder="asc"
          pagination={null}
          onPageChange={() => null}
          loading={jobsLoading}
          error={jobsError?.message}
        />
      </div>
    </div>
  );
}
