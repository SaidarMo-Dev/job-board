import SaveButton from "@/components/SaveButton";
import SkillBadge from "@/components/SkillBadge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getDaysSincePosted } from "@/utils/getDaysSincePosted";
import { Clock, DollarSign, MapPin, Users, X } from "lucide-react";
import type { JobResponse } from "../jobTypes";
import { useMemo, useState } from "react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectIsJobApplied } from "@/features/jobApplications/applicationSlice";
import AlreadyApplied from "./AlreadyApplied";

interface JobDetailsProp {
  onClose: (updated: boolean) => void;
  selectedJob: JobResponse;
}
export default function JobDetailsModal({
  selectedJob,
  onClose,
}: JobDetailsProp) {
  const [updated, setUpdated] = useState(false);
  const postedDays = useMemo(() => {
    const days = getDaysSincePosted(selectedJob?.datePosted);
    if (days > 0) {
      return `Posted ${days} day(s) ago`;
    }
    return "Today";
  }, [selectedJob.datePosted]);

  const isApplied = useAppSelector((state) =>
    selectIsJobApplied(state, selectedJob.jobId)
  );

  if (selectedJob) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
        <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-4">
                <img
                  src="/images/logov2.png"
                  alt={`${selectedJob.companyName} logo`}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <CardTitle className="text-xl">{selectedJob.title}</CardTitle>
                  <CardDescription className="text-lg">
                    {selectedJob.companyName}
                  </CardDescription>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onClose(updated);
                }}
                aria-label="Close Modal"
              >
                <X />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {selectedJob.location}
              </span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {selectedJob.jobType}
              </span>
              <span className="flex items-center text-green-600 font-medium">
                <DollarSign className="w-4 h-4 mr-1" />
                {selectedJob.minSalary / 1000}K - {selectedJob.maxSalary / 1000}
                K
              </span>
              <span className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {postedDays}
              </span>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Categories</h3>
              <div className="space-x-2">
                {selectedJob.categories.map((cat) => (
                  <Badge key={cat.id}>{cat.name}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Job Description</h3>
              <p className="text-gray-600 leading-relaxed">
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

            <div>
              <h3 className="font-semibold mb-2">Requirements</h3>

              <p className="ml-1 text-gray-500 text-sm ">
                No Requirement for this job
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              {isApplied ? (
                <AlreadyApplied />
              ) : (
                <Link
                  className="flex-1 bg-sky-600 hover:bg-sky-700 flex justify-center items-center rounded-md text-white font-medium text-sm"
                  to={`/jobs/${selectedJob.jobId}/apply`}
                >
                  Apply Now
                </Link>
              )}

              <SaveButton
                jobId={selectedJob.jobId}
                onToggle={(updated) => {
                  setUpdated(updated);
                }}
              />

              <Button variant="outline">Share</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  } else return null;
}
