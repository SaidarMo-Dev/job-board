"use client";

import AdminActions from "../components/AdminActions";
import PermissionsPverview from "../components/PermissionsOverview";
import MainAdminProfile from "../components/MainAdminProfile";
import { useAppSelector } from "@/hooks/useAppSelector";

interface AdminProfile {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  joinDate: string;
  gender: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
  country: string;
  avatar: string;
  lastLogins: Array<{ date: string; ip: string }>;
  twoFactorEnabled: boolean;
  permissions: string[];
}

export default function AdminProfile() {
  const currentUser = useAppSelector((state) => state.adminAuthReducer.admin);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Main Profile Card */}

      <MainAdminProfile admin={currentUser} />
      <AdminActions />
      <PermissionsPverview />
    </div>
  );
}
