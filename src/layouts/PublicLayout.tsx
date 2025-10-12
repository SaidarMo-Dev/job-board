import Header from "@/shared/components/Header";
import Footer from "@/components/LandingPageComponents/Footer";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { useAppSelector } from "@/hooks/useAppSelector";

export default function PublicLayout({ children }) {
  const isAuthenticated = useAppSelector(
    (state) => state.authReducer.isAuthenticated
  );

  return (
    <>
      {isAuthenticated ? <DashboardHeader /> : <Header />}
      {children}
      <Footer />
    </>
  );
}
