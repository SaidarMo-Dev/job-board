import { Button } from "@/components/ui/button";
import type { Company } from "../../shared/types/company";

export function FeaturedCard({ company }: { company: Company }) {
  return (
    <div className="bg-card p-8 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
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
        <span className="text-primary font-bold">
          {company.totalJobs} Open Jobs
        </span>
        <Button
          variant="secondary"
          className="bg-primary/10 hover:bg-primary/20 text-primary font-bold"
        >
          View Profile
        </Button>
      </div>
    </div>
  );
}
