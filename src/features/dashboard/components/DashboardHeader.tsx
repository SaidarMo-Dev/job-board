import {
  Bell,
  FileText,
  Heart,
  HelpCircle,
  History,
  LayoutDashboard,
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
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectCurrentUser } from "@/features/auth/authSlice";

const menuItems: MenuItem[] = [
  { icon: User2, label: "Profile", href: "/members/profile" },
  { icon: LayoutDashboard, label: "Dashboard", href: "/members" },
  {
    icon: FileText,
    label: "Applications",
    href: "/members/applications",
  },
  {
    icon: Heart,
    label: "Saved Jobs",
    href: "/members/jobs",
  },
  { icon: History, label: "History", href: "/members/history" },
];

const settingsItems: MenuItem[] = [
  {
    icon: Settings,
    label: "Settings & Notifications",
    href: "/members/settings-notifications",
  },
  {
    icon: Shield,
    label: "Password & Security",
    href: "/members/password-security",
  },
];

const supportItems: MenuItem[] = [
  { icon: HelpCircle, label: "Contact Us", href: "/contact" },
];

export function DashboardHeader() {
  const currentUser = useAppSelector(selectCurrentUser);

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="custom-container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-sky-600 hover:text-sky-600 transition-colors"
          >
            iLink
          </Link>
        </div>

        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search jobs, companies, or skills..."
              className="pl-10 bg-muted/50"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <div className="relative">
              <Bell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full text-[10px] text-primary-foreground flex items-center justify-center">
                3
              </span>
            </div>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="Sarah"
                  />
                  <AvatarFallback>
                    {currentUser
                      ? (
                          currentUser?.firstName[0] + currentUser?.lastName[0]
                        ).toUpperCase()
                      : "TS"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {currentUser?.firstName + " " + currentUser?.lastName}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {currentUser?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {/* menu items */}
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <DropdownMenuItem asChild>
                    <Link to={item.href} className="flex items-center gap-2">
                      <Icon className="h-6 w-6" />
                      <span>{item.label}</span>
                    </Link>
                  </DropdownMenuItem>
                );
              })}
              <DropdownMenuSeparator />
              {settingsItems.map((item) => {
                const Icon = item.icon;
                return (
                  <DropdownMenuItem asChild>
                    <Link to={item.href} className="flex items-center gap-2">
                      <Icon className="h-6 w-6" />
                      <span>{item.label}</span>
                    </Link>
                  </DropdownMenuItem>
                );
              })}

              <DropdownMenuSeparator />
              {supportItems.map((item) => {
                const Icon = item.icon;
                return (
                  <DropdownMenuItem asChild>
                    <Link to={item.href} className="flex items-center gap-2">
                      <Icon className="h-6 w-6" />
                      <span>{item.label}</span>
                    </Link>
                  </DropdownMenuItem>
                );
              })}
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
