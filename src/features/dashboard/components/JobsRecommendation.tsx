import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { JobResponse } from "@/features/jobs/jobTypes";
import { JobRecommendationCard } from "./JobRecommendationCard";

export function JobRecommendations({
  jobs,
  className = "",
}: {
  jobs: JobResponse[];
  className?: string;
}) {
  return (
    <Card className={`bg-gray-50 ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle>Recommended For You</CardTitle>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {jobs.length > 0 ? (
          jobs.map((job, index) => (
            <JobRecommendationCard key={index} job={job} />
          ))
        ) : (
          <span className="ml-2 text-gray-600">No jobs founds fo you</span>
        )}
      </CardContent>
    </Card>
  );
}
