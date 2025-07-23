import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  ArrowUpRightFromSquare,
  ChevronRight,
  Clock,
  DollarSign,
  Heart,
  MapPin,
  SquareDashedKanbanIcon,
} from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import type { JobResponse } from "../jobTypes";
import { getDaysSincePosted } from "@/utils/getDaysSincePosted";
import { useState } from "react";
import JobDetailsModal from "./JobDetailsModal";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  getUserSavedJobsThunk,
  UnsaveJobThunk,
} from "@/features/bookmarks/bookmarksThunk";
import { Link } from "react-router";

interface JobCardMiniProps {
  job: JobResponse;
  savedSection?: boolean;
}

export default function SavedJobCard({
  job,
  savedSection = false,
}: JobCardMiniProps) {
  const [opneShowDetails, setOpenShowDetails] = useState(false);

  const dispatch = useAppDispatch();

  function handleUnsave() {
    (async () => {
      const result = await dispatch(UnsaveJobThunk({ jobId: job.jobId }));
      if (UnsaveJobThunk.fulfilled.match(result)) {
        dispatch(getUserSavedJobsThunk({ UserId: 1, Page: 1 }));
      }
    })();
  }

  const handleCloseModal = (updated: boolean) => {
    setOpenShowDetails(false);

    if (updated) {
      dispatch(getUserSavedJobsThunk({ UserId: 1, Page: 1 }));
    }
  };
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <p className="text-gray-600 flex gap-1 items-center">
            <span className="text-xl font-semibold text-green-600 flex items-center gap-2">
              <DollarSign />${job.maxSalary / 1000} - ${job.minSalary / 1000}
            </span>
            per year
          </p>
          {savedSection && (
            <button
              className="cursor-pointer hover:bg-gray-200 p-2 rounded-md"
              onClick={handleUnsave}
            >
              <Heart className="w-5 h-5" color="red" fill="red" />
            </button>
          )}
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
      </CardHeader>
      <CardContent>
        <div className="space-x-2">
          {job.skills.map((skill, index) => {
            return (
              <Badge key={index} className="bg-sky-100 text-black">
                {skill.name}
              </Badge>
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
          <Link
            className="flex-1 bg-sky-600 hover:bg-sky-700 flex justify-center items-center rounded-md text-white font-medium text-sm"
            to={`/jobs/${job.jobId}/apply`}
          >
            Easy Apply <ArrowUpRightFromSquare className="w-5 h-5" />
          </Link>
          <Button
            variant={"outline"}
            className="cursor-pointer"
            onClick={() => setOpenShowDetails(true)}
          >
            Show Details <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </CardFooter>
      {opneShowDetails && (
        <JobDetailsModal
          selectedJob={job}
          onClose={(updated) => handleCloseModal(updated)}
        />
      )}
    </Card>
  );
}
