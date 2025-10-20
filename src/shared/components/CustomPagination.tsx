import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { PaginationInfo } from "@/features/admin/users/usersTypes";

interface CustomPaginationProps {
  pagination?: PaginationInfo;
  onChange: (page: number) => void;
}

export default function CustomPagination({
  onChange,
  pagination,
}: CustomPaginationProps) {
  if (!pagination) return null;
  if (pagination.totalRecords < pagination.pageSize) return null;

  const { currentPage, totalPages, hasNextPage } = pagination;

  function handlePrevious() {
    if (currentPage > 1) onChange(currentPage - 1);
    console.log(currentPage);
  }

  function handleNext() {
    if (hasNextPage) onChange(currentPage + 1);
  }

  // Show a range of pages around current
  const pageNumbers: number[] = [];
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);

  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination>
      <PaginationContent>
        {/* Prev button */}
        <PaginationItem
          onClick={currentPage > 1 ? handlePrevious : undefined}
          className={`cursor-pointer ${
            currentPage === 1 ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <PaginationPrevious />
        </PaginationItem>

        {/* First page */}
        {start > 1 && (
          <>
            <PaginationItem>
              <PaginationLink onClick={() => onChange(1)}>1</PaginationLink>
            </PaginationItem>
            {start > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        {/* Dynamic range */}
        {pageNumbers.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={page === currentPage}
              onClick={() => onChange(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Last page */}
        {end < totalPages && (
          <>
            {end < totalPages - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink onClick={() => onChange(totalPages)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {/* Next button */}
        <PaginationItem
          onClick={hasNextPage ? handleNext : undefined}
          className={`cursor-pointer ${
            !hasNextPage ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
