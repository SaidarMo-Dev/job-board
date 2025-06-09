import {
  ArrowRight,
  Blocks,
  Briefcase,
  MapPin,
  Search,
  Users,
} from "lucide-react";
import { PopularSearch } from "../PopularSearch";

export function HeroSection() {
  return (
    <>
      <section className="bg-slate-50 py-15">
        <div className="custom-container">
          {/* Descriptions */}
          <div>
            <h1 className="text-6xl font-bold">
              Find Your <span className="text-sky-600">Dream Job</span>
            </h1>
            <span className="font-bold text-6xl">Today</span>
            <p className="my-5 text-lg text-neutral-700 max-w-200">
              Connect with top employers and discover opportunities that match
              your skills, experience, and career goals. Your next career move
              starts here.{" "}
            </p>
            <button className="bg-sky-600 py-2.5 px-13 text-white rounded-md relative hover:bg-sky-600/90">
              <Search
                className="absolute left-6 top-1/2 transform -translate-y-1/2"
                width="17px"
                height="17px"
              />
              Browse Jobs
              <ArrowRight
                className="absolute right-5 top-1/2 transform -translate-y-1/2"
                width="17px"
                height="17px"
              />
            </button>
            <button className="relative bg-white border-2 py-2.5 pl-12 pr-8 ml-5 border-neutral-100 rounded-md hover:bg-neutral-50 hover:border-neutral-200">
              <Briefcase
                className="absolute top-1/2 transform -translate-y-1/2 left-5"
                width="17px"
                height="17px"
              />
              Post a Job
            </button>
          </div>
        </div>
      </section>

      {/* Find Job */}
      <section className="mt-15 py-15 bg-white ">
        <div className="custom-container">
          {/* main container find job */}
          <div>
            <h2 className="font-bold text-4xl text-center">
              Start Your Job Search
            </h2>
            <h4 className="mt-2 text-lg text-gray-500 text-center">
              Find opportunities that match your skills and aspirations
            </h4>

            <div className="shadow-lg border-2  border-gray-100 mt-10 p-4">
              <div className="flex flex-col md:flex-row bg-white gap-3 rounded-lg items-center">
                {/* Job Title Input */}
                <div className="relative w-full md:w-1/2 border-2 border-neutral-200 rounded-lg">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Job Title"
                    className="w-full pl-12 p-3 outline-0 rounded-lg border-gray-200"
                  />
                </div>

                {/* Location Input */}
                <div className="relative w-full md:w-1/2 border-2 border-neutral-200 rounded-lg">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Location"
                    className="w-full pl-12 p-3 outline-0 rounded-lg border-gray-200"
                  />
                </div>
                <button className="cursor-pointer w-full md:w-50 p-3 rounded-sm bg-sky-600 text-white text-lg hover:bg-sky-600/90">
                  Search
                </button>
              </div>
              <hr className="text-neutral-200 mt-6 mb-6" />
              <div>
                <div className="text-neutral-600">Popular Search:</div>
                <div className="flex flex-wrap ml-1 mt-1">
                  <PopularSearch searchBy="Remote Work" />
                  <PopularSearch searchBy="Software Engineer" />
                  <PopularSearch searchBy="Product Manager" />
                  <PopularSearch searchBy="UX Desinger" />
                  <PopularSearch searchBy="Marketing Manager" />
                  <PopularSearch searchBy=".Net Developer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
