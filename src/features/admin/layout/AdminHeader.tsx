import DarkModeToggle from "@/components/DarkModeToggle";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, UserRoundIcon } from "lucide-react";
import { useState } from "react";

export default function AdminHeader() {
  const [isDark, setIsDark] = useState(
    localStorage.getItem("isDark") ? true : false
  );
  if (isDark) document.documentElement.classList.add("dark");

  return (
    <header
      className="flex items-center shrink-0 h-16 gap-2 border-b-1 border-b-gray-300 dark:border-b-gray-800 *:
                backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4"
    >
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 !h-5" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbPage>
            <BreadcrumbLink>Overview</BreadcrumbLink>
          </BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-2 ml-auto mr-2">
        <Input
          placeholder="Search..."
          className="w-64 py-5"
          id="dashboard-search"
          aria-label="Dashboard search"
        />
        <DarkModeToggle
          isDark={isDark}
          onModeChange={() => setIsDark(!isDark)}
        />
        <Button variant="ghost" size="icon" className="relative">
          <Bell />
          <Badge className="absolute top-0 right-0 bg-red-600 rounded-full w-5 h-5 dark:text-secondary-foreground dark:bg-red-900">
            2
          </Badge>
        </Button>
        <div className="p-2 bg-gray-100 rounded-full">
          <UserRoundIcon className="w-5 h-5 text-black" />
        </div>
      </div>
    </header>
  );
}
