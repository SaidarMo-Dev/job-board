import { Badge } from "@/components/ui/badge";
import type { JobQuickFilters } from "../jobTypes";
import { X } from "lucide-react";
import type { ElementType } from "@/types/ElementType";

interface ActiveFilterProps {
  section: keyof JobQuickFilters;
  value: string;
  toggleFilter: <K extends keyof JobQuickFilters>(
    key: K,
    value: ElementType<JobQuickFilters[K]>
  ) => void;
}
export default function ActiveFilter({
  section,
  value,
  toggleFilter,
}: ActiveFilterProps) {
  return (
    <Badge
      key={`${section}-${value}`}
      variant="secondary"
      className="flex items-center gap-1 px-2 py-1 rounded-full bg-blue-100 
              text-blue-800 dark:bg-blue-800 dark:text-blue-100 text-sm 
              cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-700 transition"
    >
      {value}
      <button
        type="button"
        onClick={() => toggleFilter(section as keyof JobQuickFilters, value)}
        aria-label={`Remove filter ${value}`}
        className="ml-1 flex items-center justify-center w-4 h-4 rounded-full bg-blue-300
                hover:bg-blue-400 dark:bg-blue-700 dark:hover:bg-blue-600 text-white text-xs transition"
      >
        <X className="w-3 h-3" />
      </button>
    </Badge>
  );
}
