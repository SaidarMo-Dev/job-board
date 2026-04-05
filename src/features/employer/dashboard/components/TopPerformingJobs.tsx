import { useQuery } from "@tanstack/react-query";
import { fetchEmployerJobs } from "../../employerApi";
import { useNavigate } from "react-router";
import type { EmployerJob, employerJobActionType } from "../../employerTypes";
import { ROUTES } from "@/constants/routes";
import { useState } from "react";
import ConfirmDeleteDailog from "@/dialogs/ConfirmDeleteDialog";
import { JobDetailsModal } from "@/shared/dialogs/JobDetailsModal";
import { deleteJob } from "@/features/jobs/jobApi";
import { toast } from "react-toastify";
import { EmployerJobsTable } from "../../Jobs/components/EmployerJobsTable";

export default function TopPerformingJobs() {
  const navigate = useNavigate();

  const [jobToDelete, setJobToDelete] = useState<EmployerJob | null>(null);

  const [jobToView, setJobToView] = useState<EmployerJob | null>(null);

  const {
    data: employerJobs,
    error: jobsError,
    isLoading: jobsLoading,
  } = useQuery({
    queryKey: ["TopPerformingJobs"],
    queryFn: () => fetchEmployerJobs(1),
    refetchOnWindowFocus: false,
  });

  const handleJobAction = (action: employerJobActionType, job: EmployerJob) => {
    if (action === "delete") setJobToDelete(job);
    else if (action === "view") setJobToView(job);
    else if (action === "edit") navigate(ROUTES.EMPLOYER.JOBS.EDIT(job.id));
  };

  const confirmDeleteJob = async () => {
    // TODO : handle delete job
    const deleted = await deleteJob(jobToDelete?.id ?? -1);

    if (deleted) toast.success("Deleted Successfully");
    else toast.error("Failed to delete job!");

    setJobToDelete(null);
  };
  return (
    <>
      <div>
        <h3 className="font-medium text-lg my-5">Top Performing Jobs</h3>

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
    </>
  );
}
