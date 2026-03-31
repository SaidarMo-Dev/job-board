import { Navigate, useNavigate, useParams } from "react-router";
import { CompanyAbout } from "../components/company-profile/CompanyAbout";
import { CompanyDetails } from "../components/company-profile/CompanyDetails";
import { CompanyHeader } from "../components/company-profile/CompanyHeader";
import { useQuery } from "@tanstack/react-query";
import { fetchCompanyBySlug, fetchCompanyOpenJobs } from "../../CompaniesApi";
import Loader from "@/components/Loaders/Loader";
import { ROUTES } from "@/constants/routes";
import { OpenJobs } from "../components/company-profile/OpenJobs";

export function CompanyProfilePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const {
    data: company,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["companyProfile", slug],
    queryFn: () => fetchCompanyBySlug(slug || ""),
    enabled: !!slug, // only run if slug is available
  });

  const { data: companyOpenJobs } = useQuery({
    queryKey: ["CompanyOpenJobs", slug],
    queryFn: () => fetchCompanyOpenJobs(slug || "", 1, 3),
    enabled: !!slug, // only run if slug is available
  });

  // Guard clause: if slug is somehow undefined, redirect to companies list
  if (!slug) {
    return <Navigate to={ROUTES.PUBLIC.COMPANIES.ROOT} replace />;
  }

  //. Early return for Loading State
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader variant="spinner" size="sm" />
      </div>
    );
  }

  // Handle Error or Missing Data
  if (error || !company?.data) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-semibold">Profile not found</h2>
        <p className="text-slate-500">
          The company you are looking for doesn't exist or has moved.
        </p>
      </div>
    );
  }

  const handleViewAll = () => navigate(ROUTES.PUBLIC.JOBS);
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <CompanyHeader company={company?.data} />

      {/* Two Column Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* About Section */}
          <CompanyAbout company={company?.data} />

          {/* Open Jobs Section */}
          <OpenJobs
            jobs={companyOpenJobs?.data}
            onViewAllJobs={handleViewAll}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Company Details */}
          <CompanyDetails company={company?.data} />
        </div>
      </div>
    </div>
  );
}
