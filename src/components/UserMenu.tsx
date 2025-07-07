import {
  ChevronRight,
  FileText,
  Heart,
  HelpCircle,
  History,
  LayoutDashboard,
  LogOutIcon,
  Settings,
  Shield,
  User2,
} from "lucide-react";

import { useState } from "react";
import type { MenuItem } from "../types/MenuItem";
import ProgressBar from "./ProgressBar";
import MenuButton from "./MenuButton";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import { logout } from "@/features/auth/authSlice";
import RemoveTokens from "@/utils/removeTokens";
import { useSelector } from "react-redux";
import { selectStats } from "@/features/dashboard_stats/dashboardStatsSlice";

export default function UserMenu() {
  const savedJobsCount = useSelector(selectStats)?.totalSavedJobs;
  const [profileCompletion] = useState<number>(16);

  const menuItems: MenuItem[] = [
    { icon: User2, label: "Profile", href: "/members/profile" },
    { icon: LayoutDashboard, label: "Dashboard", href: "/members" },
    { icon: FileText, label: "Applications", href: "/members/applications" },
    {
      icon: Heart,
      label: "Saved Jobs",
      href: "/members/jobs",
      badge: savedJobsCount,
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

  const dispatch = useDispatch<AppDispatch>();

  const handleSignOut = () => {
    RemoveTokens();
    dispatch(logout());
  };

  return (
    <div className="w-80 bg-white rounded-lg shadow-lg border border-gray-200 absolute top-0 right-0">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User2 />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900">
              Your Account
            </h3>
            <Link
              to="members/profile"
              className="block hover:bg-neutral-50 py-1 px-2 rounded-sm"
            >
              <div className="mt-2">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                  <span>{profileCompletion}% of Profile Completed</span>
                  <ChevronRight />
                </div>
                <ProgressBar value={profileCompletion} color="bg-sky-600" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Menu Items */}
      <div className="px-2">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <MenuButton key={item.label} item={item} />
          ))}
        </div>

        {/* Separator */}
        <div className="border-t border-gray-200 my-2" />

        {/* Settings Items */}
        <div className="space-y-1">
          {settingsItems.map((item) => (
            <MenuButton key={item.label} item={item} />
          ))}
        </div>

        {/* Separator */}
        <div className="border-t border-gray-200 my-2" />

        {/* Support Items */}
        <div className="space-y-1">
          {supportItems.map((item) => (
            <MenuButton key={item.label} item={item} />
          ))}
        </div>

        {/* Separator */}
        <div className="border-t border-gray-200 my-2" />

        {/* Sign Out */}
        <div className="pb-2">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 w-full px-3 py-2 text-left text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors duration-150"
          >
            <LogOutIcon />
            <Link to={"/auth/login"} className="flex-1">
              Sign Out
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
