import { Header } from "../components/LandingPageComponents/Header";
import { HeroSection } from "../components/LandingPageComponents/HeroSection";
import "../App.css";

import { StatusSection } from "../components/LandingPageComponents/StatusSection";
import { FeaturedJobs } from "../components/LandingPageComponents/FeaturedJobs";
import { BrowseByCategory } from "../components/LandingPageComponents/BrowseByCategory";
import { Solutions } from "../components/LandingPageComponents/SolutionsSection";
// import { TopCompaniesHiring } from "../components/LandingPageComponents/TopCompaniesHiring";
export function LandingPage() {
  return (
    <>
      <Header />
      <HeroSection />
      <StatusSection />
      <FeaturedJobs />
      <Solutions />
      {/* <TopCompaniesHiring />  */}
      <BrowseByCategory />
    </>
  );
}
