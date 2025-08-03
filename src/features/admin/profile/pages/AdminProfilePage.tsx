"use client";

import AdminActions from "../components/AdminActions";
import PermissionsPverview from "../components/PermissionsOverview";
import MainAdminProfile from "../components/MainAdminProfile";

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

const mockProfile: AdminProfile = {
  firstName: "Jane",
  lastName: "Doe",
  email: "admin@example.com",
  role: "Super Admin",
  joinDate: "January 2023",
  gender: "Female",
  dateOfBirth: "15/03/1990",
  phoneNumber: "+1 (555) 123-4567",
  address: "123 Admin Street\nSuite 100\nNew York, NY 10001",
  country: "United States",
  avatar: "/placeholder.svg?height=100&width=100",
  lastLogins: [
    { date: "2024-01-15 14:30", ip: "192.168.1.100" },
    { date: "2024-01-14 09:15", ip: "192.168.1.100" },
    { date: "2024-01-13 16:45", ip: "10.0.0.50" },
  ],
  twoFactorEnabled: true,
  permissions: [
    "Manage Users",
    "Delete Data",
    "System Settings",
    "View Analytics",
  ],
};

export default function AdminProfile() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Main Profile Card */}

      <MainAdminProfile admin={mockProfile} />
      <AdminActions />
      <PermissionsPverview />
    </div>
  );
}
