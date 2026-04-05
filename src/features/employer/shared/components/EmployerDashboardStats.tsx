import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ActivitySquareIcon,
  BriefcaseBusiness,
  CloudLightning,
} from "lucide-react";

export default function EmployerDashboardStats({
  totalJobs,
  activeJobs,
  ApplicationsReceived,
  className,
}: {
  totalJobs: number;
  activeJobs: number;
  ApplicationsReceived: number;
  className?: string;
}) {
  return (
    <div>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
      >
        <Card className="shadow-none border-gray-100 dark:border-gray-50/10">
          <CardHeader>
            <div className="flex items-center justify-center bg-primary-50 dark:bg-accent w-10 h-10 rounded-xl">
              <BriefcaseBusiness className="h-6 w-6 text-primary dark:text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <div className="text-2xl font-bold text-card-foreground">
              {totalJobs}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none border-gray-100 dark:border-gray-50/10">
          <CardHeader>
            <div className="flex items-center justify-center bg-blue-50 dark:bg-accent w-10 h-10 rounded-xl">
              <ActivitySquareIcon className="h-6 w-6 text-blue-600  dark:text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <div className="text-2xl font-bold text-card-foreground">
              {activeJobs}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none border-gray-100 dark:border-gray-50/10">
          <CardHeader>
            <div className="flex items-center justify-center bg-green-50  dark:bg-accent w-10 h-10 rounded-xl">
              <CloudLightning className="h-6 w-6 text-green-600  dark:text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-sm font-medium">
              Applications Received
            </CardTitle>
            <div className="text-2xl font-bold text-card-foreground">
              {ApplicationsReceived}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
