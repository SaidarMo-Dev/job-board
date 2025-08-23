import QuickStats from "../components/QuickStats";
import QuickTips from "../components/QuickTips";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserDashboardStatsThunk } from "@/features/dashboard_stats/dashboardStatsThunk";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/authSlice";
import type { AppDispatch } from "@/store";
import { toast } from "react-toastify";
import { getSavedJobIdsThunk } from "@/features/bookmarks/bookmarksThunk";
import { WelcomeHero } from "@/features/dashboard/components/WelcomeHero";
import { JobRecommendations } from "@/features/dashboard/components/JobsRecommendation";
import { useQuery } from "@tanstack/react-query";
import { fetchJobs } from "@/features/jobs/jobApi";
import CompleteProfileCard from "@/components/CompleteProfileCard";
import { RecentSavedJobs } from "@/features/dashboard/components/RecentSavedJobs";
import { RecentApplications } from "@/features/dashboard/components/RecentApplications";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const currentUserId = useSelector(selectCurrentUser)?.id ?? -1;

  useEffect(() => {
    dispatch(getUserDashboardStatsThunk({ userId: currentUserId })).then(
      (result) => {
        if (getUserDashboardStatsThunk.rejected.match(result)) {
          toast.error(result.payload);
        }
      }
    );
    dispatch(getSavedJobIdsThunk({ userId: currentUserId }));
  }, [currentUserId, dispatch]);

  const jobs = useQuery({
    queryKey: ["fetchRecommendedJobs"],
    queryFn: () => fetchJobs(""),
  }).data?.jobs;

  return (
    <div className="custom-container">
      <div className="mb-15 space-y-6">
        {/* welcome hero */}
        <WelcomeHero />
        <main className="space-y-6">
          {/* stats */}
          <QuickStats />

          {/* job recommendations and complete profile */}
          <div className="flex items-start gap-6">
            <JobRecommendations
              jobs={jobs?.slice(0, 3) ?? []}
              className="flex-1"
            />
            <div className="space-y-4">
              <CompleteProfileCard />
              <RecentSavedJobs savedJobs={[]} />
            </div>
          </div>

          {/* recent applications */}
          <RecentApplications recentApplications={[]} />
          <QuickTips />
        </main>
      </div>
    </div>
  );
}
