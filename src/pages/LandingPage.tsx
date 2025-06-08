import { Header } from "../components/LandingPageComponents/Header";
import { HeroSection } from "../components/LandingPageComponents/HeroSection";
import "../App.css";

import { StatusSection } from "../components/LandingPageComponents/StatusSection";
import { FeaturedJobs } from "../components/LandingPageComponents/FeaturedJobs";
// import { TopCompaniesHiring } from "../components/LandingPageComponents/TopCompaniesHiring";
export function LandingPage() {
  return (
    <>
      <Header />
      <HeroSection />
      <StatusSection />
      <FeaturedJobs />
      {/* <TopCompaniesHiring />  */}
    </>
  );
}
