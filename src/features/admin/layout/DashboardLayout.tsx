import AuthGuard from "@/pages/Auth/authGuard";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <AuthGuard>
      <Outlet />
    </AuthGuard>
  );
}
