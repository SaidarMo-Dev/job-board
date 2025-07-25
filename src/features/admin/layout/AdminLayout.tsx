import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AdminSidebar from "./AdminSidebar";

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
          <div>
            <SidebarTrigger />
            <main className="p-4">{children}</main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
