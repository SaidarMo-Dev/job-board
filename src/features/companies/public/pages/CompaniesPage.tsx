import { CompanyHero } from "../components/CompanyHero";
import { Briefcase, Building2, LayoutGrid } from "lucide-react";
import { StatCard } from "../components/CompanyStatsCard";
import { FeaturedCard } from "../components/FeaturedCard";
import { FiltersSidebar } from "../components/CompanyFiltersSideBar";
import { GenericSelect } from "@/shared/components/GenericSelect";
import { CompanyCard } from "../components/CompanyCard";
import CustomPagination from "@/shared/components/CustomPagination";
import { useQuery } from "@tanstack/react-query";
import {
  fetchCompanies,
  fetchCompanyStats,
  fetchFeaturedCompanies,
} from "../../CompaniesApi";
import { DEFAULT_PAGE_SIZE } from "@/constants/config";
import type { PaginationInfo } from "@/features/admin/users/usersTypes";
import Loader from "@/components/Loaders/Loader";
import EmptyState from "@/shared/components/EmptyState";
import { useCompaniesFilters } from "../../hooks/useCompaniesFilter";
import { COMPANY_SORT_BY_OPTIONS } from "../../shared/types/companyEnums";

export default function CompaniesPage() {
  const {
    search,
    setSearch,
    searchDebounce,
    currentPage,
    setCurrentPage,
    sortBy,
    setSortBy,
    filters,
    setFilters,
    debouncedFilters,
  } = useCompaniesFilters();

  const { data: companyStats } = useQuery({
    queryKey: ["companyStats"],
    queryFn: () => fetchCompanyStats(),
  });

  const { data: featuredCompanies } = useQuery({
    queryKey: ["featuredCompanies"],
    queryFn: () => fetchFeaturedCompanies(),
  });

  const { data: companies, isFetching } = useQuery({
    queryKey: [
      "companies",
      currentPage,
      sortBy,
      debouncedFilters.location,
      debouncedFilters.companySize,
      debouncedFilters.industries,
      searchDebounce,
    ],
    queryFn: () =>
      fetchCompanies(
        currentPage,
        searchDebounce,
        DEFAULT_PAGE_SIZE,
        {
          location: debouncedFilters.location,
          companySize: debouncedFilters.companySize,
          industries: debouncedFilters.industries,
        },
        sortBy,
      ),
  });

  const pagination: PaginationInfo | undefined = companies
    ? {
        currentPage: companies?.currentPage,
        totalPages: companies?.totalPages,
        totalRecords: companies.totalRecords,
        hasNextPage: companies.hasNextPage,
        hasPreviousPage: companies.hasPreviusPage,
        pageSize: companies.pageSize,
      }
    : undefined;
  return (
    <div className="min-h-screen bg-background">
      <CompanyHero search={search} onChange={setSearch} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: Building2,
              label: "Total Companies",
              value: companyStats?.totalCompanies?.toString() || "0",
            },
            {
              icon: Briefcase,
              label: "Open Positions",
              value: companyStats?.totalOpenJobs?.toString() || "0",
            },
            {
              icon: LayoutGrid,
              label: "Industries Covered",
              value: companyStats?.totalIndustries?.toString() || "0",
            },
          ].map((stat) => (
            <StatCard
              key={stat.label}
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
            />
          ))}
        </div>

        {/* Featured Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              Featured Companies
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCompanies?.data.map((company) => (
              <FeaturedCard key={company.companyId} company={company} />
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          <FiltersSidebar
            companyFilters={filters}
            onFiltersChange={setFilters}
          />

          <div className="flex-1">
            {/* Sorting & View Options */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
              <p className="text-muted-foreground font-medium">
                Showing{" "}
                <span className="text-foreground">
                  {companies?.data?.length || 0}
                </span>{" "}
                of{" "}
                <span className="text-foreground">
                  {companies?.totalRecords}
                </span>{" "}
                companies
              </p>
              <div className="flex items-center gap-3">
                <GenericSelect
                  label="Sort by"
                  variant="ghost"
                  value={sortBy}
                  onChange={setSortBy}
                  options={COMPANY_SORT_BY_OPTIONS}
                />
              </div>
            </div>

            {isFetching ? (
              /* 1. Loading State: Full screen center */
              <div className="h-screen flex items-center justify-center">
                <Loader variant="spinner" size="sm" />
              </div>
            ) : companies?.data && companies?.data?.length > 0 ? (
              /* 2. Success State: Show the grid */
              <div className="grid grid-cols-1 gap-6">
                {companies.data.map((company) => (
                  <CompanyCard key={company.companyId} company={company} />
                ))}
              </div>
            ) : (
              /* 3. Empty State: No data returned */
              <EmptyState message="No companies found matching your criteria." />
            )}

            {/* Companies pagination */}
            <CustomPagination
              pagination={pagination}
              onChange={setCurrentPage}
            />
          </div>
        </div>
      </main>

      {/* Footer Space */}
      <div className="h-20" />
    </div>
  );
}
