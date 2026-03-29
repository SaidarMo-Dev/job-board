import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { COMPANY_SIZE_OPTIONS } from "../../shared/types/companyEnums";
import type { CompanyFilters } from "../../shared/types/companyFilters";
import { useCallback } from "react";
import { MultiSelectCheckboxGroup } from "@/shared/components/MultiSelectCheckboxGroup";
import { useQuery } from "@tanstack/react-query";
import { fetchIndustries } from "@/features/industry/industryApi";
interface FiltersSidebarProps {
  companyFilters?: CompanyFilters;
  onFiltersChange?: (filters: CompanyFilters) => void;
}

export function FiltersSidebar({
  companyFilters,
  onFiltersChange,
}: FiltersSidebarProps) {
  const handleLocationChange = useCallback(
    (value: string) => {
      onFiltersChange?.({
        ...companyFilters,
        location: value,
      });
    },
    [companyFilters, onFiltersChange],
  );

  const clearAll = () => {
    onFiltersChange?.({
      location: "",
      companySize: undefined,
    });
  };

  const { data: industries, error: fetchIndustryError } = useQuery({
    queryKey: ["industries"],
    queryFn: () => fetchIndustries(),
  });

  return (
    <aside className="w-full lg:w-72 shrink-0">
      <div className="sticky top-6 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Filters</h2>
          <button
            disabled={!companyFilters?.location && !companyFilters?.companySize}
            onClick={clearAll}
            className="text-primary text-sm font-semibold hover:underline"
          >
            Clear all
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="block text-sm font-semibold mb-2">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder="Search by city, country, or remote..."
                value={companyFilters?.location}
                onChange={(e) => handleLocationChange(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label className="block text-sm font-semibold mb-2">
              Industries
            </Label>
            <MultiSelectCheckboxGroup
              options={
                industries?.map((industry) => ({
                  label: industry.name,
                  value: industry.slug,
                })) || []
              }
              value={companyFilters?.industries ?? []}
              onChange={(selected) =>
                onFiltersChange?.({
                  ...companyFilters,
                  industries: selected.length ? selected : undefined,
                })
              }
            />

            {fetchIndustryError && (
              <p className="text-sm text-destructive mt-2">
                Failed to load industries. Please try again later.
              </p>
            )}
          </div>

          <div>
            <Label className="block text-sm font-semibold mb-2">
              Company Size
            </Label>
            <div className="space-y-2">
              <MultiSelectCheckboxGroup
                options={COMPANY_SIZE_OPTIONS}
                value={companyFilters?.companySize ?? []}
                onChange={(selected) =>
                  onFiltersChange?.({
                    ...companyFilters,
                    companySize: selected.length ? selected : undefined,
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
