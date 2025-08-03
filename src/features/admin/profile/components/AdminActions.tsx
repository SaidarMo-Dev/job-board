import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Edit, KeyRound, LogOut } from "lucide-react";
import { useState } from "react";
import EditProfileDialog from "../dialogs/EditProfileDialog";
import { useAppSelector } from "@/hooks/useAppSelector";
import ChangePasswordDialog from "../dialogs/ChangePasswordDialog";
import LogoutDialog from "../dialogs/LogoutDialog";

export default function AdminActions() {
  const [openAction, setOpenAction] = useState({
    edit: false,
    changePassword: false,
    logout: false,
  });

  const currentUser = useAppSelector((state) => state.adminAuthReducer.admin);
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start bg-transparent"
            size="sm"
            onClick={() => setOpenAction({ ...openAction, edit: true })}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start bg-transparent"
            size="sm"
            onClick={() =>
              setOpenAction({ ...openAction, changePassword: true })
            }
          >
            <KeyRound className="h-4 w-4 mr-2" />
            Change Password
          </Button>

          <Separator />

          <Button
            variant="outline"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
            size="sm"
            onClick={() => setOpenAction({ ...openAction, logout: true })}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Log Out
          </Button>
        </CardContent>
      </Card>

      <EditProfileDialog
        user={currentUser!}
        open={openAction.edit}
        onClose={() => {
          setOpenAction((prev) => ({ ...prev, edit: false }));
        }}
      />
      <ChangePasswordDialog
        open={openAction.changePassword}
        onClose={() =>
          setOpenAction((prev) => ({ ...prev, changePassword: false }))
        }
      />

      <LogoutDialog
        open={openAction.logout}
        onClose={() => setOpenAction({ ...openAction, logout: false })}
      />
    </>
  );
}
