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
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
          <div>
            <CardTitle className="text-xl">{jobData.title}</CardTitle>
            <CardDescription className="flex md:flex-row items-center gap-2 mt-2">
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
          <div>
            <Badge
              className="text-green-600 mt-2 md:mt-0 text-lg"
              variant="secondary"
            >
              ${jobData.minSalary / 1000}K- ${jobData.maxSalary / 1000}K
            </Badge>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
