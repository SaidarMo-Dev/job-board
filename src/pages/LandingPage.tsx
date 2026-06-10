import { HeroSection } from "../components/LandingPageComponents/HeroSection";
import { useQuery } from "@tanstack/react-query";
import { fetchJobs } from "@/features/jobs/jobApi";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectIsAuthenticated } from "@/features/auth/authSlice";
import { Navigate } from "react-router";
import { TrustedCompanies } from "@/components/LandingPageComponents/TrustedCompanies";
import { useDocumentTitle } from "@/shared/hooks/useDocumentTitle";
import LazyRender from "@/shared/components/LazyRender";
import { lazy, Suspense } from "react";

const CategorySection = lazy(
  () => import("@/components/LandingPageComponents/CategorySection"),
);

const FeaturedJobs = lazy(
  () => import("../components/LandingPageComponents/FeaturedJobs"),
);

const CTASection = lazy(
  () => import("@/components/LandingPageComponents/CTASection"),
);

const WhyChooseUs = lazy(
  () => import("../components/LandingPageComponents/WhyChooseUS"),
);

// Static Query Params Configuration
const LANDING_PAGE_JOBS_PARAMS = "PageNumber=1&PageSize=6";

export function LandingPage() {
  useDocumentTitle("iLink - Find your dream job today");

  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const { data } = useQuery({
    queryKey: ["fetchJobs", LANDING_PAGE_JOBS_PARAMS],
    queryFn: () => fetchJobs(LANDING_PAGE_JOBS_PARAMS),
    // Keeps data cached longer since landing page data doesn't change constantly
    staleTime: 1000 * 60 * 5,
  });

  // Guard Clause: Immediate Redirect (Prevents downstream hooks execution if authed)

  if (isAuthenticated) return <Navigate to="/members" replace />;

  const jobs = data?.jobs ?? [];
  return (
    <>
      <HeroSection />
      <TrustedCompanies />

      <LazyRender placeholderHeight={250}>
        <Suspense>
          <CategorySection />
        </Suspense>
      </LazyRender>
      <LazyRender placeholderHeight={400}>
        <Suspense>
          <FeaturedJobs featuredJobs={jobs ?? []} />
        </Suspense>
      </LazyRender>
      <LazyRender placeholderHeight={800}>
        <Suspense>
          <WhyChooseUs />
        </Suspense>
      </LazyRender>
      <LazyRender placeholderHeight={300}>
        <Suspense>
          <CTASection />
        </Suspense>{" "}
      </LazyRender>
    </>
  );
}
