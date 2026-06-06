import { useCallback, useEffect, useMemo, useState } from "react";
import JobSearch from "../features/jobs/components/JobSearch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useSearchParams } from "react-router";
import {
  SortJobsBy,
  type ExperienceLevelTypekey,
  type JobQuickFilters,
  type JobResponse,
  type JobTypeKey,
} from "@/features/jobs/jobTypes";
import CustomPagination from "@/shared/components/CustomPagination";
import { NoJobs } from "@/features/jobs/components/NoJobs";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getSavedJobIdsThunk } from "@/features/bookmarks/bookmarksThunk";
import { useAppSelector } from "@/hooks/useAppSelector";
import QuickFilters from "@/features/jobs/components/QuickFilters";
import { useQuery } from "@tanstack/react-query";
import { fetchJobs } from "@/features/jobs/jobApi";
import { capitalizeFirstLetter } from "@/features/admin/utils/capitalizeFirstLetter";
import JobDetailsModal from "@/features/jobs/components/JobDetailsModal";
import { DEFAULT_PAGE_SIZE } from "@/constants/config";
import InlineJobCard from "@/shared/components/InlineJobCard";
import InlineJobCardSkeleton from "@/shared/components/InlineJobCardSkeleton";

export default function JobsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const [selectedJob, setSelectedJob] = useState<JobResponse | null>(null);

  const filters = useMemo<JobQuickFilters>(
    () => ({
      jobTypes: searchParams.getAll("JobTypes") as JobTypeKey[],
      experienceLevels: searchParams.getAll(
        "ExperienceLevels",
      ) as ExperienceLevelTypekey[],
      popularCompanies: searchParams.getAll("PopularCompanies"),
      popularCategories: searchParams.getAll("PopularCategories"),
    }),
    [searchParams],
  );

  const setFilters = useCallback(
    (filters: JobQuickFilters) => {
      const params = new URLSearchParams();

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (Array.isArray(value))
            value.forEach((val) =>
              params.append(capitalizeFirstLetter(key), val),
            );
        });
      }

      setSearchParams(params);
    },
    [setSearchParams],
  );

  const currentUserId = useAppSelector(
    (state) => state.authReducer.currentUser?.id ?? -1,
  );

  const isAuthenticated = useAppSelector(
    (state) => state.authReducer.isAuthenticated,
  );

  const UpdateSearch = useCallback(
    (title?: string, location?: string) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set("pageNumber", "1");
      if (title) {
        params.set("searchByTitle", title);
      } else {
        params.delete("searchByTitle");
      }
      if (location) {
        params.set("searchByLocation", location);
      } else {
        params.delete("searchByLocation");
      }
      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  const UpdatePageNumber = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (page > 1) {
        params.set("pageNumber", page.toString());
        setSearchParams(params);
      } else {
        params.delete("pageNumber");
        setSearchParams(params);
      }
    },
    [searchParams, setSearchParams],
  );

  const [Sort, setSort] = useState<SortJobsBy>("HighestSalary");

  const UpdateSort = useCallback(
    (sortBy: SortJobsBy) => {
      setSort(sortBy);
      const params = new URLSearchParams(searchParams.toString());
      if (sortBy) {
        params.set("SortBy", sortBy);
        setSearchParams(params);
      }
    },
    [searchParams, setSearchParams],
  );

  // refresh savedJobIds
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getSavedJobIdsThunk({ userId: currentUserId }));
    }
  }, [dispatch, currentUserId, isAuthenticated]);

  const clearFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("JobTypes");
    params.delete("ExperienceLevels");
    params.delete("PopularCompanies");
    params.delete("PopularCategories");
    setSearchParams(params);
  }, [searchParams, setSearchParams]);

  // fetch jobs

  const query = useMemo(() => searchParams.toString(), [searchParams]);

  const { data, isLoading } = useQuery({
    queryKey: ["fetchJobs", query],
    queryFn: () => fetchJobs(query),
  });

  return (
    <>
      {/* hero section */}
      <div className="custom-container">
        <div className="my-7">
          <JobSearch
            title={searchParams.get("searchByTitle") ?? ""}
            location={searchParams.get("searchByLocation") ?? ""}
            onSearch={(title, location) => UpdateSearch(title, location)}
            className="max-w-full"
          />
          {/* TODO : Fetch popular positions */}
          <span className="block text-gray-500 mt-3 ml-1 font-medium text-xs ">
            Popular: FrontEnd Engineer, Product Designer, Data Scientist
          </span>
        </div>
      </div>
      <div className="bg-gray-50 border-t border-gray-200">
        {/* Jobs section */}
        <div className="custom-container">
          <div className="w-full flex flex-col py-7 gap-7 lg:flex-row">
            <aside className="lg:w-95 space-y-5 lg:sticky lg:top-20 lg:self-start max-h-[80vh] overflow-y-auto">
              <QuickFilters
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={clearFilters}
              />
            </aside>

            {/* Job listing */}
            <main className="w-full">
              <div className="flex justify-between">
                <h2 className="text-lg font-bold text-gray-600">
                  Showing {data?.pagination.totalRecords ?? 0} results
                </h2>

                {/* Sort */}
                <div className="flex gap-2 items-center text-gray-500">
                  <span className="font-medium text-sm">SORT BY:</span>
                  <Select
                    value={Sort}
                    onValueChange={(value) => UpdateSort(value as SortJobsBy)}
                  >
                    <SelectTrigger className="text-primary font-medium shadow-none bg-transparent border-none focus-visible:border-0 focus-visible:ring-0">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(SortJobsBy).map((key) => (
                        <SelectItem key={key} value={key}>
                          {SortJobsBy[key as SortJobsBy]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/* Jobs */}
              {isLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <InlineJobCardSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <div>
                  <div className="mt-5 space-y-3">
                    {data?.jobs ? (
                      data.jobs.map((job) => {
                        return (
                          <InlineJobCard
                            key={job.jobId}
                            job={job}
                            onShowDetails={setSelectedJob}
                          />
                        );
                      })
                    ) : (
                      <div className="col-span-2">
                        <NoJobs />
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center my-5">
                    {data?.jobs && data.jobs.length > DEFAULT_PAGE_SIZE && (
                      <CustomPagination
                        pagination={data?.pagination}
                        onChange={(page) => UpdatePageNumber(page)}
                      />
                    )}
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
        {/* Job Detail Modal */}
        {selectedJob && (
          <JobDetailsModal
            selectedJob={selectedJob}
            onClose={() => setSelectedJob(null)}
          />
        )}
      </div>
    </>
  );
}
