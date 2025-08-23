import { Badge } from "@/components/ui/badge";
import { Bookmark, MapPin, DollarSign, Eye } from "lucide-react";
import type { JobResponse } from "@/features/jobs/jobTypes";
import { splitCamelCase } from "@/utils/stringUtils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface JobRecommendationCardProps {
  job: JobResponse;
}

export function JobRecommendationCard({ job }: JobRecommendationCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow bg-gray-50/90">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-foreground line-clamp-1">
                {job.title}
              </h3>

              <Badge
                variant="secondary"
                className="text-xs bg-primary text-white"
              >
                {job.experienceLevel === "Any"
                  ? "No experience required"
                  : splitCamelCase(job.experienceLevel)}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              {job.companyName}
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {job.location}
              </div>

              <div className="flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                {job.minSalary / 1000}K - {job.maxSalary / 1000}K
              </div>
              <div className="text-green-600 font-medium">
                {job.jobType === "FreeLance"
                  ? "Freelance"
                  : splitCamelCase(job.jobType)}
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {job.skills.slice(0, 3).map((skill) => (
            <Badge key={skill.id} variant="outline" className="text-xs">
              {skill.name}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          {/* TODO : Handle match porcentage */}
          <div className="text-xs text-muted-foreground">
            <span className="text-primary font-medium">85% match</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs bg-transparent"
            >
              <Eye />
              View Details
            </Button>
            <Button size="sm" className="text-xs">
              Apply Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
