import type { Company } from "@/features/companies/shared/types/company";
import LinkedinIcon from "@/shared/components/LinkedinIcon";
import TwitterIcon from "@/shared/components/TwitterIcon";
import { Globe } from "lucide-react";
import type React from "react";

interface CompanyDetailsProps {
  company?: Company;
}

export function CompanyDetails({ company }: CompanyDetailsProps) {
  if (!company) return null;

  return (
    <section className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
      <h2 className="text-lg font-bold mb-6">Company Details</h2>
      <div className="space-y-4">
        <DetailItem
          label="Industry"
          value={company.industry || "Not specified"}
        />
        <DetailItem
          label="Company size"
          value={company.companySize || "Not specified"}
        />
        <DetailItem
          label="Founded"
          value={company.foundedYear?.toString() || "Not specified"}
        />
        <DetailItem
          label="Headquarters"
          value={
            company.country || company.city
              ? `${company.city}, ${company.country}`
              : "Not specified"
          }
        />

        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Website
          </p>
          <a
            href={company.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium mt-1 text-sky-700 dark:text-sky-300 hover:underline"
          >
            {company.websiteUrl}
          </a>
        </div>

        <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Social
          </p>
          <div className="flex gap-3">
            {company.websiteUrl && (
              <SocialLink
                href={company.websiteUrl}
                icon={<Globe />}
                label="Website"
              />
            )}
            {company.linkedInUrl && (
              <SocialLink
                href={company.linkedInUrl}
                icon={<LinkedinIcon />}
                label="LinkedIn"
              />
            )}
            {company.twitterUrl && (
              <SocialLink
                href={company.twitterUrl}
                icon={<TwitterIcon />}
                label="Twitter"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

interface DetailItemProps {
  label: string;
  value: string;
}

function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div>
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
        {label}
      </p>
      <p className="text-sm font-medium mt-1">{value}</p>
    </div>
  );
}

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

function SocialLink({ href, icon, label }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-sky-700 dark:hover:text-sky-300 transition-colors"
      aria-label={label}
    >
      <span className="material-symbols-outlined text-lg">{icon}</span>
    </a>
  );
}
