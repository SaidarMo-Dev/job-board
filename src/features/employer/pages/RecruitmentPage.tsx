
import { EmployerJobsTable } from "../components/EmployerJobsTable";
import RecruitmentHeader from "../components/RecruitmentHeader";
import RecruitmentOverview from "../components/RecruitmentOverview";
import EmployerSearchJobs from "../components/EmployerSearchJobs";

export default function RecruitmentPage() {
  return (
    <div className="custom-container">
      <div className="py-6 space-y-6">
        <RecruitmentHeader />
        <RecruitmentOverview
          totalJobs={12}
          ApplicationsReceived={23}
          activeJobs={2}
        />

        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Job Postings</span>
          <EmployerSearchJobs search="" onSearchChange={() => null} />
        </div>
        <EmployerJobsTable
          jobs={[]}
          selectedJobs={[]}
          onJobSelect={() => null}
          onSelectAll={() => null}
          onJobAction={() => null}
          sortBy="id"
          onSort={() => null}
          sortOrder="asc"
          pagination={null}
          onPageChange={() => null}
        />
      </div>
    </div>
  );
}
