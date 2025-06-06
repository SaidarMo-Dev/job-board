import { MapPin, Search } from "lucide-react";

export function HeroSection() {
  return (
    <>
      <div className="bg-blue-50 p-15">
        {/* Descriptions */}
        <div className="text-center">
          <h1 className="text-6xl font-bold">Find Your Dream Job</h1>
          <span className="text-6xl font-bold text-sky-500">Today</span>
          <p className="text-2xl mt-5 text-gray-600">
            Connect with thousands of companies hiring now. Your next career
            opportunity is just a search away.
          </p>
        </div>

        <div className="bg-white mt-12 p-5 flex gap-3 rounded-xl">
          {/* Job Title Input */}
          <div className="relative w-1/2">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6 pointer-events-none" />
            <input
              type="text"
              placeholder="Job Title"
              className="w-full border pl-12 p-5 outline-0 rounded-lg border-gray-200 text-lg"
            />
          </div>

          {/* Location Input */}
          <div className="relative w-1/2">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6 pointer-events-none" />
            <input
              type="text"
              placeholder="Location"
              className="w-full border pl-12 p-5 outline-0 rounded-lg border-gray-200 text-lg"
            />
          </div>
          <button className="cursor-pointer w-60 rounded-lg bg-sky-500 text-white text-lg hover:bg-sky-500/90">
            search Jobs
          </button>
        </div>

        {/* Popular Search */}
        <div className="text-center">
          <h4 className="font-semibold mt-15 text-xl">Popular Search:</h4>
          {/* Searches */}
          <div className="flex mt-4 justify-center">
            <button className="popular-search-btn">Software Engineer</button>
            <button className="popular-search-btn">Data Scientist</button>
            <button className="popular-search-btn"> Designer</button>
            <button className="popular-search-btn">Product Manager</button>
            <button className="popular-search-btn">Marketing</button>
          </div>
        </div>
      </div>
    </>
  );
}
