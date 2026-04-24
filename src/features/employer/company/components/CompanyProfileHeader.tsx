import {
  
  Pen,
  CheckCircle,
  MapPin,
  Users,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BaseCompanyComponentsProps } from "../types/baseCompanyComponentsType";
import type { CompanyFull } from "../schemas/companySchema";
import CompanyLogo from "./CompanyLogo";
import CompanyBanner from "./CompanyBanner";

interface CompanyProfileHeaderProps extends BaseCompanyComponentsProps {
  company: CompanyFull;
}

export function CompanyProfileHeader({
  isEditing,
  setIsEditing,
  company,
}: CompanyProfileHeaderProps) {
  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
      {/* Banner */}

      <CompanyBanner
        companyId={company.companyId}
        bannerUrl={company.bannerUrl}
      />
      {/* Content */}
      <div className="px-6 pb-6 pt-0 relative">
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end -mt-12 mb-4">
          {/* Logo */}

          <CompanyLogo
            companyId={company.companyId}
            logoUrl={company.logoUrl}
          />

          {/* Header Info */}
          <div className="flex-1 pt-12 sm:pt-0 w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h1 className="text-2xl font-bold text-foreground">
                  {company?.companyName}
                </h1>
                {company?.isFeatured && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                {company?.isFeatured && (
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-medium">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-muted-foreground text-sm">
                {company?.shortDescription}
              </p>
            </div>
            <Button
              className="flex-shrink-0 w-full sm:w-auto"
              type="button"
              onClick={() => setIsEditing?.(true)}
            >
              <Pen className="w-4 h-4" />
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Button>
          </div>
        </div>

        {/* Info Badges */}
        <div className="flex flex-wrap gap-3 mt-6">
          {/* Industries */}
          <div className="flex flex-wrap gap-2">
            {company?.industries && company.industries.length > 0 ? (
              company.industries.map((industry, index) => (
                <div
                  key={industry.id}
                  className="flex items-center gap-1.5 bg-secondary px-3 py-1.5 rounded-lg text-sm text-foreground border border-border/50"
                >
                  {index === 0 && (
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                  )}
                  <span className="font-medium">{industry.name}</span>
                </div>
              ))
            ) : (
              <div className="flex items-center gap-1.5 bg-secondary px-3 py-1.5 rounded-lg text-sm text-foreground border border-border/50">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">Not specified</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5 bg-secondary px-3 py-1.5 rounded-lg text-sm text-foreground border border-border/50">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">
              {company?.companySize} Employees
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-secondary px-3 py-1.5 rounded-lg text-sm text-foreground border border-border/50">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium text-sm  text-foreground">
              {!company?.country && !company?.address
                ? "Not provided"
                : company?.country + " " + company?.address}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
