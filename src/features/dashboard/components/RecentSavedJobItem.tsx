import type { RecentSavedJob } from "@/features/jobs/jobTypes";
import { getDaysSincePosted } from "@/utils/getDaysSincePosted";
import { BookmarkCheck } from "lucide-react";
import { useMemo } from "react";

interface RecentSavedJobItemProps {
  job: RecentSavedJob;
}
export default function RecentSavedJobItem({ job }: RecentSavedJobItemProps) {
  const createdDays = useMemo(
    () => getDaysSincePosted(job.savedAt),
    [job.savedAt]
  );

  return (
    <div className="flex items-center justify-between p-3 rounded-lg border bg-gray-50/90 hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-3">
        <BookmarkCheck className="h-4 w-4 text-primary" />
        <div>
          <p className="font-medium text-sm">{job.title}</p>
          <p className="text-xs text-muted-foreground">{job.company}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xs text-muted-foreground">
          {createdDays === 0 ? "Today" : createdDays + " days ago"}
        </p>
      </div>
    </div>
  );
}
