import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { selectHasNextPage } from "@/features/jobs/jobSlice";
import type { RootState } from "@/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface CustomPaginationProps {
  onChange: (page) => void;
}
export default function CustomPagination({ onChange }: CustomPaginationProps) {
  const [selectedPage, setSelectedPage] = useState(1);
  const hasNextPage = useSelector(selectHasNextPage);
  const currentPage = useSelector(
    (state: RootState) => state.jobReducer.currentPage
  );

  useEffect(() => {
    setSelectedPage(currentPage);
  }, [currentPage]);
  
  function handlePrevious() {
    if (selectedPage !== 1) {
      const prevPage = selectedPage - 1;
      setSelectedPage(prevPage);
      onChange(prevPage);
    }
  }

  function handleSelectPage(page: number) {
    if (page !== selectedPage && page > selectedPage) {
      if (hasNextPage) {
        setSelectedPage(page);
        onChange(page);
      }
    } else if (page !== selectedPage && page < selectedPage) {
      setSelectedPage(page);
      onChange(page);
    }
  }

  function handleNext() {
    if (hasNextPage) {
      const nextPage = selectedPage + 1;
      setSelectedPage(nextPage);
      onChange(nextPage);
    }
  }
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem onClick={handlePrevious} className="cursor-pointer">
          <PaginationPrevious />
        </PaginationItem>
        {selectedPage === 1 ? (
          <>
            <PaginationItem>
              <PaginationLink
                isActive
                onClick={() => handleSelectPage(selectedPage)}
              >
                {selectedPage}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={() => handleSelectPage(selectedPage + 1)}
              >
                {selectedPage + 1}
              </PaginationLink>
            </PaginationItem>
          </>
        ) : (
          <>
            <PaginationItem>
              <PaginationLink
                onClick={() => handleSelectPage(selectedPage - 1)}
              >
                {selectedPage - 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                isActive
                onClick={() => handleSelectPage(selectedPage)}
              >
                {selectedPage}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem onClick={handleNext} className="cursor-pointer">
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
