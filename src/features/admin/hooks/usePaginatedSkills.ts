import { useEffect, useRef, useState } from "react";
import type { Option } from "../jobs/jobsType";
import { fetchSkillsSummary } from "../skills/skillsApi";

export function usePaginatedSkills(pageSize = 10) {
  const [skills, setSkills] = useState<Option[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const hasFetchedInitial = useRef(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const response = await fetchSkillsSummary(page, pageSize);

      setSkills((prev) => Array.from(new Set([...prev, ...response.data])));
      setHasMore(response.hasNextPage);
      setLoading(false);
    };

    if (!hasFetchedInitial.current || page > 1) {
      fetchCategories();
      hasFetchedInitial.current = true;
    }
  }, [page, pageSize]);

  return {
    skills,
    setSkills,
    loading,
    hasMore,
    loadMore: () => setPage((p) => p + 1),
  };
}
