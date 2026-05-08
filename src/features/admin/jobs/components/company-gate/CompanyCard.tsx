import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { CompanyFull } from "@/features/employer/company/schemas/companySchema";
import { Building2, Edit2, Globe, Tag } from "lucide-react";

export default function CompanyCard({
  company,
  onEdit,
}: {
  company: CompanyFull;
  onEdit?: () => void;
}) {
  return (
    <Card className="p-8">
      <div className="flex gap-8">
        {/* Company Logo */}
        <div className="flex-shrink-0">
          <div className="h-24 w-24 rounded-xl bg-muted flex items-center justify-center">
            {company.logoUrl ? (
              <img
                src={company.logoUrl}
                alt={company.companyName}
                className="h-full w-full object-cover rounded-xl"
              />
            ) : (
              <Building2 className="h-12 w-12 text-muted-foreground" />
            )}
          </div>
        </div>

        {/* Company Details */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4">{company.companyName}</h3>

          <div className="space-y-3 mb-6">
            {/* Slug */}
            <div className="flex items-center gap-3">
              <Tag className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <div>
                <span className="text-sm text-muted-foreground">Slug</span>
                <div className="bg-muted text-foreground text-sm px-3 py-1 rounded-md inline-block">
                  {company.slug}
                </div>
              </div>
            </div>

            {/* Website */}
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <div>
                <span className="text-sm text-muted-foreground">Website</span>
                <a
                  href={company.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm block"
                >
                  {company.websiteUrl}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Button */}
        <div className="flex-shrink-0 flex items-start pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onEdit}
            className="gap-2"
          >
            <Edit2 className="h-4 w-4" />
            Edit Company
          </Button>
        </div>
      </div>
    </Card>
  );
}
