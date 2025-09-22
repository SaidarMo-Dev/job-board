import { useEffect, useRef, useState } from "react";
import type { Option } from "../jobs/jobsType";
import { fetchCategoriesSummary } from "../categories/categoryApi";

export function usePaginatedCategories(pageSize = 10) {
  const [categories, setCategories] = useState<Option[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const hasFetchedInitial = useRef(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const response = await fetchCategoriesSummary(page, pageSize);

      setCategories((prev) => Array.from(new Set([...prev, ...response.data])));
      setHasMore(response.hasNextPage);
      setLoading(false);
    };

    if (!hasFetchedInitial.current || page > 1) {
      fetchCategories();
      hasFetchedInitial.current = true;
    }
  }, [page, pageSize]);

  return {
    categories,
    loading,
    hasMore,
    loadMore: () => setPage((p) => p + 1),
    setCategories,
  };
}
