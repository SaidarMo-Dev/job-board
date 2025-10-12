import { ROUTES } from "@/constants/routes";
import { selectStats } from "@/features/dashboard_stats/dashboardStatsSlice";
import { Briefcase, Eye, FileText, Heart } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router";

export default function QuickStats() {
  const userStats = useSelector(selectStats);

  const statsInfo = [
    {
      label: "applications",
      href: ROUTES.MEMBER.APPLICATIONS,
      icon: <FileText className="h-6 w-6" />,
      value: userStats?.totalApplications,
    },
    {
      label: "Saved Jobs",
      href: ROUTES.MEMBER.SAVED_JOBS,
      icon: <Heart className="h-6 w-6" />,
      value: userStats?.totalSavedJobs,
    },
    {
      label: "Rejected Applications",
      href: ROUTES.MEMBER.APPLICATIONS,
      icon: <Briefcase className="h-6 w-6" />,
      value: userStats?.rejected,
    },
    {
      label: "Pending Applications",
      href: ROUTES.MEMBER.APPLICATIONS,
      icon: <Eye className="h-6 w-6" />,
      value: userStats?.pending,
    },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {statsInfo.map((stats) => (
        <div className="hover:shadow-md transition-shadow text-center p-4 rounded-md border border-gray-300 bg-gray-50">
          <Link to={stats.href}>
            <div className="p-1 flex flex-col items-center space-y-2">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                {stats.icon}
              </div>
              <div className="text-2xl font-bold">{stats.value ?? 0}</div>
              <div className="text-sm">{stats.label}</div>
            </div>
          </Link>
        </div>
      ))}
    </section>
  );
}
