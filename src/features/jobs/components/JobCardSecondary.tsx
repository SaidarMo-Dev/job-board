import {
  MapPin,
  Clock,
  DollarSign,
  ChevronRight,
  MapPinHouse,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { JobResponse } from "../jobTypes";
import { useState } from "react";
import { JobDetailsModal } from "./JobDetailsModal";
import { getDaysSincePosted } from "@/utils/getDaysSincePosted";
import SkillBadge from "@/components/SkillBadge";

interface JobCardSecondaryProps {
  jobInfo: JobResponse;
}

export default function JobCardSecondary({ jobInfo }: JobCardSecondaryProps) {
  const [selectedJob, setSelectedJob] = useState<JobResponse | null>();

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg leading-tight">
                {jobInfo.title}
              </CardTitle>
              <CardDescription className="flex items-center gap-1">
                <MapPinHouse className="h-4 w-4" />
                {jobInfo.companyName}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {jobInfo.location}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {jobInfo.jobType}
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />${jobInfo.minSalary} - $
              {jobInfo.maxSalary}
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {jobInfo.description}
          </p>

          <div className="flex flex-wrap gap-1">
            {jobInfo.skills.slice(0, 3).map((skill, index) => (
              <SkillBadge key={skill.id} skill={skill} index={index} className="py-2" />

            ))}

            {jobInfo.skills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{jobInfo.skills.length - 3} more
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{getDaysSincePosted(jobInfo.datePosted)} days</span>
            {jobInfo.status === "Remote" && (
              <Badge variant="outline" className="text-xs">
                Remote
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="pt-0 flex space-x-2">
          <Button className="flex-1 bg-sky-600">Apply Now</Button>
          <Button variant={"outline"} className="flex items-center w-30">
            Show Details <ChevronRight />
          </Button>
        </CardFooter>
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
