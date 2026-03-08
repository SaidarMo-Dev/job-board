import { ArrowRight } from "lucide-react";

import type { JobResponse } from "@/features/jobs/jobTypes";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { useState } from "react";
import JobDetailsModal from "@/features/jobs/components/JobDetailsModal";
import InlineJobCard from "@/shared/components/InlineJobCard";

export function FeaturedJobs({
  featuredJobs,
}: {
  featuredJobs: JobResponse[];
}) {
  const [selectedJob, setSelectedJob] = useState<JobResponse | null>(null);

  return (
    <section className="bg-white py-15">
      <div className="custom-container">
        {/* title */}
        <div>
          <h2 className="text-4xl font-bold">
            Latest <span className="text-primary">Job Openings</span>
          </h2>
          <div className="flex justify-between">
            <p className="mt-3 text-gray-600">
              Fresh opportunities added every hour.
            </p>
            <Link to="/jobs">
              <Button size="lg" variant="link" className="text-md">
                View All Jobs
                <ArrowRight className="w-6 h-6" />
              </Button>
            </Link>
          </div>
        </div>

        {/* jobs */}
        {featuredJobs.length === 0 ? (
          <div className="mt-10 text-center text-gray-500">
            No featured jobs available at the moment. Please check back later.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 mt-15">
            {featuredJobs.map((job) => {
              return <InlineJobCard job={job} key={job.jobId} />;
            })}
          </div>
        )}
      </div>
      {selectedJob && (
        <JobDetailsModal
          selectedJob={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </section>
  );
}
