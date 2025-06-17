import { Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";

export default function JobFilter() {
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [jobExperienceFilter, setJobExperienceFilter] = useState("");
  const [jobSalaryFilter, setJobSalaryFilter] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl font-bold">
          <Filter className="w-4 h-4" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Job type filter */}
        <div>
          <label className="text-sm block mb-2 font-medium" htmlFor="">
            Job Type
          </label>
          <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Full-time">Full-time</SelectItem>
              <SelectItem value="Part-time">Part-time</SelectItem>
              <SelectItem value="Contract">Contract</SelectItem>
              <SelectItem value="Freelance">Freelance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Experience level */}
        <div>
          <label htmlFor="" className="text-sm block mb-2 font-medium">
            Experience level
          </label>
          <Select
            value={jobExperienceFilter}
            onValueChange={setJobExperienceFilter}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Senior Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Entry Level">Entry Level</SelectItem>
              <SelectItem value="Mid Level">Mid Level</SelectItem>
              <SelectItem value="Senior Level">Senior Level</SelectItem>
              <SelectItem value="Lead/Principal">Lead/Principal</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Salary range */}
        <div>
          <label htmlFor="" className="text-sm block mb-2 font-meduim">
            Salary Range
          </label>
          <Select value={jobSalaryFilter} onValueChange={setJobSalaryFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Any Salaray" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="$0 - $50k">$0 - $50k</SelectItem>
              <SelectItem value="$50k - $100k">$50k - $100k</SelectItem>
              <SelectItem value="$100k - $150k">$100k - $150k</SelectItem>
              <SelectItem value="$150k+">$150k+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
