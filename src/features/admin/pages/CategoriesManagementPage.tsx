import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router";
import { toast } from "react-toastify";

import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import useDebounce from "@/hooks/use-debounce";

import CategoriesFilter from "../categories/components/CategoriesFilters";
import CategoriesHeader from "../categories/components/CategoriesHeader";
import CategoriesTable from "../categories/components/CategoriesTable";
import AddEditCategory from "../categories/dialogs/AddEditCategory";
import { DeleteDialog } from "@/dialogs/DeleteDialog";

import {
  deleteCategoryThunk,
  fetchCategoriesThunk,
} from "../categories/categoryThunk";
import { selectAdminCategories } from "../categories/categorySlice";

import type {
  CategoryManagement,
  categoryMode,
  SortCategory,
} from "../categories/categoryTypes";

export default function CategoriesManagementPage() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectAdminCategories);

  // UI state
  const [mode, setMode] = useState<categoryMode>("AddNew");
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState<SortCategory>("NewestFirst");
  const [page, setPage] = useState(1);

  // Dialogs state
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editCategory, setEditCategory] = useState<CategoryManagement | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryManagement | null>(null);
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const debouncedSearch = useDebounce(searchTerm, 500);

  // Helpers
  const cleanFilterParams = useCallback(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set("Search", debouncedSearch);
    if (sort !== "NewestFirst") params.set("SortBy", sort);
    if (page > 1) params.set("Page", page.toString());
    return params;
  }, [debouncedSearch, sort, page]);

  // Update URL
  useEffect(() => {
    setSearchParams(cleanFilterParams());
  }, [cleanFilterParams, setSearchParams]);

  // Fetch categories
  useEffect(() => {
    dispatch(
      fetchCategoriesThunk({
        page,
        size: 10,
        search: debouncedSearch,
        sort,
      })
    );
  }, [dispatch, page, debouncedSearch, sort]);

  // Delete handler
  const handleDeleteCategory = async () => {
    if (!selectedCategory) return;
    const res = await dispatch(
      deleteCategoryThunk({ categoryId: selectedCategory.categoryId })
    );

    if (deleteCategoryThunk.fulfilled.match(res)) {
      toast.success("Deleted successfully");
      setIsOpenDeleteDialog(false);
      setSelectedCategory(null);
    } else {
      toast.error(res.payload || "Failed to delete");
    }
  };

  // Open edit
  const handleEditCategory = (category: CategoryManagement) => {
    setEditCategory(category);
    setMode("Edit");
    setShowAddDialog(true);
  };

  // Open delete
  const handleOpenDeleteDialog = (category: CategoryManagement) => {
    setSelectedCategory(category);
    setIsOpenDeleteDialog(true);
  };

  return (
    <>
      <div className="container mx-auto p-6 space-y-6">
        <CategoriesHeader
          onAddCategory={() => {
            setMode("AddNew");
            setShowAddDialog(true);
          }}
        />

        <CategoriesFilter
          value={searchTerm}
          sort={sort}
          onSearchChange={setSearchTerm}
          onSortChange={setSort}
        />

        <CategoriesTable
          searchTerm={debouncedSearch}
          categories={categories}
          onDeleteCategory={handleOpenDeleteDialog}
          onEditCategory={handleEditCategory}
          onPageChange={setPage}
          onShowInfoCategory={() => console.log("TODO: Show category info")}
        />
      </div>

      {/* Add / Edit */}
      <AddEditCategory
        category={editCategory}
        mode={mode}
        open={showAddDialog}
        onClose={() => {
          setEditCategory(null);
          setShowAddDialog(false);
        }}
      />

      {/* Delete */}
      <DeleteDialog
        open={isOpenDeleteDialog}
        name={selectedCategory?.name ?? "Unknown"}
        onDelete={handleDeleteCategory}
        onClose={setIsOpenDeleteDialog}
      />
    </>
  );
}
