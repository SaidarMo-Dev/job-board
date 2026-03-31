import { Badge } from "@/components/ui/badge";
import type { Company } from "@/features/companies/shared/types/company";

interface CompanyAboutProps {
  company?: Company;
}

export function CompanyAbout({ company }: CompanyAboutProps) {
  if (!company) return null;
  return (
    <section className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
      <h2 className="text-xl font-bold mb-4">About</h2>
      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
        {company.description}
      </p>
      <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed">
        {company.shortDescription}
      </p>

      {company.industries && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-3">Industries</h3>
          <div className="space-x-2">
            {company.industries.map((industry) => (
              <Badge
                className={`px-3 py-[4px] text-sm font-medium text-primary bg-primary-50/50 border-primary-100`}
              >
                {industry}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
