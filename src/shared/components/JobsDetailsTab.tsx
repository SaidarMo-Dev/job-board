import { MapPin, DollarSign, Clock, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { JobResponse } from "@/features/jobs/jobTypes";

export function JobDetailsTab({ job }: { job?: JobResponse }) {
  if (!job) return <div>No job informations found</div>;
  return (
    <div className="space-y-6 p-6">
      {/* Overview */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Overview</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium text-foreground">{job.location}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Salary Range</p>
              <p className="font-medium text-foreground">
                ${job.minSalary / 1000}K - ${job.maxSalary / 1000}K
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Job Type</p>
              <p className="font-medium text-foreground">{job.jobType}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Briefcase className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Company</p>
              <p className="font-medium text-foreground">{job.companyName}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">Description</h3>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
          {job.description}
        </p>
      </div>

      {/* Categories*/}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {job.categories.map((skill) => (
            <Badge key={skill.id} variant="secondary">
              {skill.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">
          Required Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill) => (
            <Badge key={skill.id} variant="secondary">
              {skill.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
