import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router";
import useDebounce from "@/hooks/use-debounce";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { fetchSkillsThunk } from "../skills/skillsThunk";
import type { SortSkill } from "../skills/skillsTypes";

export function useSkillsFilters() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("Search") ?? ""
  );
  const [sort, setSort] = useState<SortSkill>(
    (searchParams.get("SortBy") as SortSkill) || "CreateDate"
  );
  const [page, setPage] = useState(Number(searchParams.get("Page")) || 1);

  const debouncedSearch = useDebounce(searchTerm, 500);

  // Build params for URL
  const buildParams = useCallback(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set("Search", debouncedSearch);
    if (sort !== "CreateDate") params.set("SortBy", sort);
    if (page > 1) params.set("Page", page.toString());
    return params;
  }, [debouncedSearch, sort, page]);

  // Sync URL
  useEffect(() => {
    setSearchParams(buildParams());
  }, [buildParams, setSearchParams]);

  // Fetch data
  useEffect(() => {
    dispatch(
      fetchSkillsThunk({ page, size: 10, search: debouncedSearch, sort })
    );
  }, [dispatch, page, debouncedSearch, sort]);

  return {
    searchTerm,
    setSearchTerm,
    sort,
    setSort,
    page,
    setPage,
  };
}
