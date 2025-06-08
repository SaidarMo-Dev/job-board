import { Header } from "../components/LandingPageComponents/Header";
import { HeroSection } from "../components/LandingPageComponents/HeroSection";
import "../App.css";

import { StatusSection } from "../components/LandingPageComponents/StatusSection";
import { FeaturedJobs } from "../components/LandingPageComponents/FeaturedJobs";
export function LandingPage() {
  return (
    <>
      <Header />
      <HeroSection />
      <StatusSection />
      <FeaturedJobs />
    </>
  );
}
