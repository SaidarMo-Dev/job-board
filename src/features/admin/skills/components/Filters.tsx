"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Search } from "lucide-react";
import type { SortSkill } from "../skillsTypes";

interface SearchBarProps {
  value: string;
  sort: SortSkill;
  onSearchChange: (value: string) => void;
  onSortChange: (value: SortSkill) => void;
  placeholder?: string;
}

export function Filters({
  value,
  sort,
  onSearchChange,
  onSortChange,
  placeholder = "Search...",
}: SearchBarProps) {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
        />
      </div>
      <Select
        defaultValue={sort}
        onValueChange={(value) => onSortChange(value as SortSkill)}
      >
        <SelectTrigger className="w-40">
          <Filter />
          <SelectValue placeholder="Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Name">Name</SelectItem>
          <SelectItem value="CreateDate">Added Date</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
