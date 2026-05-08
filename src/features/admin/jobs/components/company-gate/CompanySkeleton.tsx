import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CompanySkeleton() {
  return (
    <Card className="p-8">
      <div className="flex gap-8">
        {/* Logo Skeleton */}
        <Skeleton className="h-24 w-24 rounded-xl flex-shrink-0" />

        {/* Content Skeleton */}
        <div className="flex-1 space-y-4">
          {/* Title */}
          <Skeleton className="h-8 w-48" />

          {/* Slug Row */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-5 w-5 rounded flex-shrink-0" />
            <div className="flex-1 space-y-1">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-6 w-32 rounded" />
            </div>
          </div>

          {/* Website Row */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-5 w-5 rounded flex-shrink-0" />
            <div className="flex-1 space-y-1">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-5 w-48" />
            </div>
          </div>
        </div>

        {/* Button Skeleton */}
        <Skeleton className="h-10 w-32 rounded flex-shrink-0" />
      </div>
    </Card>
  );
}
