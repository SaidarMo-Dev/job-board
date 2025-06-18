import type { JobProps } from "@/types/JobProps";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  ArrowUpRightFromSquare,
  Clock,
  DollarSign,
  Heart,
  MapPin,
  SquareDashedKanbanIcon,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export default function JobCardMini({ jobInfo }: { jobInfo: JobProps }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <p className="text-gray-600 flex gap-1 items-center">
            <span className="text-xl font-semibold text-green-600 flex items-center gap-2">
              <DollarSign />
              {jobInfo.SalaryRange}
            </span>
            per year
          </p>
          <button className="cursor-pointer hover:bg-gray-200 p-2 rounded-md">
            <Heart className="w-5 h-5" color="red" fill="red" />
          </button>
        </div>
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
      <CardFooter>
        <Button className="w-full bg-sky-600 hover:bg-sky-700 cursor-pointer">
          Easy Apply <ArrowUpRightFromSquare className="w-5 h-5" />{" "}
        </Button>
      </CardFooter>
    </Card>
  );
}
