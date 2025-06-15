import { MapPin, Search } from "lucide-react";

const JobSearch = () => {
  return (
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
  );
};

export default JobSearch;
