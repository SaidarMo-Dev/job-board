import { TableCell, TableRow } from "@/components/ui/table";
import type { RoleType, UserManagement } from "../usersTypes";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useAppSelector";
import { deselectUser, selectSelectedUserIds, selectUser } from "../userSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";

interface TableUserRowProps {
  user: UserManagement;
}

export default function TableUserRow({ user }: TableUserRowProps) {
  const dispatch = useAppDispatch();
  function formatRole(role: RoleType) {
    if (role === "JobSeeker") return "Job Seeker";
    else return role;
  }

  function getStatusColor(status: boolean) {
    if (!status)
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200";
    else return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200";
  }

  function getRoleColor(role: RoleType) {
    switch (role) {
      case "Admin":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200";
      case "Employer":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200";
      case "JobSeeker":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-200";
    }
  }

  const selectedUserIds = useAppSelector(selectSelectedUserIds);

  const isChecked = selectedUserIds.has(user.id);

  const handleSelect = () => {
    if (isChecked) {
      dispatch(deselectUser(user.id));
    } else {
      dispatch(selectUser(user.id));
    }
  };
  return (
    <TableRow>
      <TableCell>
        <Checkbox
          className="data-[state=checked]:bg-sky-600 data-[state=checked]:border-none"
          checked={isChecked}
          onCheckedChange={handleSelect}
        />
      </TableCell>
      <TableCell>
        <div className="flex gap-2 items-center">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user.imagePath || "/placeholder.svg"}
              alt={user.fullName}
            />
            <AvatarFallback>
              {user.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <span className="font-medium">{user.fullName}</span>
        </div>
      </TableCell>
      <TableCell className="text-gray-600 dark:text-secondary-foreground">
        {user.email}
      </TableCell>
      <TableCell className="text-gray-600 dark:text-secondary-foreground">
        {user.phoneNumber ?? "Not specified"}
      </TableCell>
      <TableCell className="text-gray-600 dark:text-secondary-foreground">
        {user.gender ?? "Not specified"}
      </TableCell>
      <TableCell className="py-2">
        <Badge className={`${getRoleColor(user.role as RoleType)}`}>
          {formatRole(user.role as RoleType)}
        </Badge>
      </TableCell>
      <TableCell className="py-2">
        <Badge className={`${getStatusColor(user.isDeleted)}`}>
          {user.isDeleted ? "Suspended" : "Active"}
        </Badge>
      </TableCell>
      <TableCell className="text-gray-600 dark:text-secondary-foreground">
        {user.dateofBirth
          ? user.dateofBirth.toLocaleDateString()
          : "Not specified"}
      </TableCell>
      <TableCell className="text-gray-600 flex justify-center items-center dark:text-secondary-foreground">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="py-6">
            <Button variant={"ghost"} size={"sm"}>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Edit />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600 hover:bg-red-50 hover:!text-red-700 dark:text-red-300 dark:hover:bg-red-900/30">
              <Trash2 className="w-4 h-4 mr-2 text-red-600 dark:text-red-300" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
