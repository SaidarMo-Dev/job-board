import { Outlet } from "react-router";
import AdminAuthGuard from "../profile/pages/auth/AdminAuthGuard";

export default function DashboardLayout() {
  return (
    <AdminAuthGuard>
      <Outlet />
    </AdminAuthGuard>
  );
}
