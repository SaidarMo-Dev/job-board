import { Outlet } from "react-router";
import AdminAuthGuard from "../profile/pages/auth/AdminAuthGuard";

export default function AdminDashboardLayout() {
  return (
    <AdminAuthGuard>
      <Outlet />
    </AdminAuthGuard>
  );
}
