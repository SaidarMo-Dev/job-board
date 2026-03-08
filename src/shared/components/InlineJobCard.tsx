import { Button } from "@/components/ui/button";
import type { JobResponse } from "@/features/jobs/jobTypes";
import { getDaysSincePosted } from "@/utils/getDaysSincePosted";
import { formatSalary } from "@/utils/stringUtils";
import { Bookmark, BriefcaseBusiness, Clock, MapPin } from "lucide-react";
import { Link } from "react-router";

export default function InlineJobCard({ job }: { job: JobResponse }) {
  return (
    <div
      key={job.jobId}
      className="flex flex-col md:flex-row items-start md:items-center justify-between  gap-6 p-6 bg-white border
        border-gray-100 rounded-xl hover:shadow-md transition-shadow group"
    >
      {/* Company logo */}
      {/* Todo: handle company logo */}
      <div
        className="w-14 h-14 bg-gray-200 rounded-lg flex items-center
        justify-center text-gray-700 font-semibold text-lg flex-shrink-0"
      >
        <img
          className="rounded-lg"
          src={"/images/avatar-placeholder.svg"}
          alt="Company logo"
        />
      </div>
      {/* Job info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{job.title}</h3>
        <div className="flex flex-wrap items-center gap-4  text-sm text-gray-600 ">
          <div className="flex items-center gap-1">
            <BriefcaseBusiness className="w-4 h-4" />
            <span>{job.companyName}</span>
          </div>
          <span aria-hidden="true">•</span>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" aria-hidden="true" />
            <span>{job.location}</span>
          </div>
          <span aria-hidden="true">•</span>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" aria-hidden="true" />
            <span>{getDaysSincePosted(job.datePosted)} days ago</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6 flex-shrink-0">
        {/* Salary */}
        <div className="text-right">
          <p className="text-sm font-medium text-green-700 bg-green-50 border border-green-100 rounded-xl py-1 px-2">
            {formatSalary(job.minSalary, job.maxSalary)}
          </p>
        </div>

        {/* Job Type Badge */}
        <span
          className={`px-3 py-1 bg-sky-50 text-sky-700 text-sm font-medium rounded-full border border-sky-100`}
          aria-label={`Job type: ${job.jobType}`}
        >
          {job.jobType}
        </span>
      </div>
      <div className="flex justify-center items-center w-full gap-3 md:w-auto">
        {/* Apply Button */}
        <Link
          to={`/jobs/${job.jobId}/apply`}
          className="flex-1 text-center inline-block bg-black text-white px-4 py-2 rounded-lg font-semibold
            hover:bg-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label={`Apply for ${job.title} position`}
        >
          Apply Now
        </Link>

        {/* Bookmark Button */}
        <Button
          variant="outline"
          className="p-2  text-gray-400 hover:!text-primary-hover"
          aria-label={`Save ${job.title} job listing`}
        >
          <Bookmark className="w-5 h-5 transition-colors" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
