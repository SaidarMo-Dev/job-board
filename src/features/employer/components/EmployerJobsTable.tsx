"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Eye,
  Edit,
  MoreHorizontal,
  CheckCircle,
  Trash2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { getStatusBadgeVariant } from "@/features/admin/utils/getStatusVariant";
import TablePagination from "@/features/admin/users/components/TablePagination";
import type { PaginationInfo } from "@/features/admin/users/usersTypes";
import Loader from "@/components/Loaders/Loader";
import type { EmployerJob, employerJobActionType } from "../employerTypes";

interface JobsTableProps {
  jobs: EmployerJob[];
  selectedJobs: number[];
  onJobSelect: (jobId: number) => void;
  onSelectAll: (checked: boolean) => void;
  onJobAction: (action: employerJobActionType, job: EmployerJob) => void;
  sortBy: keyof EmployerJob;
  sortOrder: "asc" | "desc";
  onSort: (field: keyof EmployerJob) => void;
  pagination: PaginationInfo | null;
  onPageChange: (page: number) => void;
  loading?: boolean;
  error?: string;
}

export function EmployerJobsTable({
  jobs,
  selectedJobs,
  onJobSelect,
  onSelectAll,
  onJobAction,
  sortBy,
  sortOrder,
  onSort,
  pagination,
  onPageChange,
  loading,
  error,
}: JobsTableProps) {
  const allSelected = jobs.length > 0 && selectedJobs.length === jobs.length;
  const someSelected =
    selectedJobs.length > 0 && selectedJobs.length < jobs.length;

  const selectAllState = allSelected
    ? true
    : someSelected
    ? "indeterminate"
    : false;

  const getSortIcon = (field: string) => {
    if (sortBy !== field) return <ArrowUpDown className="h-4 w-4" />;
    return sortOrder === "asc" ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  };

  const SortableHeader = ({
    field,
    children,
  }: {
    field: keyof EmployerJob;
    children: React.ReactNode;
  }) => (
    <Button
      variant="ghost"
      className="h-auto p-0 font-semibold hover:bg-transparent"
      onClick={() => onSort(field)}
    >
      <div className="flex items-center gap-2">
        {children}
        {getSortIcon(field)}
      </div>
    </Button>
  );

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectAllState}
                onCheckedChange={onSelectAll}
              />
            </TableHead>
            <TableHead>
              <SortableHeader field="id">ID</SortableHeader>
            </TableHead>
            <TableHead>
              <SortableHeader field="title">Job Title</SortableHeader>
            </TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>
              <SortableHeader field="postedDate">Posted</SortableHeader>
            </TableHead>
            <TableHead>Expires</TableHead>
            <TableHead>Applicants</TableHead>
            <TableHead className="w-12">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={10} className="p-7">
                <div className="m-auto w-full flex flex-col justify-center items-center">
                  <Loader variant="spinner" size="sm" />
                  <span className="text-gray-600 mt-1">
                    Loading your jobs...
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ) : jobs.length === 0 ? (
            <TableRow>
              {error ? (
                <TableCell
                  colSpan={13}
                  className="text-center py-8 text-red-500"
                >
                  {error}
                </TableCell>
              ) : (
                <TableCell
                  colSpan={13}
                  className="text-center py-8 text-muted-foreground"
                >
                  No jobs found
                </TableCell>
              )}
            </TableRow>
          ) : (
            jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedJobs.includes(job.id)}
                    onCheckedChange={() => onJobSelect(job.id)}
                  />
                </TableCell>
                <TableCell className="font-mono text-sm">{job.id}</TableCell>
                <TableCell className="font-medium">{job.title}</TableCell>

                <TableCell className="max-w-32 truncate">
                  {job.location}
                </TableCell>
                <TableCell className="capitalize">{job.jobType}</TableCell>

                <TableCell>
                  <Badge
                    variant={getStatusBadgeVariant(job.status)}
                    className="capitalize"
                  >
                    {job.status}
                  </Badge>
                </TableCell>
                <TableCell>{job.postedDate.toString() ?? ""}</TableCell>
                <TableCell>
                  {job.expiryDate?.toString() ?? "Not Specefied"}
                </TableCell>
                <TableCell className="text-center">
                  {job.applicantsCount}
                </TableCell>

                {/* Actions */}
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => onJobAction("view", job)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onJobAction("edit", job)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />

                      {job.status === "Paused" && (
                        <DropdownMenuItem
                          onClick={() => onJobAction("paused", job)}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Activate
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => onJobAction("delete", job)}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
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

      {pagination && pagination.totalRecords > 10 && (
        <TablePagination
          paginationInfo={pagination}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
