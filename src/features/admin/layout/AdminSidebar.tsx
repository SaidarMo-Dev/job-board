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

import {
  Briefcase,
  Building2,
  Home,
  Layers2,
  Settings,
  ShieldCheck,
  User,
} from "lucide-react";
import { Link } from "react-router";
import SidebarUserMenu from "../dashboard/components/SidebarUserMenu";
import { ROUTES } from "@/constants/routes";

const menuItems = [
  {
    name: "Dashboard",
    icon: Home,
    url: ROUTES.ADMIN.DASHBOARD,
    Badge: 0,
  },
  {
    name: "Users",
    icon: User,
    url: ROUTES.ADMIN.USERS,
    Badge: 23,
  },
  {
    name: "Jobs",
    icon: Briefcase,
    url: "#",
    Badge: 10,
  },
  {
    name: "Companies",
    icon: Building2,
    url: ROUTES.ADMIN.COMPANIES.LIST,
    Badge: 0,
  },
  {
    name: "Skills",
    icon: ShieldCheck,
    url: ROUTES.ADMIN.SKILLS,
    Badge: 0,
  },
  {
    name: "Categories",
    icon: Layers2,
    url: ROUTES.ADMIN.CATEGORIES,
    Badge: 0,
  },
  {
    name: "Settings",
    icon: Settings,
    url: "#",
    Badge: 0,
  },
];

export default function AdminSidebar() {
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <Link to={""} className="flex gap-2">
                <div className="bg-sky-700 p-2 rounded-md">
                  <Briefcase className="text-white w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[18px] text-sky-600">iLink</h3>
                  <span className="text-[13px] text-gray-700  dark:text-secondary-foreground">
                    Admin Dashboard
                  </span>
                </div>
              </Link>
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
                      {item.Badge !== 0 && (
                        <span
                          className="px-[7px] py-[3px] bg-gray-200/70 rounded-full text-xs
                                        font-bold dark:bg-secondary dark:text-secondary-foreground"
                        >
                          {item.Badge}
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarUserMenu
              user={{
                name: "Admin",
                email: "Admin.Exempla@ilink.com",
                avatar: "A",
              }}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
