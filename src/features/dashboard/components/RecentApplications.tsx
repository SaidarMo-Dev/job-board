import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { RecentApplication } from "../dashboardTypes";
import ApplicationActivityItem from "./ApplicationActivityItem";
import { Link } from "react-router";
import { ROUTES } from "@/constants/routes";

export function RecentApplications({
  recentApplications,
}: {
  recentApplications: RecentApplication[] | null;
}) {
  if (recentApplications === null) return null;
  return (
    <Card className="bg-gray-50">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Recent Applications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentApplications.length > 0 ? (
          recentApplications.map((application) => (
            <ApplicationActivityItem
              key={application.id}
              recentApplication={application}
            />
          ))
        ) : (
          <div className="flex justify-between items-center">
            <span className="ml-2 text-gray-700">
              You don't have any application yet!
            </span>
            <Button asChild variant={"link"}>
              <Link to={ROUTES.PUBLIC.JOBS}>Discover Jobs</Link>
            </Button>
          </div>
        )}
        {recentApplications.length > 0 && (
          <Button
            variant="outline"
            className="w-full mt-4 bg-transparent hover:bg-primary hover:text-white"
          >
            <Link to={ROUTES.MEMBER.APPLICATIONS}>View All Applications</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
