import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

// TODO : handle last logins
const lastLogins = [
  { date: "2024-01-15 14:30", ip: "192.168.1.100" },
  { date: "2024-01-14 09:15", ip: "192.168.1.100" },
  { date: "2024-01-13 16:45", ip: "10.0.0.50" },
];

export default function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {lastLogins.map((login, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-sm"
            >
              <div>
                <p className="font-medium">{login.date}</p>
                <p className="text-muted-foreground">IP: {login.ip}</p>
              </div>
              <Badge
                variant={index === 0 ? "default" : "secondary"}
                className="text-xs"
              >
                {index === 0 ? "Current" : "Previous"}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
