import QuickStats from "../shared/components/QuickStats";
import QuickTips from "../shared/components/QuickTips";
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
import { fetchRecommendationJobs } from "@/features/jobs/jobApi";
import CompleteProfileCard from "@/shared/components/CompleteProfileCard";
import { RecentSavedJobs } from "@/features/dashboard/components/RecentSavedJobs";
import { RecentApplications } from "@/features/dashboard/components/RecentApplications";
import { fetechRecentSavedJobs } from "@/features/bookmarks/bookmarksApi";
import { fetchRecentApplications } from "@/features/jobApplications/applicationApi";
import { getAppliedJobIdsThunk } from "@/features/jobApplications/applicationThunk";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const currentUserId = useSelector(selectCurrentUser)?.id ?? -1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(
          getUserDashboardStatsThunk({ userId: currentUserId })
        ).unwrap();
        dispatch(getSavedJobIdsThunk({ userId: currentUserId })).unwrap();
        dispatch(getAppliedJobIdsThunk()).unwrap();
      } catch (err) {
        const message = err as string;
        toast.error(message ?? "Something went wrong");
      }
    };
    fetchData();
  }, [currentUserId, dispatch]);

  const recommendationJobs = useQuery({
    queryKey: ["fetchRecommendationJobs"],
    queryFn: () => fetchRecommendationJobs(),
  }).data;

  const recentSavedJobs = useQuery({
    queryKey: ["fetchRecentSavedJobs"],
    queryFn: () => fetechRecentSavedJobs(1),
  }).data;

  const recentApplications = useQuery({
    queryKey: ["fetchRecentApplications"],
    queryFn: () => fetchRecentApplications(3),
  }).data;

  return (
    <div className="custom-container">
      <div className="mb-15 space-y-6">
        {/* welcome hero */}
        <WelcomeHero />
        <main className="space-y-6">
          {/* stats */}
          <QuickStats />

          {/* job recommendations and complete profile */}
          <div className="flex gap-6 flex-col lg:flex-row">
            <JobRecommendations
              jobs={recommendationJobs ?? []}
              className="flex-1"
            />
            <div className="space-y-4">
              <CompleteProfileCard className="md:w-full" />
              <RecentSavedJobs savedJobs={recentSavedJobs ?? []} />
            </div>
          </div>

          {/* recent applications */}
          <RecentApplications recentApplications={recentApplications ?? []} />
          <QuickTips />
        </main>
      </div>
    </div>
  );
}
