import Header from "@/components/Header";
import { Footer } from "react-day-picker";
import { Outlet } from "react-router";

export default function PublicLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
