import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  Sidebar,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

import { Briefcase, Building, Home, LogOut, Settings } from "lucide-react";
import { Link } from "react-router";
import { ROUTES } from "@/constants/routes";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { logoutThunk } from "@/features/auth/authThunk";

import logo from "@/assets/ilink-logo.svg";

const menuItems = [
  {
    name: "Dashboard",
    icon: Home,
    url: ROUTES.EMPLOYER.DASHBOARD,
    Badge: 0,
  },
  {
    name: "Jobs",
    icon: Briefcase,
    url: ROUTES.EMPLOYER.JOBS.LIST,
    Badge: 5,
  },
  {
    name: "Company",
    icon: Building,
    url: ROUTES.EMPLOYER.COMPANY_PROFILE,
    Badge: 5,
  },
  {
    name: "Settings",
    icon: Settings,
    url: "#",
    Badge: 0,
  },
];

export default function EmployerSidebar() {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logoutThunk());
    localStorage.setItem("IS_AUTHENCATED", "false");
  };
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <div className="flex gap-2">
                <img src={logo} alt="logo" width={40} height={40} />

                <span className="text-[13px] text-gray-700  dark:text-secondary-foreground">
                  Employer Dashboard
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex justify-between">
                      <div className="flex gap-2">
                        {<item.icon className="w-5 h-5" />}
                        {item.name}
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenuButton onClick={handleLogout}>
          <LogOut />
          Log out
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
