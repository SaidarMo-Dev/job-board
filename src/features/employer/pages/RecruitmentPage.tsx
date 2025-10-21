import { EmployerJobsTable } from "../components/EmployerJobsTable";
import RecruitmentHeader from "../components/RecruitmentHeader";
import RecruitmentOverview from "../components/RecruitmentOverview";
import EmployerSearchJobs from "../components/EmployerSearchJobs";
import { useQuery } from "@tanstack/react-query";
import { fetchEmployerJobs, getEmployerDashboardStats } from "../employerApi";
import { useState } from "react";
import useDebounce from "@/hooks/use-debounce";
import ConfirmDeleteDailog from "@/dialogs/ConfirmDeleteDialog";
import type { EmployerJob, employerJobActionType } from "../employerTypes";
import { deleteJob } from "@/features/jobs/jobApi";
import { toast } from "react-toastify";
import { JobDetailsModal } from "@/shared/dialogs/JobDetailsModal";
import { useNavigate } from "react-router";
import { ROUTES } from "@/constants/routes";

export default function RecruitmentPage() {
  const navigate = useNavigate();

  const [searchJobs, setSearchJobs] = useState("");

  const [jobToDelete, setJobToDelete] = useState<EmployerJob | null>(null);

  const [jobToView, setJobToView] = useState<EmployerJob | null>(null);

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

  const handleJobAction = (action: employerJobActionType, job: EmployerJob) => {
    if (action === "delete") setJobToDelete(job);
    else if (action === "view") setJobToView(job);
    else if (action === "edit")
      navigate(ROUTES.MEMBER.RECRUITMENT.JOBS.EDIT(job.id));
  };

  const confirmDeleteJob = async () => {
    // TODO : handle delete job
    const deleted = await deleteJob(jobToDelete?.id ?? -1);

    if (deleted) toast.success("Deleted Successfully");
    else toast.error("Failed to delete job!");

    setJobToDelete(null);
  };

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
          onJobAction={handleJobAction}
          sortBy="id"
          onSort={() => null}
          sortOrder="asc"
          pagination={null}
          onPageChange={() => null}
          loading={jobsLoading}
          error={jobsError?.message}
        />
      </div>

      <ConfirmDeleteDailog
        onClose={() => setJobToDelete(null)}
        onDelete={confirmDeleteJob}
        open={jobToDelete !== null}
      />

      {jobToView && (
        <JobDetailsModal
          jobId={jobToView?.id}
          onClose={() => setJobToView(null)}
        />
      )}
    </div>
  );
}
