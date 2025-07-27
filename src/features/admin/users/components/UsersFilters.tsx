import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Search } from "lucide-react";

export default function UsersFilters() {
  return (
    <div className="flex gap-4 mt-6">
      <div className="relative flex-1">
        <Input placeholder="Search by email or name..." className="pl-10" />
        <Search className="w-4 h-4 absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
      </div>
      <Select>
        <SelectTrigger className="w-40">
          <Filter />
          <SelectValue placeholder="Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Roles</SelectItem>
          <SelectItem value="Admin">Admin</SelectItem>
          <SelectItem value="Employer">Employer</SelectItem>
          <SelectItem value="JobSeeker">Job Seeker</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="Admin">Active</SelectItem>
          <SelectItem value="Employer">Suspended</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
