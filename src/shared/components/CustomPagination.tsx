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

  const isPrevDisabled = currentPage === 1;

  const isNextDisabled = !hasNextPage;

  const controlClass = (disabled: boolean) => `
  cursor-pointer
  text-primary
  hover:text-primary-hover
  rounded-md px-2
  ${disabled ? "pointer-events-none opacity-50 text-primary-300" : ""}
`;
  return (
    <Pagination>
      <PaginationContent>
        {/* Prev */}
        <PaginationItem
          onClick={!isPrevDisabled ? handlePrevious : undefined}
          className={controlClass(isPrevDisabled)}
          aria-disabled={isPrevDisabled}
          tabIndex={isPrevDisabled ? -1 : 0}
        >
          <PaginationPrevious
            className="
          text-primary
          disabled:text-primary-300
          hover:text-primary-hover
        "
          />
        </PaginationItem>

        {/* First page */}
        {start > 1 && (
          <>
            <PaginationItem>
              <PaginationLink
                onClick={() => onChange(1)}
                className="text-primary hover:bg-primary-100"
              >
                1
              </PaginationLink>
            </PaginationItem>

            {start > 2 && (
              <PaginationItem>
                <PaginationEllipsis className="text-primary-400" />
              </PaginationItem>
            )}
          </>
        )}

        {/* Pages */}
        {pageNumbers.map((page) => {
          const isActive = page === currentPage;

          return (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => onChange(page)}
                isActive={isActive}
                className={`
              transition-colors
              ${isActive ? "bg-primary text-white  hover:text-white hover:bg-primary-hover" : ""}
            `}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

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

        {/* Next */}
        <PaginationItem
          onClick={!isNextDisabled ? handleNext : undefined}
          className={controlClass(isNextDisabled)}
        >
          <PaginationNext
            className="
          text-primary
          hover:text-primary-hover
          disabled:text-primary-300
        "
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
