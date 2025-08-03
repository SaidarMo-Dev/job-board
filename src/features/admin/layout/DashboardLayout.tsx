import { Outlet } from "react-router";
import AdminAuthGuard from "../profile/pages/auth/adminAuthGuard";

export default function DashboardLayout() {
  return (
    <AdminAuthGuard>
      <Outlet />
    </AdminAuthGuard>
  );
}
