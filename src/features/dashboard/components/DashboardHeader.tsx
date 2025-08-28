import {
  Bell,
  FileText,
  Heart,
  HelpCircle,
  History,
  LayoutDashboard,
  LogOutIcon,
  Search,
  Settings,
  Shield,
  User2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router";
import type { MenuItem } from "@/types/MenuItem";
import { useAppSelector } from "@/hooks/useAppSelector";
import { logout, selectCurrentUser } from "@/features/auth/authSlice";
import { MenuSection } from "./MenuSection";
import RemoveTokens from "@/utils/removeTokens";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { ROUTES } from "@/constants/routes";

const menuItems: MenuItem[] = [
  { icon: User2, label: "Profile", href: ROUTES.MEMBER.PROFILE },
  { icon: LayoutDashboard, label: "Dashboard", href: ROUTES.MEMBER.HOME },
  { icon: FileText, label: "Applications", href: ROUTES.MEMBER.APPLICATIONS },
  { icon: Heart, label: "Saved Jobs", href: ROUTES.MEMBER.SAVED_JOBS },
  { icon: History, label: "History", href: ROUTES.MEMBER.HISTORY },
];

const settingsItems: MenuItem[] = [
  {
    icon: Settings,
    label: "Settings & Notifications",
    href: ROUTES.MEMBER.SETTINGS,
  },
  {
    icon: Shield,
    label: "Password & Security",
    href: ROUTES.MEMBER.PASSWORD_SECURITY,
  },
];

const supportItems: MenuItem[] = [
  { icon: HelpCircle, label: "Contact Us", href: ROUTES.PUBLIC.CONTACT },
];

export function DashboardHeader() {
  const currentUser = useAppSelector(selectCurrentUser);
  const notificationsCount = 3; // TODO: replace with real data

  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    RemoveTokens();
    dispatch(logout());
  };
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full"
                aria-label="User menu"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt={currentUser?.firstName ?? "User"}
                  />
                  <AvatarFallback>
                    {currentUser
                      ? `${currentUser.firstName?.[0] ?? ""}${
                          currentUser.lastName?.[0] ?? ""
                        }`.toUpperCase()
                      : "TS"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56" align="end" forceMount>
              {/* User Info */}
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {currentUser?.firstName} {currentUser?.lastName}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {currentUser?.email}
                  </p>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              {/* Menu Sections */}
              <MenuSection items={menuItems} />
              <MenuSection items={settingsItems} />
              <MenuSection items={supportItems} />

              {/* Logout */}
              <DropdownMenuItem onClick={handleSignOut} asChild>
                <div className="pb-2">
                  <LogOutIcon />
                  <Link to={"/auth/login"} className="flex-1">
                    Sign Out
                  </Link>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
