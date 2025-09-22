import { useEffect, useRef, useState } from "react";
import type { CompanyOption } from "../jobs/jobsType";
import { fetchCompaniesSummary } from "../companies/companyApi";

export function usePaginatedCompanies(pageSize = 10) {
  const [companies, setCompanies] = useState<CompanyOption[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const hasFetchedInitial = useRef(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      const response = await fetchCompaniesSummary(page, pageSize);

      setCompanies((prev) => Array.from(new Set([...prev, ...response.data])));
      setHasMore(response.hasNextPage);
      setLoading(false);
    };

    if (!hasFetchedInitial.current || page > 1) {
      fetchCompanies();
      hasFetchedInitial.current = true;
    }
  }, [page, pageSize]);

  return {
    companies,
    loading,
    hasMore,
    loadMore: () => setPage((p) => p + 1),
    setCompanies,
  };
}
