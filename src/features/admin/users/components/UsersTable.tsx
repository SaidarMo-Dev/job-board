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
import {
  selectAdminUsers,
  selectAreAllUsersOnPageSelected,
  selectFetchAdminUsersLoading,
  selectUsersPagination,
  toggleSelectAllOnPage,
} from "../userSlice";
import type { UserFilterValues } from "../usersTypes";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import Loader from "@/components/Loaders/Loader";

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
  const dispatch = useAppDispatch();

  const fetchLoading = useAppSelector(selectFetchAdminUsersLoading);
  const users = useAppSelector(selectAdminUsers);

  const areAllSelected = useAppSelector(selectAreAllUsersOnPageSelected);
  const handleSelectAll = () => {
    dispatch(toggleSelectAllOnPage());
  };
  const usersPagination = useAppSelector(selectUsersPagination);
  return (
    <div className="border-1 rounded-md shadow-[0_1px_3px_0_rgba(0,0,0,0.05)]">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px] py-3">
                <Checkbox
                  className="data-[state=checked]:bg-sky-600 data-[state=checked]:border-none"
                  checked={areAllSelected}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              {normalFields.map((field) => (
                <TableHead
                  key={field}
                  className="text-gray-500 dark:text-gray-200"
                >
                  {field}
                </TableHead>
              ))}
              <TableHead className="text-gray-500  dark:text-gray-200">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fetchLoading ? (
              <TableCell colSpan={10} className="p-7">
                <div className="m-auto w-full flex flex-col justify-center items-center">
                  <Loader variant="spinner" size="sm" />
                  <span className="text-gray-600 mt-1">Loading users...</span>
                </div>
              </TableCell>
            ) : users ? (
              users.map((user) => {
                return <TableUserRow key={user.id} user={user} />;
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
      {users?.length > 10 && (
        <TablePagination
          paginationInfo={usersPagination}
          onPageChange={(page) => onFilterChange({ page: page })}
        />
      )}
    </div>
  );
}
