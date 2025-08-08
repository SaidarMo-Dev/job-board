import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectItem } from "@/components/ui/select";
import { Filter, Search } from "lucide-react";
import { sortOptions, type SortCompany } from "../companyTypes";

interface CompanySearchFilter {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sort: SortCompany;
  onSortChange: (value: SortCompany) => void;
}
export default function CompanySearchFilter({
  searchTerm,
  onSearchChange,
  sort,
  onSortChange,
}: CompanySearchFilter) {
  return (
    <Card className="mb-8 shadow-xs">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Search & Filter
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search companies by name..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="sm:w-48">
            <Select
              value={sort ?? "NameAsc"}
              onValueChange={(value) => onSortChange(value as SortCompany)}
            >
              <SelectTrigger className="w-40">
                <Filter />
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
