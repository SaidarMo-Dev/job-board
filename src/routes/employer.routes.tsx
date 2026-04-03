import { ROUTES } from "@/constants/routes";
import AddEditJobPage from "@/features/admin/jobs/pages/AddEditJobPage";
import RecruitmentPage from "@/features/employer/pages/RecruitmentPage";
import EmployerLayout from "@/layouts/EmployerLayout";
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
      <Route index element={<RecruitmentPage />} />
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
