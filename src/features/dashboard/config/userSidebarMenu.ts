import { ROUTES } from "@/constants/routes";
import type { MenuItem } from "@/shared/types/MenuItem";
import {
  User2,
  LayoutDashboard,
  FileText,
  Heart,
  History,
  Settings,
  Shield,
  HelpCircle,
} from "lucide-react";

export const mainMenuItems: MenuItem[] = [
  { icon: User2, label: "Profile", href: ROUTES.MEMBER.PROFILE },
  { icon: LayoutDashboard, label: "Dashboard", href: ROUTES.MEMBER.HOME },
  { icon: FileText, label: "Applications", href: ROUTES.MEMBER.APPLICATIONS },
  { icon: Heart, label: "Saved Jobs", href: ROUTES.MEMBER.SAVED_JOBS },
  { icon: History, label: "History", href: ROUTES.MEMBER.HISTORY },
];

export const settingsMenuItems: MenuItem[] = [
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

export const supportMenuItems: MenuItem[] = [
  { icon: HelpCircle, label: "Contact Us", href: ROUTES.PUBLIC.CONTACT },
];
