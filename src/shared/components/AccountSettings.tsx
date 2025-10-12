import { Link } from "react-router";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { useState } from "react";

import { deleteUserThunk } from "@/features/admin/users/userThunk";
import { logout, selectCurrentUser } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import ConfirmDeleteUserDailog from "@/dialogs/ConfirmDeleteDialog";

export default function AccountSettings() {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectCurrentUser)?.id ?? -1;

  const handleDelete = async () => {
    await dispatch(deleteUserThunk({ Id: userId })).unwrap();
    await dispatch(logout());
  };

  return (
    <>
      <Card className="shadow-sm">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="text-sm text-gray-600">
              Looking to change your email? You can edit it from the
              <Link
                to="/members/password-security"
                className="p-0 h-auto text-blus-600 font-medium underline-offset-4 hover:underline"
              >
                Password and Security page
              </Link>
              .
            </div>
            <div className="pt-4 border-t">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setConfirmDelete(true)}
              >
                Close my account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <ConfirmDeleteUserDailog
        open={confirmDelete}
        onDelete={handleDelete}
        onClose={setConfirmDelete}
      />
    </>
  );
}
