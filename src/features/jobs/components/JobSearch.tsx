import { MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface JobSearchProps {
  className?: string;
  onSearch: (title, location) => void;
  title?: string;
  location?: string;
}

type searchType = "title" | "location";

const JobSearch = ({
  title = "",
  location = "",
  className = "",
  onSearch,
}: JobSearchProps) => {
  const [searchValues, setSearchValues] = useState({ title, location });

  function UpdateSearch(key: searchType, value: string) {
    setSearchValues((prev) => ({ ...prev, [key]: value }));
    if (!value) {
      if (key === "title") onSearch("", searchValues.location);
      else onSearch(searchValues.title, "");
    }
  }

  return (
    <div
      className={`m-auto w-full flex flex-col md:flex-row bg-white gap-3 rounded-lg items-center border border-gray-200 p-2 md:py-0 ${className}`}
    >
      {/* Job Title Input */}
      <div className="relative w-full md:w-1/2 rounded-lg">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
        <input
          value={searchValues.title}
          onChange={(e) => UpdateSearch("title", e.target.value)}
          type="text"
          placeholder="Job Title"
          className="w-full pl-12 p-3 outline-0 rounded-lg border-1 md:border-none"
        />
      </div>

      {/* Location Input */}
      <div className="relative w-full md:w-1/2 rounded-lg">
        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
        <input
          value={searchValues.location}
          onChange={(e) => UpdateSearch("location", e.target.value)}
          type="text"
          placeholder="Location"
          className="w-full pl-12 p-3 outline-0 rounded-lg border-gray-200 border-1 md:border-none"
        />
      </div>
      <Button
        className="px-10 bg-sky-600 hover:bg-sky-700 w-full md:max-w-40"
        onClick={() => {
          onSearch(searchValues.title, searchValues.location);
        }}
      >
        Search
      </Button>
    </div>
  );
};

export default JobSearch;
