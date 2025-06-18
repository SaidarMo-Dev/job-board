import HomeHeader from "../components/HomeHeader";
import HomeHeroSection from "../components/HomeHeroSection";
import QuickStats from "../components/QuickStats";
import ExploreJobs from "../components/ExploreJobs";
import ProfileMatch from "../components/ProfileMatch";
import CompleteProfileCard from "../components/CompleteProfileCard";
import QuickTips from "../components/QuickTips";
import AuthGuard from "./Auth/authGuard";

export default function Home() {
  return (
    <AuthGuard>
      <div className="mb-15">
        <HomeHeader />
        <main className="custom-container">
          <HomeHeroSection />
          <QuickStats />
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <div>
                <ExploreJobs />
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
    </AuthGuard>
  );
}
