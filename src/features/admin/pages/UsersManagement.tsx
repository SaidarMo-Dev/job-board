import UsersHeader from "../users/components/usersHeader";
import UserTable from "../users/components/UsersTable";

export default function UsersManagement() {
  return (
    <div className="space-y-6">
      <UsersHeader />
      <UserTable />
    </div>
  );
}
