import "../App.css";

import { HeroSection } from "../components/LandingPageComponents/HeroSection";
import { StatusSection } from "../components/LandingPageComponents/StatusSection";
import { FeaturedJobs } from "../components/LandingPageComponents/FeaturedJobs";
import { BrowseByCategory } from "../components/LandingPageComponents/BrowseByCategory";
import WhyChooseUs from "../components/LandingPageComponents/WhyChooseUS";
import Footer from "../components/LandingPageComponents/Footer";

import Header from "../components/Header";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useEffect } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
export function LandingPage() {
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   const params = new URLSearchParams();
  //   params.append("Page", "1");
  //   params.append("Size", "6");
  //   dispatch(fetchJobsThunk({ params: params.toString() }));
  // }, [dispatch]);

  const jobs = useAppSelector((state) => state.jobReducer.jobs?.slice(0, 6));
  return (
    <>
      <Header />
      <HeroSection />
      <StatusSection />
      <FeaturedJobs featuredJobs={jobs ?? []} />

      <BrowseByCategory />
      <WhyChooseUs />
      <Footer />
    </>
  );
}
