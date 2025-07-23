import {
  ArrowUpRightFromSquare,
  ChevronRight,
  Clock,
  DollarSign,
  MapPin,
  SquareDashedKanbanIcon,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";

import { getDaysSincePosted } from "@/utils/getDaysSincePosted";
import JobDetailsModal from "./JobDetailsModal";
import { useNavigate } from "react-router";
import type { JobResponse } from "../jobTypes";
import SkillBadge from "@/components/SkillBadge";
import { useAppSelector } from "@/hooks/useAppSelector";

export function JobCardMini({
  job,
  className = "",
}: {
  job: JobResponse;
  className?: string;
}) {
  const [openShowDetailsModal, setOpenShowDetailsModal] = useState(false);
  const description = useMemo(() => {
    const words = job.description.split(" ");
    return words.length >= 10
      ? words.slice(0, 9).join(" ") + "..."
      : job.description;
  }, [job.description]);

  const isAuthenticated = useAppSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const navigate = useNavigate();
  function handleApply() {
    if (isAuthenticated) {
      navigate(`/jobs/${job.jobId}/apply`);
    } else {
      navigate("/auth/login");
    }
  }
  return (
    <>
      <Card className={`border-b-3 border-b-sky-700 ${className}`}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <p className="text-gray-600 flex gap-1 items-center">
              <span className="text-xl font-semibold text-green-600 flex items-center gap-2">
                <DollarSign />${job.maxSalary / 1000}K - ${job.minSalary / 1000}
                K
              </span>
              per year
            </p>
          </div>
          <CardTitle className="text-xl">{job.title}</CardTitle>
          <div className="flex gap-2 text-gray-600 text-sm">
            <SquareDashedKanbanIcon className="w-4 h-4" />
            {job.companyName}
          </div>
          <div className="flex gap-2 text-gray-600 text-sm">
            <MapPin className="w-4 h-4" />
            {job.location}
          </div>
          <CardDescription className="mt-2 text-[16px] text-black">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-x-2">
            {job.skills.map((skill, index) => {
              return (
                <SkillBadge
                  skill={skill}
                  key={index}
                  index={index}
                  className="bg-sky-100 text-black"
                />
              );
            })}
          </div>
          <div className="my-4 text-gray-600 text-xs flex items-center gap-2">
            <Clock className="w-3 h-3" />
            <div>Posted {getDaysSincePosted(job.datePosted)} days ago</div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex gap-2 w-full">
            <Button
              className="flex-1 bg-sky-600 hover:bg-sky-700 flex justify-center items-center
              gap-2"
              onClick={handleApply}
            >
              Easy Apply <ArrowUpRightFromSquare className="w-5 h-5" />
            </Button>
            <Button
              variant={"outline"}
              className="cursor-pointer"
              onClick={() => setOpenShowDetailsModal(true)}
            >
              Show Details <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </CardFooter>
        {openShowDetailsModal && (
          <JobDetailsModal
            selectedJob={job}
            onClose={() => setOpenShowDetailsModal(false)}
          />
        )}
      </Card>
    </>
  );
}
