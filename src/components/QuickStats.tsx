import { useToast } from "@/contexts/ToastContext";
import { selectStats } from "@/features/dashboard_stats/dashboardStatsSlice";
import { Briefcase, Eye, FileText, Heart } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router";

export default function QuickStats() {
  const { handleShowCloseToast } = useToast();
  const userStats = useSelector(selectStats);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-12 mt-12">
      <Link
        to=""
        className="block text-center p-4 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-md"
      >
        <div
          className="p-0"
          onClick={() =>
            handleShowCloseToast({
              title: "Not Yet Emplemented",
              description: "this feature is under develepment be patient",
            })
          }
        >
          <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-900">
            {userStats?.totalApplications ?? 0}
          </div>
          <div className="text-sm text-green-700">Applications</div>
        </div>
      </Link>

      <Link
        to={"/members/jobs"}
        className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-md"
      >
        <div className="p-0">
          <Heart className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-purple-900">
            {userStats?.totalSavedJobs ?? 0}
          </div>
          <div className="text-sm text-purple-700">Saved Jobs</div>
        </div>
      </Link>
      <Link
        to={""}
        className="block text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-300 rounded-md"
      >
        <div
          className="p-0"
          onClick={() =>
            handleShowCloseToast({
              title: "Not Yet Emplemented",
              description: "this feature is under develepment be patient",
            })
          }
        >
          <Briefcase className="h-8 w-8 text-sky-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-sky-900">0</div>
          <div className="text-sm text-sky-700">Rejected Applications</div>
        </div>
      </Link>
      <Link
        // to={"/user/history"}
        to={""}
        className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-md"
      >
        <div
          className="p-0"
          onClick={() =>
            handleShowCloseToast({
              title: "Not Yet Emplemented",
              description: "this feature is under develepment be patient",
            })
          }
        >
          <Eye className="h-8 w-8 text-orange-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-orange-900">0</div>
          <div className="text-sm text-orange-700">Pending Applications</div>
        </div>
      </Link>
    </section>
  );
}
