import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Search } from "lucide-react";
import type {
  FilterByRole,
  FilterByStatus,
  UserFilterValues,
} from "../usersTypes";

interface UsersFiltersProps {
  filters: UserFilterValues;
  onfilerChange: (updated: Partial<UserFilterValues>) => void;
  search: string;
  onSearchChange: (value: string) => void;
}

export default function UsersFilters({
  filters,
  onfilerChange,
  search,
  onSearchChange,
}: UsersFiltersProps) {
  return (
    <div className="py-4 px-2 border-1 border-gray-200 rounded-md shadow-[0_1px_3px_0_rgba(0,0,0,0.05)]">
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Input
            value={search ?? ""}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by email or name..."
            className="pl-10"
          />
          <Search className="w-4 h-4 absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
        </div>
        <Select
          defaultValue={filters.role ?? "All"}
          onValueChange={(value) =>
            onfilerChange({ role: value as FilterByRole })
          }
        >
          <SelectTrigger className="w-40">
            <Filter />
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Roles</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="Employer">Employer</SelectItem>
            <SelectItem value="JobSeeker">Job Seeker</SelectItem>
          </SelectContent>
        </Select>

        <Select
          defaultValue={filters.status ?? "All"}
          onValueChange={(value) =>
            onfilerChange({ status: value as FilterByStatus })
          }
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Status</SelectItem>
            <SelectItem value="Admin">Active</SelectItem>
            <SelectItem value="Employer">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
