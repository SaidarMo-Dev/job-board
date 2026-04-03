import Footer from "@/components/LandingPageComponents/Footer";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import AuthGuard from "@/guards/authGuard";
import { Outlet } from "react-router";

export default function UserDashboardLayout() {
  return (
    <AuthGuard>
      <DashboardHeader />
      <Outlet />
      <Footer />
    </AuthGuard>
  );
}
