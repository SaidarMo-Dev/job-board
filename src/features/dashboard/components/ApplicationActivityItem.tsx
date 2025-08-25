import { Badge } from "@/components/ui/badge";
import { Eye, CheckCheckIcon, UserX } from "lucide-react";
import type { RecentApplication } from "../dashboardTypes";
import { getDaysSincePosted } from "@/utils/getDaysSincePosted";
import { useMemo } from "react";

interface ActivityItemProps {
  recentApplication: RecentApplication;
}

export default function ApplicationActivityItem({
  recentApplication,
}: ActivityItemProps) {
  const statusConfig = {
    Pending: {
      icon: Eye,
      color: "bg-yellow-100 text-yellow-700",
      label: "Pending",
    },
    Rejected: {
      icon: UserX,
      color: "bg-red-100 text-red-700",
      label: "Rejected",
    },
    Accepted: {
      icon: CheckCheckIcon,
      color: "bg-green-100 text-green-700",
      label: "Accepted",
    },
  };

  const config = statusConfig[recentApplication.status];
  const Icon = config.icon;

  const createdDays = useMemo(
    () => getDaysSincePosted(recentApplication.applicantDate),
    [recentApplication.applicantDate]
  );

  return (
    <div className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${config.color}`}>
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <p className="font-medium text-sm">{recentApplication.position}</p>
          <p className="text-xs text-muted-foreground">
            {recentApplication.company}
          </p>
        </div>
      </div>
      <div className="text-right">
        <Badge variant="outline" className="text-xs mb-1">
          {config.label}
        </Badge>
        <p className="text-xs text-muted-foreground">
          {createdDays === 0 ? "Today" : createdDays + " days ago"}
        </p>
      </div>
    </div>
  );
}
