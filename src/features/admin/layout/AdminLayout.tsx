import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen bg-background flex"
      role="application"
      aria-label="iLink Admin Dashboard"
    >
      <SidebarProvider defaultOpen>
        <AdminSidebar />
        <SidebarInset>
          <AdminHeader />
          <main className="p-4">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
