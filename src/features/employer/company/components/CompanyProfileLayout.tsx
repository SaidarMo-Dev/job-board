import type { BaseCompanyComponentsProps } from "../types/baseCompanyComponentsType";
import { AboutCompany } from "./AboutCompany";
import { CompanyContact } from "./CompanyContact";
import { CompanyGeneralInformation } from "./CompanyGeneralInformation";
import CompanyLinks from "./CompanyLinks";

export function CompanyProfileLayout({
  isEditing,
  setIsEditing,
}: BaseCompanyComponentsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="space-y-5 lg:col-span-7">
        <CompanyGeneralInformation
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
        <AboutCompany isEditing={isEditing} setIsEditing={setIsEditing} />
      </div>
      <div className="space-y-5 lg:col-span-5">
        <CompanyContact isEditing={isEditing} setIsEditing={setIsEditing} />
        <CompanyLinks isEditing={isEditing} setIsEditing={setIsEditing} />
      </div>
    </div>
  );
}
