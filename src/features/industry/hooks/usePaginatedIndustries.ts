import { useEffect, useRef, useState } from "react";
import type { Industry } from "../industryTypes";
import { fetchPaginatedIndustries } from "../industryApi";

export function usePaginatedIndustries(pageSize = 10) {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const hasFetchedInitial = useRef(false);

  useEffect(() => {
    const getIndustries = async () => {
      setLoading(true);
      const response = await fetchPaginatedIndustries(page, pageSize);

      // Merge unique items
      setIndustries((prev) => Array.from(new Set([...prev, ...response.data])));
      setHasMore(response.hasNextPage);
      setLoading(false);
    };

    if (!hasFetchedInitial.current || page > 1) {
      getIndustries();
      hasFetchedInitial.current = true;
    }
  }, [page, pageSize]);

  return {
    industries,
    loading,
    hasMore,
    loadMore: () => setPage((p) => p + 1),
    setIndustries,
  };
}
