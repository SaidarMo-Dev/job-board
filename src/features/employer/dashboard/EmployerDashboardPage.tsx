import { ROUTES } from "@/constants/routes";
import SectionHeader from "../shared/components/SectionHeader";
import { useAppSelector } from "@/hooks/useAppSelector";
import TopPerformingJobs from "./components/TopPerformingJobs";
import EmployerDashboardStats from "../shared/components/EmployerDashboardStats";
import { useQuery } from "@tanstack/react-query";
import { getEmployerDashboardStats } from "../employerApi";
import { useDocumentTitle } from "@/shared/hooks/useDocumentTitle";

export default function EmployerDashboardPage() {
  const employerName = useAppSelector(
    (state) => state.authReducer.currentUser?.firstName,
  );

  useDocumentTitle(`Dashboard - ${employerName} | iLink`);

  const { data: employerStats } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: () => getEmployerDashboardStats(),
    refetchOnWindowFocus: false,
  });

  return (
    <div className="space-y-6">
      <SectionHeader
        to={ROUTES.EMPLOYER.JOBS.ADD}
        title={`Welcome back, ${employerName}`}
        description="Here's what hapening with you hiring pipeline today."
      />
      <EmployerDashboardStats
        totalJobs={employerStats?.totalJobs || 0}
        activeJobs={employerStats?.activeJobs || 0}
        ApplicationsReceived={employerStats?.applicationsReceived || 0}
      />

      <TopPerformingJobs />
    </div>
  );
}
