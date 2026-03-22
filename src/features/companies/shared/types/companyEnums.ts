export type CompanySize = "Small" | "Medium" | "Large";

export type CompanySortBy = "Name" | "CreatedAt" | "CompanySize";

export type SortDirection = "Ascending" | "Descending";

export const COMPANY_SIZE_OPTIONS: { value: CompanySize; label: string }[] = [
  { value: "Small", label: "Small (1-50)" },
  { value: "Medium", label: "Medium (51-500)" },
  { value: "Large", label: "Large (500+)" },
];

export const COMPANY_SORT_BY_OPTIONS: {
  value: CompanySortBy;
  label: string;
}[] = [
  { value: "Name", label: "Name" },
  { value: "CreatedAt", label: "Date Added" },
  { value: "CompanySize", label: "Company Size" },
];

export const SORT_DIRECTION_OPTIONS: {
  value: SortDirection;
  label: string;
}[] = [
  { value: "Ascending", label: "Ascending" },
  { value: "Descending", label: "Descending" },
];
