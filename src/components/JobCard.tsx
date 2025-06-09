import { Bookmark, Clock, MapPin } from "lucide-react";
import type { JobProps } from "../types/JobProps";

export function JobCard({ job }: { job: JobProps }) {
  const skillsList = job.Skills.map((s) => {
    return (
      <div className="p-1 pl-2 pr-2 rounded-xl bg-blue-50 text-sm mr-3 font-semibold">
        {s.Skill}
      </div>
    );
  });

  return (
    <div className="relative p-5 border-2 border-gray-100 rounded-md">
      {/* JOB CARD HEADER */}
      <div className="flex gap-4">
        <div>
          <img src="../../src/assets/react.svg" alt="" />
        </div>

        <div className="flex items-start w-full justify-between">
          <div>
            <h4 className="font-bold">{job.Title}</h4>
            <h5 className="text-sm text-neutral-500">{job.Company}</h5>
          </div>
          <button className="">
            <Bookmark color="#9E9E9E" width="20px" height="20px" />
          </button>
        </div>
      </div>

      {/* JOB CARD BODY */}
      <div>
        {/* JOB INFO */}
        <div className="flex justify-between">
          <div className="text-sm text-neutral-500 mt-3">
            <div className="flex gap-2.5">
              <MapPin width="20px" height="20px" />
              <h5 className="text-sm">{job.Location}</h5>
            </div>

            <div className="flex gap-2.5 mt-4">
              <Clock width="20px" height="20px" />
              <h5 className="text-sm">{job.JobType}</h5>
            </div>
          </div>

          {/* SALARY RANDGE */}
          <div className="self-end text-green-600">{job.SalaryRange}</div>
        </div>

        {/* JOB SKILLS */}
        <div className="flex flex-wrap mt-5 mb-5">{skillsList}</div>
      </div>
      <hr className="text-neutral-200 border-1" />
      {/* JOB CARD FOOTER */}
      <div className="flex items-center justify-between text-sm text-neutral-500 mt-5">
        <h4>2 Day ago</h4>
        <button className="bg-blue-50 text-sky-600 p-2 rounded-md duration-75 hover:bg-sky-500 hover:text-white">
          Apply Now
        </button>
      </div>

      <button className="absolute rounded-2xl bg-yellow-500 p-0.5 pl-2 pr-2 text-white top-0 -right-4 text-sm transform -translate-y-1/2">
        Featured
      </button>
    </div>
  );
}
