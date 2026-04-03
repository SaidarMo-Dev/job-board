import { ROUTES } from "@/constants/routes";
import AddEditCompany from "@/features/admin/companies/pages/AddEditCompany";
import Dashboard from "@/features/admin/dashboard/components/Dashboard";
import AddEditJobPage from "@/features/admin/jobs/pages/AddEditJobPage";
import AdminDashboardLayout from "@/features/admin/layout/AdminDashboardLayout";
import AdminLayout from "@/features/admin/layout/AdminLayout";
import CategoriesManagementPage from "@/features/admin/pages/CategoriesManagementPage";
import CompaniesManagementPage from "@/features/admin/pages/CompaniesManagementPage";
import JobsManagementPage from "@/features/admin/pages/JobsManagementPage";
import SkillsManagement from "@/features/admin/pages/SkillsManagementPage";
import UsersManagement from "@/features/admin/pages/UsersManagement";
import AdminProfile from "@/features/admin/profile/pages/AdminProfilePage";
import { Route } from "react-router";

const AdminRoutes = (
  <Route element={<AdminDashboardLayout />}>
    <Route
      path={ROUTES.ADMIN.DASHBOARD}
      element={<AdminLayout>{<Dashboard />}</AdminLayout>}
    />
    <Route
      path={ROUTES.ADMIN.PROFILE}
      element={<AdminLayout>{<AdminProfile />}</AdminLayout>}
    />

    {/* users management routes */}
    <Route
      path={ROUTES.ADMIN.USERS}
      element={<AdminLayout>{<UsersManagement />}</AdminLayout>}
    />

    {/* skills management routes */}
    <Route
      path={ROUTES.ADMIN.SKILLS}
      element={<AdminLayout>{<SkillsManagement />}</AdminLayout>}
    />

    {/* categories management routes */}
    <Route
      path={ROUTES.ADMIN.CATEGORIES}
      element={<AdminLayout>{<CategoriesManagementPage />}</AdminLayout>}
    />

    {/* companies management routes */}
    <Route
      path={ROUTES.ADMIN.COMPANIES.LIST}
      element={<AdminLayout>{<CompaniesManagementPage />}</AdminLayout>}
    />
    <Route
      path={ROUTES.ADMIN.COMPANIES.ADD}
      element={<AdminLayout>{<AddEditCompany mode="Add" />}</AdminLayout>}
    />
    <Route
      path={"/preview/admin/companies/:Id/Edit"}
      element={<AdminLayout>{<AddEditCompany mode="Edit" />}</AdminLayout>}
    />

    {/* jobs management routes */}
    <Route
      path={ROUTES.ADMIN.JOBS.LIST}
      element={<AdminLayout>{<JobsManagementPage />}</AdminLayout>}
    />
    <Route
      path={ROUTES.ADMIN.JOBS.ADD}
      element={<AdminLayout>{<AddEditJobPage mode="Add" />}</AdminLayout>}
    />
  </Route>
);

export default AdminRoutes;
