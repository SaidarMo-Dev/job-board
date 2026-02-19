import ApplicantInfoCard from "./ApplicantInfoCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SortApplicantsBy,
  type SortApplicantsKeys,
} from "../types/SortApplicantsBy";
import {
  FilterApplicants,
  type FilterApplicantsKey,
} from "../types/FilterApplicants";
import { useQuery } from "@tanstack/react-query";
import { getJobApplicants } from "@/features/jobs/jobApi";
import Loader from "@/components/Loaders/Loader";
import { useEffect, useState } from "react";
import CustomPagination from "./CustomPagination";
import { DEFAULT_PAGE_SIZE } from "@/constants/config";

export function JobApplicantsTab({ jobId }: { jobId: number }) {
  const [filter, setFilter] = useState<FilterApplicantsKey>("All");
  const [sort, setSort] = useState<SortApplicantsKeys>("Name");
  const [page, setPage] = useState(1);

  const { data: applicants, isLoading } = useQuery({
    queryKey: ["jobApplicants", jobId, page, filter, sort],
    queryFn: () => getJobApplicants(jobId, page, filter, sort),
    enabled: !!jobId, // safety
  });

  // Reset page when filter or sort changes
  useEffect(() => {
    setPage(1);
  }, [filter, sort]);

  // Full loader only on first load
  if (isLoading && !applicants) {
    return (
      <div className="p-6 flex items-center justify-center flex-col gap-2">
        <Loader variant="spinner" size="sm" />
        <span className="text-gray-500">Loading applicants...</span>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Applicants
          <span className="text-muted-foreground">
            ({applicants?.data?.length ?? 0})
          </span>
        </h3>

        {/* Pagination */}
        <CustomPagination
          onChange={(page) => setPage(page)}
          pagination={
            applicants
              ? {
                  pageSize: DEFAULT_PAGE_SIZE,
                  totalPages: applicants.totalPages,
                  hasPreviousPage: applicants.hasPreviusPage,
                  currentPage: page,
                  hasNextPage: applicants.hasNextPage,
                  totalRecords: applicants.totalRecords,
                }
              : undefined
          }
        />
        <div className="flex gap-2">
          {/* Filter  */}
          <Select
            value={filter}
            onValueChange={(value) => setFilter(value as FilterApplicantsKey)}
          >
            <SelectTrigger className="w-50">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(FilterApplicants).map((key) => (
                <SelectItem key={key} value={key}>
                  {FilterApplicants[key as FilterApplicantsKey]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort  */}
          <Select
            value={sort}
            onValueChange={(value) => setSort(value as SortApplicantsKeys)}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(SortApplicantsBy).map((key) => (
                <SelectItem key={key} value={key}>
                  {SortApplicantsBy[key as SortApplicantsKeys]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Applicants List */}
      <div className="space-y-3">
        {applicants?.data ? (
          applicants.data.map((applicant) => (
            <ApplicantInfoCard applicant={applicant} jobId={jobId} />
          ))
        ) : (
          <span>No Applicants</span>
        )}
      </div>
    </div>
  );
}
