import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { JobResponse } from "@/features/jobs/jobTypes";
import { JobRecommendationCard } from "./JobRecommendationCard";
import clsx from "clsx";
import { Link } from "react-router";
import { ROUTES } from "@/constants/routes";
import { useState } from "react";
import JobDetailsModal from "@/features/jobs/components/JobDetailsModal";

export function JobRecommendations({
  jobs,
  className = "",
}: {
  jobs: JobResponse[];
  className?: string;
}) {
  const [selectedJob, setSelectedJob] = useState<JobResponse | null>();

  return (
    <>
      <Card className={clsx("bg-gray-50", className)}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle>Recommended For You</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to={ROUTES.PUBLIC.JOBS}>View All</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <JobRecommendationCard
                key={job.jobId}
                job={job}
                onShowDetails={setSelectedJob}
              />
            ))
          ) : (
            <span className="ml-2 text-gray-600">No jobs found for you</span>
          )}
        </CardContent>
      </Card>
      {selectedJob && (
        <JobDetailsModal
          selectedJob={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </>
  );
}
