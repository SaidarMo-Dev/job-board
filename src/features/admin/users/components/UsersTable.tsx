import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableUserRow from "./TableUserRow";
import type { UserManagement } from "../usersTypes";
import TablePagination from "./TablePagination";

const normalFields = [
  "User",
  "Email",
  "Phone",
  "Gender",
  "Role",
  "Status",
  "Join Date",
];

// fake user data
const fakeUsersData: UserManagement[] = [
  {
    id: 1,
    name: "John Doe",
    gender: "male",
    phone: "+222 87463432",
    email: "john.doe@example.com",
    role: "Admin",
    status: "active",
    joinDate: "2024-01-15",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    gender: "female",
    phone: "+222 434333432",
    email: "sarah.j@company.com",
    role: "Employer",
    status: "active",
    joinDate: "2024-02-20",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Mike Chen",
    gender: "male",
    phone: "+222 324783432",
    email: "mike.chen@email.com",
    role: "JobSeeker",
    status: "suspended",
    joinDate: "2024-03-10",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Emily Davis",
    gender: "female",
    phone: "+222 434098432",
    email: "emily.davis@jobseeker.com",
    role: "JobSeeker",
    status: "active",
    joinDate: "2024-01-28",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Robert Wilson",
    gender: "male",
    phone: "+222 54352255",
    email: "r.wilson@corp.com",
    role: "Employer",
    status: "active",
    joinDate: "2024-02-14",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];
export default function UserTable() {
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
            {fakeUsersData.map((user) => {
              return <TableUserRow user={user} />;
            })}
          </TableBody>
        </Table>
      </div>
      <TablePagination />
    </div>
  );
}
