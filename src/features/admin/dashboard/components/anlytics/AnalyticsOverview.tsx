import { GeographicDistribution } from "./GeographicDistribution";
import JobCategoriesChart from "./JobCategoriesChart";
import { TopCompaniesTable } from "./TopCompanies";

export function AnalyticsOverview() {
  return (
    <div className="mt-6 space-y-6">
      <JobCategoriesChart />
      <div className="grid grid-cols-2 gap-6">
        <TopCompaniesTable />
        <GeographicDistribution />
      </div>

    </div>
  );
}
