import PasswordInput from "@/shared/components/PasswordInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import PasswordStrength from "../components/PasswordStrength";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { ChangePasswordThunk } from "@/features/auth/authThunk";
import { toast } from "react-toastify";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectCurrentUser } from "@/features/auth/authSlice";

interface ChangePasswordDialogProps {
  open: boolean;
  onClose?: () => void;
}

export default function ChangePasswordDialog({
  open,
  onClose,
}: ChangePasswordDialogProps) {
  const currentUserId = useAppSelector(selectCurrentUser)?.id;

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const dispatch = useAppDispatch();

  function handleClose() {
    if (onClose) onClose();
  }

  const validatePasswordForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!passwordForm.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!passwordForm.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (passwordForm.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  function handleChangePassword() {
    const isValide = validatePasswordForm();
    if (!isValide) return;

    dispatch(
      ChangePasswordThunk({
        id: currentUserId ?? -1,
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
        confirmPassword: passwordForm.confirmPassword,
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
        handleClose();
      } else if (ChangePasswordThunk.rejected.match(result)) {
        toast.error(result.payload ?? "Wrong current password");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Enter your current password and choose a new secure password.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <div className="relative">
              <PasswordInput
                className={errors.currentPassword ? "border-red-500" : ""}
                id="current-password"
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    currentPassword: e.target.value,
                  })
                }
                placeholder="Enter current password"
              />
            </div>
            {errors.currentPassword && (
              <p className="text-sm text-red-500 mt-1">
                {errors.currentPassword}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <PasswordInput
                className={errors.newPassword ? "border-red-500" : ""}
                id="new-password"
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    newPassword: e.target.value,
                  })
                }
                placeholder="Enter new password"
              />
            </div>

            {/* handle password strength */}
            {passwordForm.newPassword && (
              <PasswordStrength password={passwordForm.newPassword} />
            )}
            {errors.newPassword && (
              <p className="text-sm text-red-500 mt-1">{errors.newPassword}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <div className="relative">
              <PasswordInput
                className={errors.confirmPassword ? "border-red-500" : ""}
                id="confirm-password"
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    confirmPassword: e.target.value,
                  })
                }
                placeholder="Confirm your password"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            className="bg-sky-600 hover:bg-sky-700 dark:bg-secondary-foreground dark:hover:bg-gray-300"
            onClick={handleChangePassword}
          >
            Change Password
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
