import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import UserMenu from "./UserMenu";

export function DashboardHeader() {
  const notificationsCount = 3; // TODO: replace with real data

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="custom-container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-2xl font-bold text-sky-600 hover:text-sky-700 transition-colors"
          >
            iLink
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
          {/* Notifications */}
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <div className="relative">
              <Bell className="h-6 w-6" />
              {notificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary rounded-full text-[10px] text-primary-foreground flex items-center justify-center">
                  {notificationsCount}
                </span>
              )}
            </div>
          </Button>

          {/* User Menu */}
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
