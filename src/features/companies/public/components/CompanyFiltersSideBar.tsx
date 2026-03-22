"use client";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import {
  COMPANY_SIZE_OPTIONS,
  type CompanySize,
} from "../../shared/types/companyEnums";
import type { CompanyFilters } from "../../shared/types/companyFilters";
import { useCallback } from "react";
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

  const handleSizeChange = useCallback(
    (value: CompanySize, checked: boolean) => {
      const currentSizes = companyFilters?.companySize ?? [];

      const updatedSizes = checked
        ? [...currentSizes, value]
        : currentSizes.filter((size) => size !== value);

      onFiltersChange?.({
        ...companyFilters,
        companySize: updatedSizes.length ? updatedSizes : undefined,
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
              Company Size
            </Label>
            <div className="space-y-2">
              {COMPANY_SIZE_OPTIONS.map((size) => (
                <div key={size.value} className="flex items-center gap-2">
                  <Checkbox
                    name="companySize"
                    id={size.value}
                    checked={companyFilters?.companySize?.includes(size.value)}
                    onCheckedChange={(checked) =>
                      handleSizeChange(size.value, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={size.value}
                    className="text-sm text-muted-foreground cursor-pointer font-normal"
                  >
                    {size.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
