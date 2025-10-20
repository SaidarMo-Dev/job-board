import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import type { ApplicantSummary } from "../types/ApplicantSummary";
import { ApplicationStatusBadge } from "./ApplicationStatusBadge";

export default function ApplicantInfoCard({
  applicant,
}: {
  applicant: ApplicantSummary;
}) {
  return (
    <div
      key={applicant.id}
      className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 sm:flex-row sm:items-center sm:justify-between"
    >
      {/* Left side - Applicant info */}
      <div className="flex items-start gap-4 sm:items-center">
        <Avatar className="h-12 w-12 flex-shrink-0">
          <AvatarImage
            src={applicant.imagePath || "/placeholder.svg"}
            alt={applicant.name}
          />
          <AvatarFallback className="bg-primary/10 text-primary">
            {applicant.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-foreground">{applicant.name}</h4>
            <ApplicationStatusBadge status={applicant.status} />
          </div>
          <p className="text-sm text-muted-foreground">{applicant.email}</p>
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            <span>{applicant.experience} experience</span>
            <span>•</span>
            <span>{applicant.country}</span>
            <span>•</span>
            <span>
              Applied {new Date(applicant.appliedDate).toDateString()}
            </span>
          </div>
        </div>
        <Button variant="outline">Download resume</Button>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="text-green-700">
              Accept Application
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Reject Application
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
