import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import UserMenu from "./UserMenu";

import logo from "@/assets/ilink-logo.svg";
import { getDashboardRoute } from "../utils/getDashboardRoute";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectUserRoles } from "@/features/auth/authSlice";

export function DashboardHeader() {
  const userRoles = useAppSelector(selectUserRoles);
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="custom-container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <Link
            to={getDashboardRoute(userRoles)}
            className="text-2xl font-bold text-sky-600 hover:text-sky-700 transition-colors"
          >
            <img src={logo} alt="logo" width={40} height={40} />
          </Link>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4"
              aria-hidden="true"
            />
            <Input
              type="search"
              placeholder="Search jobs, companies, or skills..."
              className="pl-10 bg-muted/50 "
              aria-label="Search"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* User Menu */}
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
