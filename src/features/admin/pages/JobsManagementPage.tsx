import { useState } from "react";
import { FiltersBar } from "../jobs/components/FiltersBar";
import JobHeader from "../jobs/components/JobHeader";
import type { JobFilters } from "../jobs/jobsType";
import { JobsTable } from "../jobs/components/JobsTable";
import { fetchAdminJobs } from "../jobs/jobsApi";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "@/hooks/use-debounce";

export default function JobsManagementPage() {
  const [searchterm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<JobFilters>({
    status: [],
    categories: [],
    companies: [],
    locations: [],
    datePosted: {
      from: undefined,
      to: undefined,
    },
  });

  // selected jobs
  const [selected, setSelected] = useState<number[]>([]);

  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(searchterm, 400);

  const { data, isLoading, error } = useQuery({
    queryKey: ["adminJobs", page, filters, debouncedSearch],
    queryFn: () => fetchAdminJobs(page, debouncedSearch, filters),
  });

  const handleSelectJob = (id: number) => {
    if (selected.includes(id))
      setSelected([...selected.filter((jobId) => jobId != id)]);
    else setSelected([...selected, id]);
  };

  const handleSelectAll = () => {
    if (selected.length === data?.data.length) setSelected([]);
    else {
      const newSelected = data?.data.map((job) => job.id) ?? [];
      setSelected([...newSelected]);
    }
  };

  const handleClearFilters = () => {
    setFilters({
      status: [],
      categories: [],
      companies: [],
      locations: [],
      datePosted: undefined
    });
  };
  return (
    <div className="space-y-6">
      <JobHeader onCreate={() => console.log("")} />
      <FiltersBar
        searchQuery={searchterm}
        onSearchChange={setSearchTerm}
        filters={filters}
        onFiltersChange={setFilters}
        onClearFilters={handleClearFilters}
      />
      <JobsTable
        jobs={data?.data ?? []}
        selectedJobs={selected}
        onJobSelect={handleSelectJob}
        onSelectAll={handleSelectAll}
        onJobAction={() => console.log("")}
        onSort={(field) => console.log(field)}
        sortBy="id"
        sortOrder="asc"
        pagination={data?.pagination ?? null}
        onPageChange={(page) => setPage(page)}
        loading={isLoading}
        error={error?.message}
      />
    </div>
  );
}
