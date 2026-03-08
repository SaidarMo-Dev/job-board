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
    <>
      <div
        className={`flex w-full max-w-2xl flex-col gap-3 rounded-xl 
          border border-border bg-card p-3 shadow-lg sm:flex-row 
          sm:items-center ${className}`}
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchValues.title}
            onChange={(e) => UpdateSearch("title", e.target.value)}
            placeholder="Job title or keyword"
            className="border-0 bg-transparent pl-9 shadow-none focus-visible:ring-0"
            aria-label="Job title or keyword"
          />
        </div>
        <div
          className="hidden h-8 w-px bg-border sm:block"
          aria-hidden="true"
        />
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchValues.location}
            onChange={(e) => UpdateSearch("location", e.target.value)}
            placeholder="Location"
            className="border-0 bg-transparent pl-9 shadow-none focus-visible:ring-0"
            aria-label="Location"
          />
        </div>
        <Button
          size="lg"
          className="w-full sm:w-auto"
          onClick={() => {
            onSearch(searchValues.title, searchValues.location);
          }}
        >
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>
      
    </>
  );
};

export default JobSearch;
