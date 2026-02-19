import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileUser, MoreVertical } from "lucide-react";
import type { ApplicantSummary } from "../types/ApplicantSummary";
import { ApplicationStatusBadge } from "./ApplicationStatusBadge";
import { getSignedUrl } from "../services/fileApi";
import { extractAxiosErrorMessage } from "@/utils/apiErrorHandler";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  acceptApplication,
  rejectApplication,
} from "@/features/jobApplications/applicationApi";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export default function ApplicantInfoCard({
  applicant,
  jobId,
}: {
  applicant: ApplicantSummary;
  jobId: number;
}) {
  const [isDownloading, setIsDownloading] = useState(false);

  const queryClient = useQueryClient();

  const handleDownload = async () => {
    if (isDownloading) return;

    if (!applicant.resumeFileId) {
      toast.error("Resume not available", { position: "top-center" });
      return;
    }

    try {
      setIsDownloading(true);
      const signedUrl = await getSignedUrl(applicant.resumeFileId, true);

      window.location.href = signedUrl;
    } catch (error) {
      const mesage = extractAxiosErrorMessage(error);
      toast.error(mesage, { position: "top-center" });
    } finally {
      setIsDownloading(false);
    }
  };

  const acceptMutation = useMutation({
    mutationFn: acceptApplication,
    onSuccess: () => {
      toast.success("Application accepted");
      queryClient.invalidateQueries({ queryKey: ["jobApplicants", jobId] });
    },
    onError: (error) => {
      toast.error(extractAxiosErrorMessage(error));
    },
  });

  const rejectMutation = useMutation({
    mutationFn: rejectApplication,
    onSuccess: () => {
      toast.success("Application rejected");
      queryClient.invalidateQueries({ queryKey: ["jobApplicants", jobId] });
    },
    onError: (error) => {
      toast.error(extractAxiosErrorMessage(error));
    },
  });

  return (
    <div
      key={applicant.id}
      className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 sm:flex-row sm:items-center sm:justify-between"
    >
      {/* Left side - Applicant info */}
      <div className="flex items-start gap-4 sm:items-center">
        <Avatar className="h-12 w-12 flex-shrink-0">
          <AvatarImage
            src={applicant.profileImageUrl || "/placeholder.svg"}
            alt={applicant.name + "image profile"}
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
        <Button
          variant="outline"
          size="sm"
          className="gap-2 hover:text-white hover:bg-primary-hover"
          disabled={isDownloading}
          onClick={handleDownload}
        >
          <FileUser className="h-4 w-4" />
          {isDownloading ? "Downloading..." : " Download Resume"}
        </Button>
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
            <DropdownMenuItem onClick={handleDownload}>
              Download Resume
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => acceptMutation.mutate(applicant.id)}
              disabled={
                applicant.status == "Accepted" || applicant.status == "Rejected"
              }
            >
              Accept Application
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => rejectMutation.mutate(applicant.id)}
              disabled={
                applicant.status == "Accepted" || applicant.status == "Rejected"
              }
            >
              Reject Application
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
