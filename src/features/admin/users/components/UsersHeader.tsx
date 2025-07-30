import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function UsersHeader() {
  return (
    <header className="border-1 border-gray-200 dark:border-secondary p-5 rounded-md shadow-[0_1px_3px_0_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold text-2xl mb-1">User Management</h2>
          <span className="text-gray-500 dark:text-gray-300">
            Manage users, roles, and permissions
          </span>
        </div>
        <Button
          size={"lg"}
          className="bg-sky-600 dark:bg-secondary-foreground dark:hover:bg-gray-300 hover:bg-sky-700 cursor-pointer"
        >
          <Plus /> Add New User
        </Button>
      </div>
    </header>
  );
}
