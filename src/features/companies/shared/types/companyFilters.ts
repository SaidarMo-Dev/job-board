import type { CompanySize } from "./companyEnums";

export interface CompanyFilters {
  location?: string;
  companySize?: CompanySize[];
}
