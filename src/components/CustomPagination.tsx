import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useState } from "react";

interface CustomPaginationProps {
  hasNextPage: boolean;
  onChange: (page) => void;
}
export default function CustomPagination({
  onChange,
  hasNextPage,
}: CustomPaginationProps) {
  const [selectedPage, setSelectedPage] = useState(1);

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
