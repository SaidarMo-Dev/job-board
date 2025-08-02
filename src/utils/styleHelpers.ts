import type { RoleType } from "@/features/admin/users/usersTypes";

export function getStatusColor(status: boolean): string {
  return !status
    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200";
}

export function getRoleColor(role: RoleType): string {
  switch (role) {
    case "Admin":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200";
    case "Employer":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200";
    case "JobSeeker":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-200";
  }
}

export function formatRole(role: RoleType) {
  if (role === "JobSeeker") return "Job Seeker";
  else return role;
}

export function getGender(gender: string | undefined) {
  if (!gender || gender.trim().length === 0) return "Not specefied";

  return gender;
}
