import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import type { SortCategory } from "../categoryTypes";

interface CategoriesFilterProps {
  value: string;
  sort: SortCategory;
  onSearchChange: (value: string) => void;
  onSortChange: (value: SortCategory) => void;
  placeholder?: string;
}

export default function CategoriesFilter({
  value,
  sort,
  onSearchChange,
  onSortChange,
}: CategoriesFilterProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search categories..."
          value={value ?? ""}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select
        value={sort}
        onValueChange={(value) => onSortChange(value as SortCategory)}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="NameAsc">Name (A-Z)</SelectItem>
          <SelectItem value="NameDesc">Name (Z-A)</SelectItem>
          <SelectItem value="OlderFirst">Oldest First</SelectItem>
          <SelectItem value="NewestFirst">Newest First</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
