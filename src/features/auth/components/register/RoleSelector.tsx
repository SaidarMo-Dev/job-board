import { Building, User } from "lucide-react";
import type { RoleType } from "@/features/admin/users/usersTypes";

interface RoleSelectorProps {
  onSelect: (role: RoleType) => void;
  error?: { message?: string };
  selectedRole: RoleType;
}

export function RoleSelector({
  onSelect,
  error = { message: "" },
  selectedRole,
}: RoleSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">I am a</label>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onSelect("JobSeeker")}
          className={`flex items-center justify-center h-11 px-4 rounded-md border transition-colors ${
            selectedRole === "JobSeeker"
              ? "border-sky-600 bg-sky-50 text-sky-700"
              : "border-gray-300 hover:bg-gray-50"
          }`}
        >
          <User className="w-4 h-4 mr-2" />
          Job Seeker
        </button>
        <button
          type="button"
          onClick={() => onSelect("Employer")}
          className={`flex items-center justify-center h-11 px-4 rounded-md border transition-colors ${
            selectedRole === "Employer"
              ? "border-sky-600 bg-sky-50 text-sky-700"
              : "border-gray-300 hover:bg-gray-50"
          }`}
        >
          <Building className="w-4 h-4 mr-2" />
          Employer
        </button>
        {error && <p className="text-sm text-red-400">{error.message}</p>}
      </div>
    </div>
  );
}
