import { useEffect, useState } from "react";
import JobSearch from "../features/jobs/components/JobSearch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import JobCardFull from "../features/jobs/components/JobCardFull";
import { useSearchParams } from "react-router";
import {
  SortJobsBy,
  type ExperienceLevelTypekey,
  type FilterValues,
  type JobQuickFilters,
  type JobTypeKey,
} from "@/features/jobs/jobTypes";
import type { RootState } from "@/store";
import { fetchJobsThunk } from "@/features/jobs/jobThunk";
import CustomPagination from "@/components/CustomPagination";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { NoJobs } from "@/features/jobs/components/NoJobs";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getSavedJobIdsThunk } from "@/features/bookmarks/bookmarksThunk";
import PageLoader from "@/components/Loaders/PageLoader";
import { useAppSelector } from "@/hooks/useAppSelector";
import QuickFilters from "@/features/jobs/components/QuickFilters";

export default function JobsPage() {
  const [filters, setFilters] = useState<JobQuickFilters>({
    jobTypes: [] as JobTypeKey[],
    experienceLevels: [] as ExperienceLevelTypekey[],
    popularCompanies: [] as string[],
    popularCategories: [] as string[],
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const currentUserId = useSelector(selectCurrentUser)?.id ?? -1;
  const isAuthenticated = useAppSelector(
    (state) => state.authReducer.isAuthenticated
  );

  const { jobs, loading } = useSelector((state: RootState) => state.jobReducer);
  const dispatch = useAppDispatch();
  const hasNextPage = useAppSelector((state) => state.jobReducer.hasNextPage);

  function updateFilter(filters: FilterValues) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("pageNumber", "1");
    // job type params

    if (filters.jobType === "Any" || !filters.jobType) {
      params.delete("jobType");
    } else {
      params.set("jobType", filters.jobType);
    }

    // experience level params
    if (filters.experienceLevel === "Any" || !filters.experienceLevel) {
      params.delete("experienceLevel");
    } else {
      params.set("experienceLevel", filters.experienceLevel);
    }

    // salary range params
    if (!filters.salaryRange || filters.salaryRange === "Any") {
      params.delete("salaryRange");
    } else {
      params.set("salaryRange", filters.salaryRange);
    }

    setSearchParams(params);
  }

  function UpdateSearch(title?: string, location?: string) {
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
  }

  function UpdatePageNumber(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    if (page > 0) {
      params.set("pageNumber", page.toString());
      setSearchParams(params);
    }
  }

  function UpdateSort(sortBy: SortJobsBy) {
    const params = new URLSearchParams(searchParams.toString());
    if (sortBy) {
      params.set("SortBy", sortBy);
      setSearchParams(params);
    }
  }

  // refresh savedJobIds
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getSavedJobIdsThunk({ userId: currentUserId }));
    }
  }, [dispatch, currentUserId, isAuthenticated]);

  useEffect(() => {
    dispatch(fetchJobsThunk({ params: searchParams.toString() })).then(
      (result) => {
        if (fetchJobsThunk.rejected.match(result)) {
          toast.error(result.payload ?? "Something went wrong!");
        }
      }
    );
  }, [dispatch, searchParams]);

  const clearFilters = () => {
    setFilters({
      jobTypes: [],
      experienceLevels: [],
      popularCompanies: [],
      popularCategories: [],
    });
  };
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
            {loading ? (
              <PageLoader message="loading jobs..." />
            ) : (
              <div className="">
                <div className="mt-5 grid grid-cols-1 gap-5">
                  {jobs ? (
                    jobs.map((job) => {
                      return <JobCardFull key={job.jobId} jobInfo={job} />;
                    })
                  ) : (
                    <NoJobs />
                  )}
                </div>
                <div className="flex justify-center my-5">
                  <CustomPagination
                    hasNextPage={hasNextPage}
                    onChange={(page) => UpdatePageNumber(page)}
                  />
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
