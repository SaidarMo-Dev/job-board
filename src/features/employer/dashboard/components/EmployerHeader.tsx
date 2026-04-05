import DarkModeToggle from "@/shared/components/DarkModeToggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserRoundIcon } from "lucide-react";
import { useState } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectCurrentUser } from "@/features/auth/authSlice";

export default function EmployerHeader() {
  const [isDark, setIsDark] = useState(
    localStorage.getItem("isDark") ? true : false,
  );
  if (isDark) document.documentElement.classList.add("dark");

  const employer = useAppSelector(selectCurrentUser);
  return (
    <>
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
        <div className="flex items-center gap-3 ml-auto mr-2">
          <DarkModeToggle
            isDark={isDark}
            onModeChange={() => setIsDark(!isDark)}
          />

          <span className="block h-8 w-px bg-accent"></span>
          <Button
            variant={"ghost"}
            className="rounded-md py-5 px-6 dark:border-1 dark:border-gray-800"
          >
            <UserRoundIcon className="w-5 h-5 text-black dark:text-white" />
            {employer?.firstName + " " + employer?.lastName}
          </Button>
        </div>
      </header>
    </>
  );
}
