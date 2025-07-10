import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { JobResponse } from "@/features/jobs/jobTypes";
import { Building, Clock, MapPin } from "lucide-react";

interface ApplicationHeaderProps {
  jobData: JobResponse;
}
export default function ApplicationHeader({ jobData }: ApplicationHeaderProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">{jobData.title}</CardTitle>
            <CardDescription className="flex items-center gap-4 mt-2">
              <span className="flex items-center gap-1">
                <Building className="h-4 w-4" />
                {jobData.companyName}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {jobData.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {jobData.jobType}
              </span>
            </CardDescription>
          </div>
          <Badge variant="secondary">${jobData.minSalary}- ${jobData.maxSalary}</Badge>
        </div>
      </CardHeader>
    </Card>
  );
}
