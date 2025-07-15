import {
  Building2,
  ChevronRight,
  Clock,
  DollarSign,
  MapPin,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";

import type { JobResponse } from "../jobTypes";
import { getDaysSincePosted } from "@/utils/getDaysSincePosted";
import JobDetailsModal from "./JobDetailsModal";
import SkillBadge from "@/components/SkillBadge";
import { Link } from "react-router";

interface JobCardFullProps {
  jobInfo: JobResponse;
  className?: string;
}
export default function JobCardFull({
  jobInfo,
  className = "",
}: JobCardFullProps) {
  const [selectedJob, setSelectedJob] = useState<JobResponse | null>();

  const description = useMemo(() => {
    const words = jobInfo.description.split(" ");
    return words.length >= 10
      ? words.slice(0, 9).join(" ") + "..."
      : jobInfo.description;
  }, [jobInfo.description]);

  return (
    <>
      <Card
        key={jobInfo.title}
        className={`${
          selectedJob ? "border-2 border-sky-200 bg-blue-50/50" : ""
        } hover:shadow-md transition-shadow cursor-pointer hover:bg-neutral-50 duration-300 ${className}`}
      >
        <CardContent>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="items-start space-x-4 flex-1 flex">
              <img
                src="/public/images/logov2.png"
                alt={`${jobInfo.companyName} logo`}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {jobInfo.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-2 flex items-center">
                  <Building2 className="w-4 h-4 mr-1" />
                  {jobInfo.companyName}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {jobInfo.location}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {jobInfo.jobType}
                  </span>
                  <span className="text-sm text-gray-700 font-semibold ">
                    {getDaysSincePosted(jobInfo.datePosted)} day ago
                  </span>
                </div>
                <p className="text-gray-600 mb-3 line-clamp-2">{description}</p>
                <div className="flex flex-wrap gap-2">
                  {jobInfo.skills ? (
                    jobInfo.skills.map((skill, index) => (
                      <SkillBadge skill={skill} index={index} />
                    ))
                  ) : (
                    <span>No skills</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col md:items-end">
              <div className="flex justify-end">
                <span className="flex items-center text-green-600 font-bold text-xl">
                  <DollarSign className="w-5 h-5 mr-1" />$
                  {jobInfo.maxSalary / 1000}K - ${jobInfo.minSalary / 1000}k
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Link to={`/jobs/${jobInfo.jobId}/apply`}>
                  <Button
                    size="sm"
                    className="bg-sky-600 hover:bg-sky-700 cursor-pointer mt-2 py-5 w-35 flex-1"
                  >
                    Apply Now
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-transparent shadow-none flex items-center cursor-pointer py-5 mt-3 w-35"
                  onClick={() => setSelectedJob(jobInfo)}
                >
                  Show Details
                  <ChevronRight />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Detail Modal */}
      {selectedJob && (
        <JobDetailsModal
          selectedJob={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </>
  );
}
