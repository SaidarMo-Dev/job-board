import { MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";

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
    <div className={`max-w-3xl ${className}`}>
      <div className="flex flex-col md:flex-row gap-3 bg-slate-50 dark:bg-slate-800 p-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs">
        {/* Job Title Input */}
        <div className="flex-1 flex items-center px-3 border-r-0 md:border-r border-slate-200 dark:border-slate-700">
          <Search className="w-5 h-5 text-slate-400 mr-2 flex-shrink-0" />

          <Input
            value={searchValues.title}
            onChange={(e) => UpdateSearch("title", e.target.value)}
            placeholder="Job title, keywords, or company"
            className="w-full bg-transparent shadow-none border-none focus:ring-0 text-sm py-2 placeholder-slate-400 focus-visible:ring-0"
            type="text"
          />
        </div>

        {/* Location Input */}
        <div className="flex-1 flex items-center px-3">
          <MapPin className="w-5 h-5 text-slate-400 mr-2 flex-shrink-0" />
          <Input
            value={searchValues.location}
            onChange={(e) => UpdateSearch("location", e.target.value)}
            placeholder="City, state, or remote"
            className="w-full bg-transparent shadow-none border-none focus:ring-0 text-sm py-2 placeholder-slate-400 focus-visible:ring-0"
            type="text"
            aria-label="Location"
          />
        </div>

        {/* Search Button */}
        <Button
          onClick={() => {
            onSearch(searchValues.title, searchValues.location);
          }}
          className="bg-primary hover:bg-primary-hover text-white px-8 py-2.5 rounded-lg text-sm font-bold transition-all shadow-sm whitespace-nowrap cursor-pointer"
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default JobSearch;
