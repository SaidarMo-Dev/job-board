import type { ActivityItem } from "../dashboardTypes";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Activity from "./Activity";

interface ActivityTimelineProps {
  activities: ActivityItem[];
  className?: string;
}

export function ActivityTimeline({
  activities,
  className = "",
}: ActivityTimelineProps) {
  return (
    <Card className={`md:col-span-2 ${className}`}>
      <CardHeader>
        <CardTitle className="text-2xl">Recent Activity</CardTitle>
        <CardDescription>Latest updates from your job portal</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <Activity activity={activity} />
        ))}
      </CardContent>
    </Card>
  );
}
