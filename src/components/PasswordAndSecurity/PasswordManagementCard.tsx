import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { ChangePasswordThunk } from "@/features/auth/authThunk";
import type { AppDispatch } from "@/store";
import { Eye, EyeOff, Key } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import InlineToast from "../Toasts/InlineToast";
import PasswordInput from "../PasswordInput";

const PasswordManagementCard = () => {
  const [error, setError] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector(selectCurrentUser);

  const handlePasswordChange = () => {
    setError("");

    dispatch(
      ChangePasswordThunk({
        id: currentUser?.id ?? -1,
        currentPassword: currentPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      })
    ).then((result) => {
      if (ChangePasswordThunk.fulfilled.match(result)) {
        toast.success("Password updated", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setIsChangingPassword(false);
      } else if (ChangePasswordThunk.rejected.match(result)) {
        setError(result.payload ?? "Wrong current password");
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          Password Management
        </CardTitle>
        <CardDescription>
          Change your password to keep your account secure
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isChangingPassword ? (
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium">Current Password</Label>
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">
                  {showPassword ? "mypassword123" : "••••••••••"}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsChangingPassword(true)}
            >
              Change Password
            </Button>
          </div>
        ) : (
          <>
            {error && <InlineToast type="error" message={error} />}
            <div className="space-y-4 max-w-md">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <PasswordInput
                  id="current-password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <PasswordInput
                  id="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <PasswordInput
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  className="bg-sky-600 hover:bg-sky-700"
                  onClick={handlePasswordChange}
                  disabled={
                    !currentPassword ||
                    !newPassword ||
                    newPassword !== confirmPassword
                  }
                >
                  Update Password
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsChangingPassword(false);
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PasswordManagementCard;
