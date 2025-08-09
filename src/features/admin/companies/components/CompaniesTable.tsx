import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Eye, Globe, MoreHorizontal, Trash2 } from "lucide-react";
import type { CompanyManagement } from "../companyTypes";
import TablePagination from "../../users/components/TablePagination";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CompaniesTableProps {
  companies: CompanyManagement[] | null;
  searchTerm: string;
  onEditCompany: (companyId: number) => void;
  onDeleteCompany: (company: CompanyManagement) => void;
  onPageChange: (page: number) => void;
  onShowInfo: (company: CompanyManagement) => void;
}

export default function CompaniesTable({
  companies,
  searchTerm,
  onEditCompany,
  onDeleteCompany,
  onPageChange,
  onShowInfo,
}: CompaniesTableProps) {
  const paginationInfo = useAppSelector(
    (state) => state.adminCompaniesReducer.pagination
  );

  function getTotalJobsStyles(jobs: number) {
    if (jobs === 0) return "text-green-600 bg-green-100";
    if (jobs % 2 !== 0) {
      return "text-green-600 bg-green-100";
    }

    return "text-blue-600 bg-blue-100";
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableHead className="py-3 px-2">Company</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Website Url</TableHead>
            <TableHead>Industry</TableHead>
            <TableHead>TotalJobs</TableHead>
            <TableHead>PhoneNumber</TableHead>

            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!companies || companies.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                <div className="text-muted-foreground">
                  {!searchTerm
                    ? "No copanies found matching your search."
                    : "No companies found."}
                </div>
              </TableCell>
            </TableRow>
          ) : (
            companies.map((company) => (
              <TableRow key={company.companyId}>
                <TableCell>#{company.companyId}</TableCell>
                <TableCell className="font-medium">
                  {company.companyName}
                </TableCell>
                <TableCell>{company.location}</TableCell>
                <TableCell>
                  {!company.websiteUrl ? (
                    "Not specefied"
                  ) : (
                    <div className="flex items-center gap-1 text-sm text-primary hover:text-sky-800">
                      <Globe className="h-3 w-3" />
                      <a
                        href={company.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="truncate"
                      >
                        {company.websiteUrl?.replace("https://", "")}
                      </a>
                    </div>
                  )}
                </TableCell>
                <TableCell>{company.industry ?? "Not specefied"}</TableCell>
                <TableCell>
                  <Badge className={`${getTotalJobsStyles(company.totalJobs)}`}>
                    {company.totalJobs}
                  </Badge>
                </TableCell>
                <TableCell>{company.phoneNumber ?? "Not specefied"}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-5">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onShowInfo(company)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          onEditCompany(company.companyId);
                        }}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDeleteCompany(company)}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {companies && companies.length > 10 && (
        <TablePagination
          paginationInfo={paginationInfo}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
