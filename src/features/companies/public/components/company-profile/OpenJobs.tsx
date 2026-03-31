"use client";

import { Button } from "@/components/ui/button";
import JobDetailsModal from "@/features/jobs/components/JobDetailsModal";
import type { JobResponse } from "@/features/jobs/jobTypes";
import InlineJobCard from "@/shared/components/InlineJobCard";
import { Briefcase } from "lucide-react";
import { useState } from "react";

interface OpenJobsProps {
  jobs?: JobResponse[];
  onViewAllJobs?: () => void;
}

export function OpenJobs({ jobs, onViewAllJobs }: OpenJobsProps) {
  const [selectedJob, setSelectedJob] = useState<JobResponse | null>(null);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xl font-bold">Open Jobs</h2>
        <Button
          variant={"link"}
          disabled={!jobs || jobs.length === 0}
          onClick={onViewAllJobs}
          className="cursor-pointer"
        >
          View all
        </Button>
      </div>

      {!jobs || jobs.length === 0 ? (
        <div className="flex flex-col gap-2 items-center justify-center font-medium text-gray-600/80">
          <Briefcase className="w-8 h-8 text-primary" />
          No open jobs at the moment for this company, come back later.
        </div>
      ) : (
        <div>
          {jobs.map((job) => (
            <InlineJobCard
              key={job.jobId}
              job={job}
              onShowDetails={setSelectedJob}
            />
          ))}
        </div>
      )}

      {selectedJob && (
        <JobDetailsModal
          selectedJob={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </section>
  );
}
