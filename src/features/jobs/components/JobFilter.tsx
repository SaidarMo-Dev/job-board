import { Filter } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import type { FilterValues, JobFilterProps } from "../jobTypes";

export default function JobFilter({ onChange }: JobFilterProps) {
  const [filters, setFilters] = useState<FilterValues>({
    jobType: "",
    experienceLevel: "",
    salaryRange: "",
  });

  function updateFilters(
    key: "jobType" | "experienceLevel" | "salaryRange",
    value: string | undefined
  ) {
    const newFilters = { ...filters, [key]: value ?? "" };
    setFilters(newFilters);
    onChange(newFilters);
  }
  return (
    <Card className="w-full lg:w-68">
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
          <Select
            value={filters.jobType}
            onValueChange={(value) => updateFilters("jobType", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">All Types</SelectItem>
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
            value={filters.experienceLevel ?? ""}
            onValueChange={(value) => updateFilters("experienceLevel", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Any Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Level</SelectItem>
              <SelectItem value="Entry Level">Entry Level</SelectItem>
              <SelectItem value="Mid Level">Mid Level</SelectItem>
              <SelectItem value="Senior Level">Senior Level</SelectItem>
              <SelectItem value="Lead/Principal">Lead/Principal</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Salary range */}
        <div>
          <label htmlFor="" className="text-sm block mb-2 font-medium">
            Salary Range
          </label>
          <Select
            value={filters.salaryRange ?? ""}
            onValueChange={(value) => updateFilters("salaryRange", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Any Salary" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Salary</SelectItem>
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
