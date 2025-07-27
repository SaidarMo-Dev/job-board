import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TablePagination() {
  return (
    <div className="flex justify-between items-center border-t-1 border-t-gray-300/80 dark:border-t-secondary py-3 px-6">
      <div className="text-gray-600 text-sm dark:text-secondary-foreground">
        Showing 1 to 9 of 9 results
      </div>
      <div className="space-x-3">
        <Button variant="outline">
          <ChevronLeft /> Previews
        </Button>
        <span className="text-gray-600 dark:text-gray-300">Page 1 of 22</span>
        <Button variant="outline">
          Next
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
