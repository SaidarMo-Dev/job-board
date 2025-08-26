import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { RecentSavedJob } from "@/features/jobs/jobTypes";
import { Link } from "react-router";
import { ROUTES } from "@/constants/routes";
import RecentSavedJobItem from "./RecentSavedJobItem";

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
          savedJobs.map((job) => <RecentSavedJobItem key={job.id} job={job} />)
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
