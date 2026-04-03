import UnauthorizedPage from "@/pages/UnauthorizedPage";
import PublicRoutes from "./public.routes";
import AuthRoutes from "./auth.routes";
import UserRoutes from "./user.routes";
import EmployerRoutes from "./employer.routes";
import AdminRoutes from "./admin.routes";
import { Route, Routes } from "react-router";
import { NotFound } from "@/pages/NotFound";
import JobRoutes from "./job.routes";

export default function AppRoutes() {
  return (
    <Routes>
      {PublicRoutes}
      {JobRoutes}
      {AuthRoutes}
      {UserRoutes}
      {EmployerRoutes}
      {AdminRoutes}

      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
