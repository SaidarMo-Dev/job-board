import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { ActivityItem } from "../dashboardTypes";

interface ActivityProps {
  activity: ActivityItem;
}
export default function Activity({ activity }: ActivityProps) {
  return (
    <div key={activity.id} className="flex items-start space-x-3">
      <Avatar className="h-8 w-8">
        <AvatarImage src={activity.user?.avatar || "/placeholder.svg"} />
        <AvatarFallback>{activity.user?.name.charAt(0) || "?"}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <p className="text-sm">
          <span className="font-medium">{activity.user?.name}</span>{" "}
          {activity.message}
        </p>
        <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
      </div>
    </div>
  );
}
