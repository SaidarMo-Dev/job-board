import Header from "@/components/Header";
import Footer from "@/components/LandingPageComponents/Footer";
import AuthGuard from "@/pages/Auth/authGuard";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <AuthGuard>
      <Header />
      <Outlet />
      <Footer />
    </AuthGuard>
  );
}
