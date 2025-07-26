import ProgressBar from "@/components/ProgressBar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const geographicData = [
  { location: "New York", users: 1240, jobs: 45 },
  { location: "California", users: 980, jobs: 38 },
  { location: "Texas", users: 756, jobs: 32 },
  { location: "Florida", users: 623, jobs: 28 },
  { location: "Illinois", users: 445, jobs: 22 },
];

export function GeographicDistribution() {
  const maxUsers = Math.max(...geographicData.map((item) => item.users));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Geographic Distribution</CardTitle>
        <CardDescription>User distribution by location</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {geographicData.map((location) => {
          const percentage = (location.users / maxUsers) * 100;

          return (
            <div key={location.location} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{location.location}</span>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{location.users} users</span>
                  <span>{location.jobs} jobs</span>
                </div>
              </div>
              <ProgressBar value={percentage} className="h-2" />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
