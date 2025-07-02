import { Bookmark, Calendar, Clock, MapPin } from "lucide-react";
import type { JobProps } from "../../../types/JobProps";
import { useToast } from "../../../contexts/ToastContext";

export function JobCard({ job }: { job: JobProps }) {
  const skillsList = job.Skills.map((s) => {
    return (
      <div className="p-1 pl-2 pr-2 rounded-xl bg-blue-50 text-sm mr-3 font-semibold">
        {s.Skill}
      </div>
    );
  });

  const { handleShowCloseToast } = useToast();
  return (
    <div className="relative p-5 border border-gray-200 rounded-md border-l-4 border-l-sky-600">
      {/* JOB CARD HEADER */}
      <div className="flex gap-4 items-center">
        <div>
          <img src="../../src/assets/react.svg" alt="" />
        </div>

        <div className="flex items-start w-full justify-between">
          <div>
            <button className="rounded-3xl mb-1 border border-sky-200 bg-sky-50 pl-2 pr-2 text-sky-600 font-semibold text-sm">
              Featured
            </button>
            <h4 className="font-bold">{job.Title}</h4>
            <h5 className="text-sm text-neutral-500 font-semibold">
              {job.Company}
            </h5>
          </div>
          <button className="cursor-pointer">
            <Bookmark color="#9E9E9E" width="20px" height="20px" />
          </button>
        </div>
      </div>

      {/* JOB CARD BODY */}
      <div>
        {/* JOB INFO */}
        <div className="flex mt-4 justify-between lg:gap-30 lg:justify-normal text-neutral-600">
          <div className="text-sm text-neutral-500">
            <div className="flex gap-2.5">
              <MapPin width="20px" height="20px" />
              <h5 className="text-sm">{job.Location}</h5>
            </div>

            <div className="flex gap-2.5 mt-4">
              <Calendar width="18px" height="18px" />
              <h5 className="text-sm">{job.CreatedAt} days ago</h5>
            </div>
          </div>

          <div>
            <div className="flex gap-2.5">
              <Clock width="18px" height="18px" />
              <h5 className="text-sm">{job.JobType}</h5>
            </div>
          </div>
        </div>

        <hr className="text-neutral-200 my-5" />
        <div>
          <div className="text-green-600 font-semibold">{job.SalaryRange}</div>
        </div>

        {/* JOB SKILLS */}
        <div className="mt-5">
          <h4 className="block">Required Skills:</h4>
          <div className="flex flex-wrap mt-1 mb-5">{skillsList}</div>
        </div>
        <div className="bg-neutral-50 p-3 rounded-lg text-sm text-neutral-500">
          {job.Description ? "No Description" : job.Description}
        </div>
      </div>

      {/* JOB CARD FOOTER */}
      <div className="flex items-center text-sm text-neutral-500 mt-5 gap-2">
        <button
          className="bg-sky-600 text-white font-semibold text-sm p-2 rounded-md w-full hover:bg-sky-600/90 cursor-pointer"
          onClick={() =>
            handleShowCloseToast({
              title: "Not Yet Available",
              description: "Coming soon! This feature is under development.",
            })
          }
        >
          Apply Now
        </button>
        <button
          className="bg-white font-semibold text-sm p-2 rounded-md w-40 border border-neutral-300 hover:bg-gray-50 cursor-pointer"
          onClick={() =>
            handleShowCloseToast({
              title: "Not Yet Available",
              description: "Coming soon! This feature is under development.",
            })
          }
        >
          Learn More
        </button>
      </div>
    </div>
  );
}
