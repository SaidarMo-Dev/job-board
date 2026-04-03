import Footer from "@/components/LandingPageComponents/Footer";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <>
      <DashboardHeader />
      <Outlet />
      <Footer />
    </>
  );
}
