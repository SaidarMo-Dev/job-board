import SkillBadge from "@/shared/components/SkillBadge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleDollarSign, Clock, MapPin, PackageOpen, X } from "lucide-react";
import { type JobResponse } from "../jobTypes";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectIsJobApplied } from "@/features/jobApplications/applicationSlice";

import ApplyButton from "@/shared/components/ApplyButton";
import JobMetaItem from "./JobMetaItem";
import { formatSalary, splitCamelCase } from "@/utils/stringUtils";

interface JobDetailsProp {
  onClose: () => void;
  selectedJob: JobResponse;
}
export default function JobDetailsModal({
  selectedJob,
  onClose,
}: JobDetailsProp) {
  const isApplied = useAppSelector((state) =>
    selectIsJobApplied(state, selectedJob.jobId),
  );

  if (selectedJob) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
        <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
          <CardHeader className="border-b border-gray-200/70">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedJob.company.logoUrl || "/images/logov2.png"}
                  alt={`${selectedJob.companyName} logo`}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <CardTitle className="text-xl">{selectedJob.title}</CardTitle>
                  <CardDescription className="ml-0.5 text-sm">
                    {selectedJob.companyName}
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ApplyButton isApplied={isApplied} jobId={selectedJob.jobId} />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    onClose();
                  }}
                  aria-label="Close Modal"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 mt-4">
              <JobMetaItem
                label="Salary"
                value={formatSalary(
                  selectedJob.minSalary,
                  selectedJob.maxSalary,
                )}
                icon={<CircleDollarSign className="w-4 h-4 text-primary" />}
              />
              <JobMetaItem
                label="Location"
                value={selectedJob.location}
                icon={<MapPin className="w-3 h-3 text-primary" />}
              />
              <JobMetaItem
                label="Expereince"
                value={splitCamelCase(selectedJob.experienceLevel)}
                icon={<PackageOpen className="w-4 h-4 text-primary" />}
              />
              <JobMetaItem
                label="Type"
                value={selectedJob.jobType}
                icon={<Clock className="w-4 h-4 text-primary" />}
              />
            </div>

            <div>
              <h3 className="font-semibold mb-2">Job Overview</h3>
              <p className="font-medium text-gray-600 leading-relaxed ml-2">
                {selectedJob.description}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {selectedJob.skills.map((skill, index) => (
                  <SkillBadge key={index} skill={skill} index={index} />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  } else return null;
}
