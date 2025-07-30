import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PaginationInfo } from "../usersTypes";

interface TablePaginationProps {
  paginationInfo: PaginationInfo;
  onPageChange?: (page: number) => void;
}

export default function TablePagination({
  paginationInfo,
  onPageChange,
}: TablePaginationProps) {
  const handleNextPage = () => {
    if (paginationInfo.hasNextPage && onPageChange) {
      onPageChange(paginationInfo.currentPage + 1);
    }
  };
  const handlePreviewsPage = () => {
    if (paginationInfo.currentPage != 1 && onPageChange)
      onPageChange(paginationInfo.currentPage - 1);
  };

  return (
    <div className="flex justify-between items-center border-t-1 border-t-gray-300/80 dark:border-t-secondary py-3 px-6">
      <div className="text-gray-600 text-sm dark:text-secondary-foreground">
        Showing {paginationInfo.currentPage} to {paginationInfo.totalPages} of{" "}
        {paginationInfo.totalPages} results
      </div>
      <div className="space-x-3">
        <Button
          variant="outline"
          disabled={paginationInfo.currentPage == 1}
          onClick={handlePreviewsPage}
        >
          <ChevronLeft /> Previews
        </Button>
        <span className="text-gray-600 dark:text-gray-300">
          Page {paginationInfo.currentPage} of {paginationInfo.totalPages}
        </span>
        <Button
          variant="outline"
          onClick={handleNextPage}
          disabled={!paginationInfo.hasNextPage}
        >
          Next
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
