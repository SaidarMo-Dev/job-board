import { useAppSelector } from "@/hooks/useAppSelector";
import CategoriesFilter from "../categories/components/CategoriesFilters";
import CategoriesHeader from "../categories/components/CategoriesHeader";
import CategoriesTable from "../categories/components/CategoriesTable";
import { selectAdminCategories } from "../categories/categorySlice";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  deleteCategoryThunk,
  fetchCategoriesThunk,
} from "../categories/categoryThunk";
import useDebounce from "@/hooks/use-debounce";
import type {
  CategoryManagement,
  categoryMode,
  SortCategory,
} from "../categories/categoryTypes";
import { useSearchParams } from "react-router";
import AddEditCategory from "../categories/dialogs/AddEditCategory";
import { DeleteDialog } from "@/dialogs/DeleteDialog";
import { toast } from "react-toastify";

export default function CategoriesManagementPage() {
  const [mode, setMode] = useState<categoryMode>("AddNew");

  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState<SortCategory>("NewestFirst");
  const [page, setPage] = useState(1);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editCatgory, setEditCategory] = useState<CategoryManagement | null>(
    null
  );

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryManagement | null>(null);

  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();

  const debouncedSearch = useDebounce(searchTerm, 500);

  // clean filters
  const cleanFilterParams = () => {
    const params = new URLSearchParams();

    // add non default values
    if (debouncedSearch) params.set("Search", debouncedSearch);

    if (searchTerm) params.set("Search", searchTerm);
    if (sort && sort !== "NewestFirst") params.set("SortBy", sort);

    if (page && page > 1) params.set("Page", page.toString());

    return params;
  };

  // update url
  useEffect(() => {
    const params = cleanFilterParams();
    setSearchParams(params);
  }, [debouncedSearch, page, sort]);

  //fetch users
  useEffect(() => {
    dispatch(
      fetchCategoriesThunk({
        page: page,
        size: 10,
        search: debouncedSearch,
        sort: sort,
      })
    );
  }, [dispatch, page, debouncedSearch, sort]);

  const categories = useAppSelector(selectAdminCategories);

  const handleDeleteDialog = async () => {
    // handle delete category
    const res = await dispatch(
      deleteCategoryThunk({ categoryId: selectedCategory?.categoryId ?? -1 })
    );

    if (deleteCategoryThunk.fulfilled.match(res)) {
      toast.success("Delete Successfully");

      // reset related states
      setIsOpenDeleteDialog(false);
      setSelectedCategory(null);
    } else {
      toast.error(res.payload);
    }
  };

  const handleEditCatgory = (category: CategoryManagement) => {
    setEditCategory(category);
    setMode("Edit");
    setShowAddDialog(true);
  };

  const openDeleteDialog = (category: CategoryManagement) => {
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
          categories={categories}
          searchTerm=""
          onDeleteCategory={(cat) => openDeleteDialog(cat)}
          onEditCategory={handleEditCatgory}
          onPageChange={setPage}
          onShowInfoCategory={() => console.log("test show info cat")}
        />
      </div>

      <AddEditCategory
        category={editCatgory}
        mode={mode}
        open={showAddDialog}
        onClose={() => {
          setEditCategory(null);
          setShowAddDialog(false);
        }}
      />
      <DeleteDialog
        open={isOpenDeleteDialog}
        name={selectedCategory?.name ?? "Unkown"}
        onDelete={() => handleDeleteDialog()}
        onClose={setIsOpenDeleteDialog}
      />
    </>
  );
}
