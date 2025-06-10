import "../App.css";

import { HeroSection } from "../components/LandingPageComponents/HeroSection";
import { StatusSection } from "../components/LandingPageComponents/StatusSection";
import { FeaturedJobs } from "../components/LandingPageComponents/FeaturedJobs";
import { BrowseByCategory } from "../components/LandingPageComponents/BrowseByCategory";
import WhyChooseUs from "../components/LandingPageComponents/WhyChooseUS";
import Footer from "../components/LandingPageComponents/Footer";
import HeaderV2 from "../components/LandingPageComponents/Header";

export function LandingPage() {
  return (
    <>
      <HeaderV2 />
      <HeroSection />
      <StatusSection />
      <FeaturedJobs />

      <BrowseByCategory />
      <WhyChooseUs />
      <Footer />
    </>
  );
}
