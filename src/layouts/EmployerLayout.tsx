import Footer from "@/components/LandingPageComponents/Footer";
import { Outlet } from "react-router";

export default function EmployerLayout() {
  return (
    <>
      <EmployerHeader />
      <Outlet />
      <Footer />
    </>
  );
}

function EmployerHeader() {
  return <div>test employer layout</div>;
}
