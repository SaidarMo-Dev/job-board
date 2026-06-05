import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { JobResponse } from "@/features/jobs/jobTypes";
import { getDaysSincePosted } from "@/utils/getDaysSincePosted";
import { formatSalary } from "@/utils/stringUtils";
import { Link } from "react-router";
import SaveButton from "./SaveButton";

interface InlineJobCardProps {
  job: JobResponse;
  onShowDetails?: (job: JobResponse) => void;
}
export default function InlineJobCard({
  job,
  onShowDetails,
}: InlineJobCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col md:flex-row gap-4 transition-all duration-200 hover:border-blue-200 dark:hover:border-blue-900 hover:-translate-y-0.5 hover:shadow-lg">
      {/* Company Logo */}
      <div className="h-12 w-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex-shrink-0 flex items-center justify-center border border-slate-200 dark:border-slate-700 overflow-hidden">
        <img
          src={job.company.logoUrl || "/images/logov2.png"}
          alt={`${job.companyName} logo`}
          className="w-12 h-12 rounded-lg object-cover"
        />
      </div>

      {/* Job Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white leading-tight">
              {job.title}
            </h3>
            <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-medium text-slate-700 dark:text-slate-200">
                {job.company.name}
              </span>
              <span className="text-slate-300">•</span>
              <span>{job.location}</span>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-100">
            {formatSalary(job.minSalary, job.maxSalary)}
          </Badge>
          <Badge className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100">
            {job.jobType}
          </Badge>
          <span className="text-[10px] text-slate-400 font-medium">
            Posted {getDaysSincePosted(job.datePosted)} days ago
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-row justify-end items-center gap-2 min-w-fit">
        <SaveButton variant="icon" jobId={job.jobId} />
        <Button
          variant="outline"
          className="text-xs font-bold whitespace-nowrap"
          onClick={() => {
            if (onShowDetails) onShowDetails(job);
          }}
        >
          View Details
        </Button>

        <Link
          to={`/jobs/${job.jobId}/apply`}
          className="bg-primary hover:bg-primary-hover rounded-md text-white font-medium text-sm px-4 py-2"
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
}
