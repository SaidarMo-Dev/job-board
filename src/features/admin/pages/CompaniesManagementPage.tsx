import { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import useDebounce from "@/hooks/use-debounce";

import CompaniesHeader from "../companies/components/CompaniesHeader";
import CompaniesTable from "../companies/components/CompaniesTable";
import CompanySearchFilter from "../companies/components/CompanySearchFilter";
import CompanyInfoDialog from "../companies/dialogs/ShowInfoCompanyDialog";
import { DeleteDialog } from "@/dialogs/DeleteDialog";

import {
  deleteCompanyThunk,
  fetchCompaniesThunk,
} from "../companies/companyThunk";
import { selectAdminCompanies } from "../companies/companySlice";
import type { CompanyManagement, SortCompany } from "../companies/companyTypes";
import { ROUTES } from "@/constants/routes";

export default function CompaniesManagementPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Filters & pagination state
  const [filters, setFilters] = useState<{ search: string; sort: SortCompany }>(
    {
      search: "",
      sort: "NameAsc",
    }
  );
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(filters.search, 500);
  const [searchParams, setSearchParams] = useSearchParams();

  // Dialog states
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openShowCompanyInfo, setOpenShowCompanyInfo] = useState(false);
  const [selectedCompany, setSelectedCompany] =
    useState<CompanyManagement | null>(null);

  const companies = useAppSelector(selectAdminCompanies);
  const deleteLoading = useAppSelector(
    (state) => state.adminCompaniesReducer.loading.remove
  );

  /** Build URL params from current state */
  const cleanFilterParams = useCallback(() => {
    const params = new URLSearchParams();

    if (debouncedSearch) params.set("Search", debouncedSearch);
    if (filters.sort !== "NameAsc") params.set("SortBy", filters.sort);
    if (page > 1) params.set("Page", page.toString());

    return params;
  }, [debouncedSearch, filters.sort, page]);

  /** Update URL when filters change */
  useEffect(() => {
    const params = cleanFilterParams();
    setSearchParams(params);
  }, [cleanFilterParams, setSearchParams]);

  /** Fetch companies on filter or pagination change */
  useEffect(() => {
    dispatch(
      fetchCompaniesThunk({
        page,
        size: 10,
        search: debouncedSearch,
        sort: filters.sort,
      })
    );
  }, [dispatch, page, debouncedSearch, filters.sort]);

  /** Handlers */
  const handleEditCompany = useCallback(
    (companyId: number) => {
      navigate(ROUTES.ADMIN.COMPANIES.EDIT(companyId));
    },
    [navigate]
  );

  const handleDeleteCompany = useCallback((company: CompanyManagement) => {
    setSelectedCompany(company);
    setOpenDeleteDialog(true);
  }, []);

  const handleShowCompanyInfoDialog = useCallback(
    (company: CompanyManagement) => {
      setSelectedCompany(company);
      setOpenShowCompanyInfo(true);
    },
    []
  );

  const onDelete = useCallback(() => {
    if (!selectedCompany) return;
    dispatch(deleteCompanyThunk({ Id: selectedCompany.companyId }))
      .unwrap()
      .then(() => {
        toast.success("Deleted Successfully");
        setOpenDeleteDialog(false);
      })
      .catch((err) => toast.error(err));
  }, [dispatch, selectedCompany]);

  return (
    <>
      <div className="container mx-auto p-6 space-y-6">
        <CompaniesHeader />

        <CompanySearchFilter
          searchTerm={filters.search}
          sort={filters.sort}
          onSortChange={(value) =>
            setFilters((prev) => ({ ...prev, sort: value }))
          }
          onSearchChange={(value) =>
            setFilters((prev) => ({ ...prev, search: value }))
          }
        />

        <CompaniesTable
          companies={companies}
          searchTerm={filters.search}
          onEditCompany={handleEditCompany}
          onDeleteCompany={handleDeleteCompany}
          onShowInfo={handleShowCompanyInfoDialog}
          onPageChange={setPage}
        />
      </div>

      <DeleteDialog
        loading={deleteLoading}
        open={openDeleteDialog}
        name={selectedCompany?.companyName ?? "Unknown"}
        onClose={() => setOpenDeleteDialog(false)}
        onDelete={onDelete}
      />

      <CompanyInfoDialog
        open={openShowCompanyInfo}
        company={selectedCompany}
        onClose={setOpenShowCompanyInfo}
      />
    </>
  );
}
