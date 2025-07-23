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
import { Clock, DollarSign, MapPin, Users } from "lucide-react";
import type { JobResponse } from "../jobTypes";
import { useState } from "react";
import { Link } from "react-router";

interface JobDetailsProp {
  onClose: (updated: boolean) => void;
  selectedJob: JobResponse;
}
export default function JobDetailsModal({
  selectedJob,
  onClose,
}: JobDetailsProp) {
  const [updated, setUpdated] = useState(false);
  if (selectedJob) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
        <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-4">
                <img
                  src="/public/images/logov2.png"
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
              >
                x
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
              <span className="flex items-center">
                <DollarSign className="w-4 h-4 mr-1" />
                {selectedJob.maxSalary} - {selectedJob.minSalary}
              </span>
              <span className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                Posted {getDaysSincePosted(selectedJob.datePosted)} days ago
              </span>
            </div>

            <Separator />

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
              <Link
                className="flex-1 bg-sky-600 hover:bg-sky-700 flex justify-center items-center rounded-md text-white font-medium text-sm"
                to={`/jobs/${selectedJob.jobId}/apply`}
              >
                Apply Now
              </Link>

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
