import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import type { RecentSavedJob } from "@/features/jobs/jobTypes";
import { getDaysSincePosted } from "@/utils/getDaysSincePosted";
import { Link } from "react-router";
import { ROUTES } from "@/constants/routes";

export function RecentSavedJobs({
  savedJobs,
  className,
}: {
  savedJobs: RecentSavedJob[];
  className?: string;
}) {
  return (
    <Card className={`bg-gray-50 ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Recently Saved Jobs</CardTitle>
          <Button variant="ghost" size="sm">
            <Link to={ROUTES.MEMBER.SAVED_JOBS}>View All</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {savedJobs.length > 0 ? (
          savedJobs.map((job, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Bookmark className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium text-sm">{job.title}</p>
                  <p className="text-xs text-muted-foreground">{job.company}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">
                  {getDaysSincePosted(job.savedAt)} days
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-between items-center">
            <span className="ml-2 text-gray-700">You don't save any job!</span>
            <Button asChild variant={"link"}>
              <Link to={ROUTES.PUBLIC.JOBS}>Discover Jobs</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
