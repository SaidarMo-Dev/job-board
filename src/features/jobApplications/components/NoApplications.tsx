import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { Link } from "react-router";
import type { ApplicationStatusFilterType } from "../applicationType";

interface NoApplicationsProps {
  tab: ApplicationStatusFilterType;
}
export function NoApplications({ tab }: NoApplicationsProps) {
  function getCorrectParagraph() {
    if (tab === "Pending") return "Start applying to jobs to see them here";
    else if (tab === "Rejected")
      return "Good news! You haven't been rejected from any jobs";
    else if (tab === "Accepted")
      return "You haven't been accepted yet. Keep applying and watch this space!";
  }

  return (
    <div className="text-center py-12">
      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-lg font-semibold mb-2">
        No {tab === "All" ? "" : tab} applications yet
      </h3>
      <p className="text-muted-foreground mb-4">{getCorrectParagraph()}</p>

      <Link to="/jobs">
        <Button className="bg-sky-600 hover:bg-sky-700 px-7 cursor-pointer">
          Browse Jobs
        </Button>
      </Link>
    </div>
  );
}
