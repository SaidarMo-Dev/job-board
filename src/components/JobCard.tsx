import { Bookmark, Clock, MapPin } from "lucide-react";

export function JobCard() {
  return (
    <div className="relative p-5 border-2 border-gray-100 rounded-md">
      {/* JOB CARD HEADER */}
      <div className="flex gap-4">
        <div>
          <img src="../../src/assets/react.svg" alt="" />
        </div>

        <div className="flex items-start">
          <div>
            <h4 className="font-bold">Senior Frontend Developer</h4>
            <h5 className="text-sm text-neutral-500">Microsoft</h5>
          </div>
          <button className="absolute right-4">
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
              <h5>Now York, NY</h5>
            </div>

            <div className="flex gap-2.5 mt-4">
              <Clock width="20px" height="20px" />
              <h5>Full Time</h5>
            </div>
          </div>

          {/* SALARY RANDGE */}
          <div className="self-end text-green-600">$50k - $110k</div>
        </div>
        <hr className="mt-5 mb-4 text-neutral-200 border-1" />
        {/* JOB SKILLS */}
        <div></div>
      </div>

      {/* JOB CARD FOOTER */}
      <div className="flex items-center justify-between text-sm text-neutral-500">
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
