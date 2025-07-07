import HomeHeroSection from "../components/HomeHeroSection";
import QuickStats from "../components/QuickStats";
import ProfileMatch from "../components/ProfileMatch";
import CompleteProfileCard from "../components/CompleteProfileCard";
import QuickTips from "../components/QuickTips";
import QuickPicks from "@/components/QuickPicks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserDashboardStatsThunk } from "@/features/dashboard_stats/dashboardStatsThunk";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/authSlice";
import type { AppDispatch } from "@/store";
import { toast } from "react-toastify";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const currentUserId = useSelector(selectCurrentUser)?.id;

  useEffect(() => {
    dispatch(getUserDashboardStatsThunk({ userId: currentUserId ?? 1 })).then(
      (result) => {
        if (getUserDashboardStatsThunk.rejected.match(result)) {
          toast.error(result.payload);
        }
      }
    );
  }, [currentUserId, dispatch]);

  return (
    <>
      <div className="mb-15">
        <HomeHeroSection className="bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100" />
        <main className="custom-container">
          <QuickStats />
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <div>
                <QuickPicks />
              </div>
              <div>
                <ProfileMatch />
                <CompleteProfileCard />
              </div>
            </div>
            <QuickTips />
          </section>
        </main>
      </div>
    </>
  );
}
