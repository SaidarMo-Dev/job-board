import { HeroSection } from "../components/LandingPageComponents/HeroSection";
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

export function LandingPage() {
  useDocumentTitle("iLink - Find your dream job today");

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
          <FeaturedJobs />
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
