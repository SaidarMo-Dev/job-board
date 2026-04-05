import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import EmployerSidebar from "../dashboard/components/EmployerSidebar";
import EmployerHeader from "../dashboard/components/EMployerHeader";
import { Outlet } from "react-router";

export default function EmployerLayout() {
  return (
    <div
      className="min-h-screen bg-primary-foreground flex"
      role="application"
      aria-label="iLink Admin Dashboard"
    >
      <SidebarProvider defaultOpen>
        <EmployerSidebar />
        <SidebarInset className="bg-primary-foreground shadow-primary-foreground">
          <EmployerHeader />
          <main className="p-4">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
