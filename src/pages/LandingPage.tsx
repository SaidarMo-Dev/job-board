import "../App.css";

import { HeroSection } from "../components/LandingPageComponents/HeroSection";
import { StatusSection } from "../components/LandingPageComponents/StatusSection";
import { FeaturedJobs } from "../components/LandingPageComponents/FeaturedJobs";
import WhyChooseUs from "../components/LandingPageComponents/WhyChooseUS";
import Footer from "../components/LandingPageComponents/Footer";

import Header from "../components/Header";
import { useQuery } from "@tanstack/react-query";
import { fetchJobs } from "@/features/jobs/jobApi";
import { useMemo } from "react";
export function LandingPage() {
  const query = useMemo(() => {
    const params = new URLSearchParams();
    params.append("PageNumber", "1");
    params.append("PageSize", "6");
    return params.toString();
  }, []);

  const jobs = useQuery({
    queryKey: ["fetchJobs"],
    queryFn: () => fetchJobs(query),
  }).data?.jobs;
  return (
    <>
      <Header />
      <HeroSection />
      <StatusSection />
      <FeaturedJobs featuredJobs={jobs ?? []} />
      <WhyChooseUs />
      <Footer />
    </>
  );
}
