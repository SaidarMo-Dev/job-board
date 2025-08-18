import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
  ExperienceLevelType,
  JobType,
  type ExperienceLevelTypekey,
  type JobQuickFilters,
  type JobTypeKey,
} from "../jobTypes";
import { useCallback, useMemo, useState } from "react";
import { getTotalFilterCount } from "@/utils/getTotalFilterCount";
import { useQuery } from "@tanstack/react-query";
import { fetchPopularCategories } from "@/features/admin/categories/categoryApi";
import { fetchPopularCompanies } from "@/features/admin/companies/companyApi";
import type { ElementType } from "@/types/ElementType";
import FilterSection from "./FilterSection";
import ActiveFilter from "./ActiveFilter";

interface QuickFiltersProps {
  filters: JobQuickFilters;
  onFiltersChange: (filters: JobQuickFilters) => void;
  onClearFilters: () => void;
}
export default function QuickFilters({
  filters,
  onFiltersChange,
  onClearFilters,
}: QuickFiltersProps) {
  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchPopularCategories(),
  }).data;

  const categoriesArray = useMemo(() => {
    return (
      categories?.map((cat) => ({
        key: cat.name,
        value: cat.name,
      })) ?? []
    );
  }, [categories]);

  const companies = useQuery({
    queryKey: ["popularCompanies"],
    queryFn: () => fetchPopularCompanies(),
  }).data;

  const companiesArray = useMemo(() => {
    return companies?.map((c) => ({ key: c, value: c })) ?? [];
  }, [companies]);

  const JobTypesArray = Object.entries(JobType).map(([key, value]) => ({
    key: key as JobTypeKey,
    value,
  }));

  const ExperienceLevelArray = Object.entries(ExperienceLevelType).map(
    ([key, value]) => ({
      key: key as ExperienceLevelTypekey,
      value,
    })
  );
  const [expandedSections, setExpandedSections] = useState<
    Record<keyof JobQuickFilters, boolean>
  >({
    jobTypes: false,
    experienceLevels: false,
    popularCompanies: false,
    popularCategories: false,
  });

  const toggleSection = useCallback((key: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const toggleFilter = useCallback(
    <K extends keyof JobQuickFilters>(
      key: K,
      value: ElementType<JobQuickFilters[K]>
    ) => {
      const section = filters[key] as JobQuickFilters[K];
      const arr = section as ElementType<JobQuickFilters[K]>[];
      const newSectionFilter = arr.includes(value)
        ? filters[key].filter((item) => item !== value)
        : [...filters[key], value];
      onFiltersChange({ ...filters, [key]: newSectionFilter });
    },
    [filters, onFiltersChange]
  );

  const totalFilters = useMemo(() => {
    return getTotalFilterCount(filters);
  }, [filters]);

  return (
    <div
      className="bg-white shadow-sm border rounded-lg border-gray-200 p-6 max-h-full"
      aria-label="Job Filters"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-600" aria-hidden="true" />
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          {totalFilters > 0 && (
            <Badge
              variant="secondary"
              className="ml-2"
              aria-label={`${totalFilters} active filters`}
            >
              {totalFilters}
            </Badge>
          )}
        </div>
        {totalFilters > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-primary hover:text-primary-hover"
            aria-label="Clear all active filters"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Job Type Filter */}
      <FilterSection
        id="jobTypes"
        title="Job Types"
        items={JobTypesArray}
        expanded={expandedSections.jobTypes}
        toggleSection={toggleSection}
        toggleFilter={toggleFilter}
        selectedValues={filters.jobTypes}
      />

      {/* Experience Level Filter */}
      <FilterSection
        id="experienceLevels"
        title="Experience Level"
        items={ExperienceLevelArray}
        expanded={expandedSections.experienceLevels}
        toggleSection={toggleSection}
        toggleFilter={toggleFilter}
        selectedValues={filters.experienceLevels}
      />

      {/* Popular Categories */}
      <FilterSection
        id="popularCategories"
        title="Popular Categories"
        items={categoriesArray}
        expanded={expandedSections.popularCategories}
        toggleSection={toggleSection}
        toggleFilter={toggleFilter}
        selectedValues={filters.popularCategories}
      />
      {/* Popular Companies */}
      <FilterSection
        id="popularCompanies"
        title="Popular Companies"
        items={companiesArray}
        expanded={expandedSections.popularCompanies}
        toggleSection={toggleSection}
        toggleFilter={toggleFilter}
        selectedValues={filters.popularCompanies}
      />
      {/* Active Filters */}
      {totalFilters > 0 && (
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            Active Filters
          </h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([section, values]) =>
              values.map((value) => (
                <ActiveFilter
                  key={value}
                  section={section as keyof JobQuickFilters}
                  value={value}
                  toggleFilter={toggleFilter}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
