import type { Company } from "../../shared/types/company";
import { LinkButton } from "@/shared/components/LinkButton";
import { ROUTES } from "@/constants/routes";
import NoOpenings from "../../shared/components/NoOpenings";

export function FeaturedCard({ company }: { company: Company }) {
  return (
    <div className="bg-card p-8 rounded-xl border border-border shadow-sm hover:shadow-md transition relative overflow-hidden hover:-translate-y-1">
      <div className="flex items-start gap-4 mb-4">
        <img
          src={company.logoUrl || "images/default-company.webp"}
          alt={`${company.companyName} Logo`}
          width={64}
          height={64}
          className="w-16 h-16 rounded-lg bg-muted object-cover"
        />
        <div>
          <h3 className="font-bold text-xl text-foreground">
            {company.companyName}
          </h3>
        </div>
      </div>
      <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
        {company.description}
      </p>
      <div className="flex items-center justify-between mt-auto">
        <div className="flex gap-4 items-center">
          <div className="flex flex-col">
            <span className="text-lg font-semibold">{company.totalJobs}</span>
            <span className="text-xs text-muted-foreground">Total Jobs</span>
          </div>

          {company.totalOpenJobs > 0 ? (
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-primary">
                {company.totalOpenJobs}
              </span>
              <span className="text-xs text-muted-foreground">Open Jobs</span>
            </div>
          ) : (
            <NoOpenings />
          )}
        </div>
        <LinkButton
          to={ROUTES.PUBLIC.COMPANIES.PROFILE(company.slug)}
          variant="link"
        >
          View Profile
        </LinkButton>
      </div>
    </div>
  );
}
