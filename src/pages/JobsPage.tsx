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
import CustomPagination from "@/components/CustomPagination";
import { NoJobs } from "@/features/jobs/components/NoJobs";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getSavedJobIdsThunk } from "@/features/bookmarks/bookmarksThunk";
import PageLoader from "@/components/Loaders/PageLoader";
import { useAppSelector } from "@/hooks/useAppSelector";
import QuickFilters from "@/features/jobs/components/QuickFilters";
import { useQuery } from "@tanstack/react-query";
import { fetchJobs } from "@/features/jobs/jobApi";
import { capitalizeFirstLetter } from "@/features/admin/utils/capitalizeFirstLetter";
import ModernJobCard from "@/features/jobs/components/ModernJobCard";
import JobDetailsModal from "@/features/jobs/components/JobDetailsModal";
import { DEFAULT_PAGE_SIZE } from "@/constants/config";

export default function JobsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const [selectedJob, setSelectedJob] = useState<JobResponse | null>(null);

  const filters = useMemo<JobQuickFilters>(
    () => ({
      jobTypes: searchParams.getAll("JobTypes") as JobTypeKey[],
      experienceLevels: searchParams.getAll(
        "ExperienceLevels"
      ) as ExperienceLevelTypekey[],
      popularCompanies: searchParams.getAll("PopularCompanies"),
      popularCategories: searchParams.getAll("PopularCategories"),
    }),
    [searchParams]
  );

  const setFilters = useCallback(
    (filters: JobQuickFilters) => {
      const params = new URLSearchParams();

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (Array.isArray(value))
            value.forEach((val) =>
              params.append(capitalizeFirstLetter(key), val)
            );
        });
      }

      setSearchParams(params);
    },
    [setSearchParams]
  );

  const currentUserId = useAppSelector(
    (state) => state.authReducer.currentUser?.id ?? -1
  );

  const isAuthenticated = useAppSelector(
    (state) => state.authReducer.isAuthenticated
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
    [searchParams, setSearchParams]
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
    [searchParams, setSearchParams]
  );

  const UpdateSort = useCallback(
    (sortBy: SortJobsBy) => {
      const params = new URLSearchParams(searchParams.toString());
      if (sortBy) {
        params.set("SortBy", sortBy);
        setSearchParams(params);
      }
    },
    [searchParams, setSearchParams]
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

  const { data, isLoading, error } = useQuery({
    queryKey: ["fetchJobs", query],
    queryFn: () => fetchJobs(query),
  });
  return (
    <div className="bg-gray-50">
      {/* hero section */}
      <div className="bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a] py-15">
        <div className="custom-container text-center">
          <h2 className="text-5xl font-bold text-white">Find Your Dream Job</h2>
          <h4 className="my-3 text-lg font-medium text-white">
            Discover opportunities from top companies around the world
          </h4>
          <div className="max-w-4xl m-auto mt-7">
            <JobSearch
              title={searchParams.get("searchByTitle") ?? ""}
              location={searchParams.get("searchByLocation") ?? ""}
              className="w-200"
              onSearch={(title, location) => UpdateSearch(title, location)}
            />
          </div>
        </div>
      </div>

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
              <h2 className="text-2xl font-bold">Jobs Found</h2>
              <Select
                onValueChange={(value) => UpdateSort(value as SortJobsBy)}
              >
                <SelectTrigger className="w-50 py-5">
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
            {/* Jobs */}
            {isLoading ? (
              <PageLoader message="loading jobs..." />
            ) : (
              <div className="">
                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                  {data?.jobs ? (
                    data.jobs.map((job) => {
                      return (
                        <ModernJobCard
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
  );
}
