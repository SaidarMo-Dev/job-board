import type { JobProps } from "@/types/JobProps";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  CheckCircle,
  CircleAlert,
  Clock,
  FileBarChart,
  MapPin,
  SquareDashedKanbanIcon,
} from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import ProgressBar from "../../../components/ProgressBar";

interface JobApplicationProps {
  jobInfo: JobProps;
  status: "completed" | "incompleted";
}
export default function JobApplicationCard({
  jobInfo,
  status,
}: JobApplicationProps) {
  return (
    <Card>
      <CardHeader>
        {status === "completed" && (
          <div className="flex gap-2 items-center">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div className="text-xs py-1 px-2 rounded-full font-semibold text-green-600 bg-green-100">
              Submitted
            </div>
          </div>
        )}

        {status === "incompleted" && (
          <div className="flex gap-2 items-center">
            <CircleAlert className="w-5 h-5 text-red-400" />
            <div className="text-xs py-1 px-3 rounded-full font-semibold text-orange-600 bg-orange-100">
              Incomplete
            </div>
          </div>
        )}
        <CardTitle className="text-xl">{jobInfo.Title}</CardTitle>
        <div className="flex gap-2 text-gray-600 text-sm">
          <SquareDashedKanbanIcon className="w-4 h-4" />
          {jobInfo.Company}
        </div>
        <div className="flex gap-2 text-gray-600 text-sm">
          <MapPin className="w-4 h-4" />
          {jobInfo.Location}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-x-2">
          {jobInfo.Skills.map((skill) => {
            return (
              <Badge className="bg-sky-100 text-black">{skill.Skill}</Badge>
            );
          })}
        </div>
        <div className="my-4 text-gray-600 text-xs flex items-center gap-2">
          <Clock className="w-3 h-3" />
          <div>Posted {jobInfo.CreatedAt} days ago</div>
        </div>
      </CardContent>
      <CardFooter className="flex-col">
        {status === "incompleted" && (
          <>
            <div className="flex justify-between w-full text-sm text-gray-700 -mt-5 mb-1 font-medium">
              <h4>Application progress</h4>
              <span>30%</span>
            </div>

            <ProgressBar value={30} className="mb-4" color="bg-sky-600" />

            <Button className="w-full bg-sky-600 hover:bg-sky-700 cursor-pointer">
              <FileBarChart className="w-5 h-5" />
              Complete Application
            </Button>
          </>
        )}

        {status === "completed" && (
          <div className="flex flex-col items-center justify-center gap-2">
            <CheckCircle className="text-green-600 w-8 h-8" />
            <div className="text-sm font-medium text-gray-500">
              Application Submitted Successfully
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
