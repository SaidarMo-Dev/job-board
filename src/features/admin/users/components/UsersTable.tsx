import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableUserRow from "./TableUserRow";
import TablePagination from "./TablePagination";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectAdminUsers, selectUsersPagination } from "../userSlice";
import type { UserFilterValues } from "../usersTypes";

const normalFields = [
  "User",
  "Email",
  "Phone",
  "Gender",
  "Role",
  "Status",
  "Date of Birth",
];

interface UserTableProps {
  onFilterChange: (newFilter: Partial<UserFilterValues>) => void;
}

export default function UserTable({ onFilterChange }: UserTableProps) {
  const users = useAppSelector(selectAdminUsers);
  const usersPagination = useAppSelector(selectUsersPagination);
  return (
    <div className="border-1 rounded-md shadow-[0_1px_3px_0_rgba(0,0,0,0.05)]">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px] py-3">
                <Checkbox className="data-[state=checked]:bg-sky-600 data-[state=checked]:border-none" />
              </TableHead>
              {normalFields.map((field) => (
                <TableHead className="text-gray-500 dark:text-gray-200">
                  {field}
                </TableHead>
              ))}
              <TableHead className="text-gray-500  dark:text-gray-200">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users ? (
              users.map((user) => {
                return <TableUserRow user={user} />;
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={10}
                  className="text-gray-500 text-center py-8"
                >
                  No users found matching your criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {users && (
        <TablePagination
          paginationInfo={usersPagination}
          onPageChange={(page) => onFilterChange({ page: page })}
        />
      )}
    </div>
  );
}
