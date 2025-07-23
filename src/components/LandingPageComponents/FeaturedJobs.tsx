import { ArrowRight } from "lucide-react";

import type { JobResponse } from "@/features/jobs/jobTypes";
import { JobCardMini } from "@/features/jobs/components/JobCardMini";
import { Link } from "react-router";
import { Button } from "../ui/button";

export function FeaturedJobs({
  featuredJobs,
}: {
  featuredJobs: JobResponse[];
}) {
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
          {featuredJobs.map((job, index) => {
            return <JobCardMini job={job} key={index} />;
          })}
        </div>
        <Link to="/jobs" className="flex justify-center mt-10">
          <Button
            size={"lg"}
            variant={"outline"}
            className="flex justify-center items-center gap-3"
          >
            Viwe All Jobs
            <ArrowRight className="w-6 h-6" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
