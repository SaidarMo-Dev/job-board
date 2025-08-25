import Header from "@/components/Header";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Footer } from "react-day-picker";
import { Outlet } from "react-router";

export default function PublicLayout() {
  const isAuthenticated = useAppSelector(
    (state) => state.authReducer.isAuthenticated
  );

  return (
    <>
      {isAuthenticated ? <DashboardHeader /> : <Header />}
      <Outlet />
      <Footer />
    </>
  );
}
