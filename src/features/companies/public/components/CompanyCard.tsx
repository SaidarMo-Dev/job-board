import { Building2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Company } from "../../shared/types/company";

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className="bg-card p-6 rounded-xl border border-border shadow-sm hover:border-primary/50 transition-colors">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <img
            src={company.logoUrl || "images/default-company.webp"}
            alt={`${company.companyName} logo`}
            width={64}
            height={64}
            className={`w-16 h-16 rounded-lg bg-muted object-cover ${!company.logoUrl ? "object-fill" : ""}`}
          />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold text-foreground">
                  {company.companyName}
                </h3>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mb-3">
                {company.industry && (
                  <span className="flex items-center gap-1">
                    <Building2 className="w-4 h-4" />
                    {company.industry}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {company.location}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-2xl font-black text-primary">
                {company.totalJobs}
              </span>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-tighter">
                Open Positions
              </span>
            </div>
          </div>
          <p className="text-muted-foreground text-sm mb-6 leading-relaxed max-w-2xl">
            {company.description}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button className="font-bold transition-transform active:scale-95">
              View Open Jobs
            </Button>
            <Button variant="secondary" className="font-bold">
              Company Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
