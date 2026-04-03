import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROUTES } from "@/constants/routes";
import { BriefcaseBusiness, LogOutIcon } from "lucide-react";
import { Link } from "react-router";
import { MenuSection } from "./MenuSection";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { logoutThunk } from "@/features/auth/authThunk";
import { useQueryClient } from "@tanstack/react-query";
import {
  mainMenuItems,
  settingsMenuItems,
  supportMenuItems,
} from "../config/userSidebarMenu";

export default function UserMenu() {
  const currentUser = useAppSelector(selectCurrentUser);
  const isEmployer = currentUser?.roles.includes("Employer") ?? false;
  const dispatch = useAppDispatch();

  const queryClient = useQueryClient();
  const handleSignOut = () => {
    dispatch(logoutThunk());
    queryClient.clear();
  };

  return (
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

        {/* --Recruitment-- For employers */}
        {isEmployer && (
          <DropdownMenuItem asChild>
            <Link
              to={ROUTES.MEMBER.RECRUITMENT.HOME}
              className="flex items-center gap-2"
            >
              <BriefcaseBusiness className="h-6 w-6" />
              <span>Recruitment</span>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />

        <MenuSection items={mainMenuItems} />
        <MenuSection items={settingsMenuItems} />
        <MenuSection items={supportMenuItems} />

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
  );
}
