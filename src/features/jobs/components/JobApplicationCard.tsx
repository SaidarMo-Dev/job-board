// shadcn ui
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// lucide react
import {
  CheckCircle,
  Clock,
  MapPin,
  SquareDashedKanbanIcon,
  X,
} from "lucide-react";

import type { UserApplicationResponse } from "@/features/jobApplications/applicationType";
import { getDaysSincePosted } from "@/utils/getDaysSincePosted";
import SkillBadge from "@/components/SkillBadge";
interface JobApplicationProps {
  application: UserApplicationResponse;
}
export default function JobApplicationCard({
  application,
}: JobApplicationProps) {
  return (
    <Card>
      <CardHeader>
        {application.status === "Pending" && (
          <div className="flex gap-2 items-center">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div className="text-xs py-1 px-2 rounded-full font-semibold text-green-600 bg-green-100">
              Submitted
            </div>
          </div>
        )}

        {application.status === "Accepted" && (
          <div className="flex gap-2 items-center">
            <CheckCircle className="w-5 h-5 text-sky-600" />
            <div className="text-xs py-1 px-2 rounded-full font-semibold text-sky-600 bg-sky-100">
              Accepted
            </div>
          </div>
        )}

        {application.status === "Rejected" && (
          <div className="flex gap-2 items-center">
            <X className="w-5 h-5 text-red-600" />
            <div className="text-xs py-1 px-2 rounded-full font-semibold text-red-600 bg-red-100">
              rejected
            </div>
          </div>
        )}
        <CardTitle className="text-xl">{application.job.title}</CardTitle>
        <div className="flex gap-2 text-gray-600 text-sm">
          <SquareDashedKanbanIcon className="w-4 h-4" />
          {application.job.companyName}
        </div>
        <div className="flex gap-2 text-gray-600 text-sm">
          <MapPin className="w-4 h-4" />
          {application.job.location}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-x-2">
          {application.job.skills.map((skill, index) => {
            return <SkillBadge key={skill.id} index={index} skill={skill} />;
          })}
        </div>
        <div className="my-4 text-gray-600 text-xs flex items-center gap-2">
          <Clock className="w-3 h-3" />
          <div>
            Posted {getDaysSincePosted(application.job.datePosted)} days ago
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col">
        {application.status === "Pending" && (
          <div className="flex flex-col items-center justify-center gap-2">
            <CheckCircle className="text-green-600 w-8 h-8" />
            <div className="text-sm font-medium text-gray-500">
              Application Submitted Successfully
            </div>
          </div>
        )}

        {application.status === "Accepted" && (
          <div className="flex flex-col items-center justify-center gap-2">
            <CheckCircle className="text-sky-600 w-8 h-8" />
            <div className="text-sm font-medium text-gray-500">
              Your application accepted check your email!
            </div>
          </div>
        )}

        {application.status === "Rejected" && (
          <div className="flex flex-col items-center justify-center gap-2">
            <CheckCircle className="text-red-600 w-8 h-8" />
            <div className="text-sm font-medium text-gray-500">
              Your application rejected
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
