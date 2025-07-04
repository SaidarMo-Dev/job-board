import {
  ArrowRight,
  Building2,
  ChevronFirst,
  ChevronRight,
  Clock,
  DollarSign,
  MapPin,
} from "lucide-react";

import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { useMemo, useState } from "react";

import type { JobResponse } from "../jobTypes";
import { getDaysSincePosted } from "@/utils/getDaysSincePosted";
import { JobDetailsModal } from "./JobDetailsModal";
import SkillBadge from "@/components/SkillBadge";

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
      <Card className="w-full max-w-4xl mx-auto shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader className="">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              {/* Company Logo */}
              <div className="w-16 h-16 bg-gradient-to-br from-blue-200 to-blue-300 rounded-xl flex items-center justify-center flex-shrink-0">
                <img
                  src="/public/images/logov2.png"
                  alt={`${jobInfo.companyName} logo`}
                  className="w-12 h-12 rounded-lg object-cover"
                />
              </div>

              {/* Job Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {jobInfo.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700 font-medium">
                    {jobInfo.companyName}
                  </span>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{jobInfo.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>Contract</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />${jobInfo.minSalary} - $
                    {jobInfo.maxSalary}
                  </div>
                </div>
              </div>
            </div>

            {/* Right side actions */}
            <div className="flex flex-col items-end gap-3">
              <span className="text-sm text-gray-500">
                {" "}
                {getDaysSincePosted(jobInfo.datePosted)} day ago
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 text-sm"
                  onClick={() => setSelectedJob(jobInfo)}
                >
                  Show Details
                </Button>
                <Button
                  size="sm"
                  className="bg-sky-600 hover:bg-sky-700 h-9 px-6 text-sm"
                >
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="-mt-2">
          <p className="text-gray-700 mb-4 leading-relaxed">
            {jobInfo.description}
          </p>

          {/* {skills} */}
          <div className="flex items-center gap-2">
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
