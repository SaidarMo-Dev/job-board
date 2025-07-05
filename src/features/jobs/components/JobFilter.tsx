import { Filter } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

import { useState } from "react";
import { type FilterValues, type JobFilterProps } from "../jobTypes";
import { JobTypeFilter } from "./JobTypeFilter";
import { ExperienceLevelFilter } from "./ExperienceLevelFilter";
import { SalaryRangeFilter } from "./SalaryRangeFlter";

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
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl font-bold">
          <Filter className="w-4 h-4" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Job type filter */}
        <JobTypeFilter onSelect={(value) => updateFilters("jobType", value)} />
        {/* Experience level */}
        <ExperienceLevelFilter
          onSelect={(value) => updateFilters("experienceLevel", value)}
        />
        {/* Salary range */}
        {/* TODO : Handle salary range and send it as params */}
        <SalaryRangeFilter onSelect={(value) => console.log(value)} />
      </CardContent>
    </Card>
  );
}
