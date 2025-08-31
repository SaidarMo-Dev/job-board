import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { MapPin, Clock, DollarSign, User, ChevronRight } from "lucide-react";
import type { JobResponse } from "../jobTypes";
import { getDaysSincePosted } from "@/utils/getDaysSincePosted";
import { splitCamelCase } from "@/utils/stringUtils";
import { Link } from "react-router";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectIsJobApplied } from "@/features/jobApplications/applicationSlice";
import AlreadyApplied from "./AlreadyApplied";

interface ModernJobCardProps {
  job: JobResponse;
  className?: string;
  onShowDetails: (job: JobResponse) => void;
}

export default function ModernJobCard({
  job,
  className,
  onShowDetails,
}: ModernJobCardProps) {
  const isJobApplied = useAppSelector((state) =>
    selectIsJobApplied(state, job.jobId)
  );
  return (
    <Card
      key={job.jobId}
      className={`bg-card border-border hover:shadow-lg transition-shadow duration-200 ${className}`}
    >
      <CardHeader className="pb-4">
        <div className="flex justify-end items-start mb-3">
          <Badge>
            {job.experienceLevel !== "Any"
              ? splitCamelCase(job.experienceLevel)
              : "No experience required"}
          </Badge>
        </div>

        <div className="flex items-start gap-3">
          <img
            src="/public/images/logov2.png"
            alt={`${job.companyName} logo`}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-card-foreground font-serif leading-tight">
              {job.title}
            </h3>
            <p className="text-muted-foreground font-medium">
              {job.companyName}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Job Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{job.location}</span>
            <Clock className="w-4 h-4 ml-2" />
            <span>{job.jobType}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="font-semibold text-green-600">
              {job.minSalary / 1000}k - {job.maxSalary / 1000}k{" "}
              <span className="text-gray-500 font-normal">per year</span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="w-4 h-4" />
            <span>Posted {getDaysSincePosted(job.datePosted)} days ago</span>
          </div>
        </div>

        {/* Job Description Preview */}
        <p className="text-sm text-card-foreground mb-4 line-clamp-2">
          {job.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {job.skills.slice(0, 3).map((skill) => (
            <Badge key={skill.id} variant="secondary" className="text-xs">
              {skill.name}
            </Badge>
          ))}
          {job.skills.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{job.skills.length - 3} more
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {isJobApplied ? (
            <AlreadyApplied />
          ) : (
            <Link
              to={`/jobs/${job.jobId}/apply`}
              className="flex-1 bg-primary hover:bg-primary/90 flex justify-center items-center rounded-md text-white font-medium text-sm"
            >
              Apply Now
            </Link>
          )}

          <Button
            variant="outline"
            className="flex items-center gap-1 bg-transparent"
            onClick={() => onShowDetails(job)}
          >
            Details <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
