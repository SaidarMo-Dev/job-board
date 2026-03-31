import type { Company } from "@/features/companies/shared/types/company";
import { LinkButton } from "@/shared/components/LinkButton";

interface CompanyHeaderProps {
  company?: Company;
  onFollowClick?: () => void;
  onVisitWebsite?: () => void;
}

export function CompanyHeader({ company }: CompanyHeaderProps) {
  if (!company) return null;

  console.log("company logo url", company.logoUrl);
  return (
    <div className="relative flex flex-col bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800">
      {/* Header Image */}
      <div
        className="w-full h-48 md:h-64 bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: `url('${company.logoUrl}')` }}
        role="img"
        aria-label="Company header image"
      />

      {/* Profile Section */}
      <div className="px-6 pb-6">
        <div className="flex flex-col md:flex-row md:items-end -mt-12 md:-mt-16 gap-6">
          {/* Logo */}
          <div className="relative">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl bg-white p-2 shadow-lg border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
              <div className="w-full h-full rounded-lg bg-sky-700/10 flex items-center justify-center">
                <img
                  src={company.logoUrl || "/images/default-company.webp"}
                  alt={`${company.companyName} logo`}
                  className={`w-full h-full object-cover rounded-lg ${!company.logoUrl ? "object-fill" : ""}`}
                />
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">
              {company.companyName}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              {company.country} - {company.city}
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {company.companySize}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-4 md:mt-0">
            <LinkButton to={company.websiteUrl} external variant="link">
              Visit website
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}
