import { memo } from "react";
import type { JobQuickFilters } from "../jobTypes";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { ElementType } from "@/shared/types/ElementType";
const FilterSection = memo(function FilterSection<
  TKey extends string,
  TValue extends string
>({
  id,
  title,
  items,
  expanded,
  toggleSection,
  toggleFilter,
  selectedValues,
}: {
  id: keyof JobQuickFilters;
  title: string;
  items: { key: TKey; value: TValue }[];
  expanded: boolean;
  toggleSection: (section: keyof JobQuickFilters) => void;
  toggleFilter: <K extends keyof JobQuickFilters>(
    key: K,
    value: ElementType<JobQuickFilters[K]>
  ) => void;
  selectedValues: TKey[];
}) {
  return (
    <div className="pb-4">
      <button
        onClick={() => toggleSection(id)}
        className="flex items-center justify-between w-full text-left mb-3"
        aria-expanded={expanded}
        aria-controls={`filter-${id}`}
        id={`filter-${id}-header`}
      >
        <h3 className="font-medium text-gray-900">{title}</h3>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-gray-500" aria-hidden="true" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" aria-hidden="true" />
        )}
      </button>
      {expanded && (
        <div
          id={`filter-${id}`}
          role="region"
          aria-labelledby={`filter-${id}-header`}
          className="space-y-3"
        >
          {items.map((item) => (
            <div key={item.key} className="flex items-center space-x-2">
              <Checkbox
                id={`${id}-${item.key}`}
                checked={selectedValues.includes(item.key)}
                aria-checked={selectedValues.includes(item.key)}
                onCheckedChange={() => toggleFilter(id, item.key)}
              />
              <label
                htmlFor={`${id}-${item.key}`}
                className="text-sm text-gray-600"
              >
                {item.value}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default FilterSection;
