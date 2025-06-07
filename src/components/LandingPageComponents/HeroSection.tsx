import { MapPin, Search } from "lucide-react";

export function HeroSection() {
  return (
    <>
      <section className="bg-white p-15">
        <div className="custum-container">
          {/* Descriptions */}
          <div className="text-center">
            <h1 className="text-6xl font-bold">Find Your Dream Job</h1>
            <span className="text-6xl font-bold text-sky-500">Today</span>
            <p className="text-2xl mt-5 text-gray-600">
              Connect with thousands of companies hiring now. Your next career
              opportunity is just a search away.
            </p>
          </div>

          {/* Find Job */}
          <div className="flex bg-white mt-12 gap-3 rounded-full border border-gray-100 items-center pr-2">
            {/* Job Title Input */}
            <div className="relative w-1/2">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6 pointer-events-none" />
              <input
                type="text"
                placeholder="Job Title"
                className="w-full pl-12 p-5 outline-0 rounded-lg border-gray-200 text-lg"
              />
            </div>

            {/* Separator */}
            <div className="h-10 w-0.5 bg-gray-400"></div>

            {/* Location Input */}
            <div className="relative w-1/2">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6 pointer-events-none" />
              <input
                type="text"
                placeholder="Location"
                className="w-full pl-12 p-5 outline-0 rounded-lg border-gray-200 text-lg"
              />
            </div>
            <button className="cursor-pointer w-35 p-3 rounded-3xl bg-sky-500 text-white text-lg hover:bg-sky-500/90">
              Search
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
