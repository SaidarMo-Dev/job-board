import { ArrowRight } from "lucide-react";

import type { JobResponse } from "@/features/jobs/jobTypes";
import { Link } from "react-router";
import { Button } from "../ui/button";
import ModernJobCard from "@/features/jobs/components/ModernJobCard";
import { useState } from "react";
import JobDetailsModal from "@/features/jobs/components/JobDetailsModal";

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
        <div className="text-center">
          <h2 className="text-4xl font-bold">Featured Jobs</h2>
          <p className="mt-3 text-xl text-gray-600">
            Discover hand-picked opportunities from top companies looking for
            talented professionals like you{" "}
          </p>
        </div>

        {/* jobs */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-15">
          {featuredJobs.map((job) => {
            return (
              <ModernJobCard
                job={job}
                key={job.jobId}
                onShowDetails={setSelectedJob}
              />
            );
          })}
        </div>
        <Link to="/jobs" className="flex justify-center mt-10">
          <Button
            size={"lg"}
            variant={"outline"}
            className="flex justify-center items-center gap-3"
          >
            View All Jobs
            <ArrowRight className="w-6 h-6" />
          </Button>
        </Link>
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
