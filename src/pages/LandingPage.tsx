import "../App.css";

import { HeroSection } from "../components/LandingPageComponents/HeroSection";
import { StatusSection } from "../components/LandingPageComponents/StatusSection";
import { FeaturedJobs } from "../components/LandingPageComponents/FeaturedJobs";
import { BrowseByCategory } from "../components/LandingPageComponents/BrowseByCategory";
import WhyChooseUs from "../components/LandingPageComponents/WhyChooseUS";
import Footer from "../components/LandingPageComponents/Footer";

import Header from "../components/Header";
export function LandingPage() {
  return (
    <>
      <Header />
      <HeroSection />
      <StatusSection />
      <FeaturedJobs />

      <BrowseByCategory />
      <WhyChooseUs />
      <Footer />
    </>
  );
}
