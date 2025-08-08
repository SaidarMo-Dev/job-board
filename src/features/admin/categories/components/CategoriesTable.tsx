import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import type { CategoryManagement } from "../categoryTypes";
import { formatDescription } from "@/utils/formatDescription";
import { useAppSelector } from "@/hooks/useAppSelector";
import TablePagination from "../../users/components/TablePagination";

interface CategoriesTableProps {
  categories: CategoryManagement[] | null;
  searchTerm: string;
  onEditCategory: (category: CategoryManagement) => void;
  onDeleteCategory: (category: CategoryManagement) => void;
  onPageChange: (page: number) => void;
  onShowInfoCategory: (category: CategoryManagement) => void;
}

export default function CategoriesTable({
  categories,
  searchTerm,
  onEditCategory,
  onDeleteCategory,
  onPageChange,
  onShowInfoCategory,
}: CategoriesTableProps) {
  const paginationInfo = useAppSelector(
    (state) => state.adminCategoriesReducer.pagination
  );
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Create Date</TableHead>

            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!categories || categories.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                <div className="text-muted-foreground">
                  {searchTerm
                    ? "No categories found matching your search."
                    : "No categories found."}
                </div>
              </TableCell>
            </TableRow>
          ) : (
            categories.map((category) => (
              <TableRow key={category.categoryId}>
                <TableCell className="font-medium">
                  #{category.categoryId}
                </TableCell>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell className="max-w-[300px] truncate">
                  {formatDescription(category.description)}
                </TableCell>
                <TableCell>{category.createDate}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => onShowInfoCategory(category)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          onEditCategory(category);
                        }}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDeleteCategory(category)}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <TablePagination
        paginationInfo={paginationInfo}
        onPageChange={onPageChange}
      />
    </div>
  );
}
