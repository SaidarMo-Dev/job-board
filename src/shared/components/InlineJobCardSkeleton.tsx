import { Skeleton } from "@/components/ui/skeleton";

export default function InlineJobCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl p-4 flex flex-col md:flex-row gap-4">
      {/* Company Logo */}
      <div className="h-12 w-12 rounded-lg flex-shrink-0 overflow-hidden">
        <Skeleton className="h-12 w-12 rounded-lg" />
      </div>

      {/* Job Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-2 w-full">
            {/* Job Title */}
            <Skeleton className="h-5 w-48" />

            {/* Company + Location */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Skeleton className="h-6 w-28 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-row justify-end items-center gap-2 min-w-fit">
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-28 rounded-md" />
        <Skeleton className="h-9 w-24 rounded-md" />
      </div>
    </div>
  );
}
