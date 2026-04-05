import { ROUTES } from "@/constants/routes";
import AddEditJobPage from "@/features/admin/jobs/pages/AddEditJobPage";
import EmployerDashboardPage from "@/features/employer/dashboard/EmployerDashboardPage";
import EmployerJobsPage from "@/features/employer/Jobs/EmployerJobsPage";
import EmployerLayout from "@/features/employer/layouts/EmployerLayout";
import AuthGuard from "@/guards/authGuard";
import { Route } from "react-router";

const EmployerRoutes = (
  <Route
    element={
      <AuthGuard allowedRoles={["Employer"]}>
        <EmployerLayout />
      </AuthGuard>
    }
  >
    <Route path={ROUTES.EMPLOYER.DASHBOARD}>
      <Route index element={<EmployerDashboardPage />} />
      <Route path={ROUTES.EMPLOYER.JOBS.LIST} element={<EmployerJobsPage />} />
      <Route
        path={ROUTES.EMPLOYER.JOBS.ADD}
        element={<AddEditJobPage mode="Add" />}
      />
      <Route
        path={ROUTES.EMPLOYER.JOBS.EDIT(":id")}
        element={<AddEditJobPage mode="Edit" />}
      />
    </Route>
  </Route>
);

export default EmployerRoutes;
