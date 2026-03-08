import { ArrowRight, Briefcase, CircleCheck } from "lucide-react";
import { useToast } from "../../contexts/ToastContext";
import JobSearch from "../../features/jobs/components/JobSearch";
import { Link, useNavigate } from "react-router";
import { Button } from "../ui/button";

export function HeroSection() {
  const navigate = useNavigate();

  function handleSearch(title: string, location: string) {
    const params = new URLSearchParams();

    if (title) params.append("searchByTitle", title);
    else params.delete("searchByTitle");
    if (location) params.append("searchByLocation", location);
    else params.delete("searchByLocation");

    navigate(`/jobs?${params.toString()}`);
  }

  const { handleShowCloseToast } = useToast();

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section with job search"
    >
      {/* Background Image Layer - Responsive Picture Element */}
      <picture className="absolute inset-0 w-full h-full">
        {/* Large screens / desktops */}
        <source
          srcSet="/images/hero-1900.webp"
          media="(min-width: 1200px)"
          type="image/webp"
        />
        {/* Tablets and small laptops */}
        <source
          srcSet="/images/hero-1200.webp"
          media="(min-width: 768px)"
          type="image/webp"
        />
        {/* Mobile devices */}
        <source
          srcSet="/images/hero-600.webp"
          media="(max-width: 767px)"
          type="image/webp"
        />
        {/* Fallback for older browsers */}
        <img
          src="/images/hero-1200.webp"
          alt="Hero background - job opportunities"
          className="w-full h-full object-cover object-center"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </picture>

      {/* Dark Overlay Layer - Semi-transparent for text readability */}
      <div
        className="absolute inset-0 bg-black/50"
        aria-hidden="true"
        role="presentation"
      />

      {/* Content Layer - Centered with flex */}
      <div className="relative z-10 w-full py-24">
        <div className="custom-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* LEFT - Content */}
            <div>
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="inline-flex items-center justify-center w-3 h-3 bg-sky-400 rounded-full" />
                <span className="text-sm font-medium text-white/90 rounded-full px-3 py-1 bg-white/10 backdrop-blur-sm">
                  #1 Job Platform for Tech Talent
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
                Find Work That
                <br />
                <span className="text-sky-300">Moves You Forward</span>
              </h1>

              <p className="mt-6 text-lg text-white/90 max-w-xl">
                Connect with top employers and discover opportunities that match
                your skills, experience, and career goals. Your next career move
                starts here.
              </p>

              <div className="mt-6 -mb-2">
                <JobSearch
                  onSearch={(title, location) => handleSearch(title, location)}
                />
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link to="/jobs">
                  <Button className="transform hover:-translate-y-0.5 transition cursor-pointer bg-sky-500 hover:bg-sky-600 text-white">
                    Browse Jobs
                    <ArrowRight className="opacity-90" />
                  </Button>
                </Link>

                <Button
                  className="cursor-pointer bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                  variant="outline"
                  onClick={() =>
                    handleShowCloseToast({
                      title: "Not Yet Available",
                      description:
                        "Coming soon! This feature is under development.",
                    })
                  }
                >
                  <Briefcase />
                  Post a Job
                </Button>
              </div>

              <div className="mt-8 flex items-center gap-2 text-xs font-semibold text-white/80">
                <div className="flex items-center gap-1">
                  <CircleCheck className="w-4 h-4 text-green-400" />
                  <div>1200+ jobs available</div>
                </div>

                <span className="text-white/50">•</span>
                <span>3,500 companies hiring</span>
              </div>
            </div>

            {/* RIGHT - Empty space for visual balance (can add illustration here) */}
            <div className="hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
