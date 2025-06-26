import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Key } from "lucide-react";
import React, { useState } from "react";

interface PasswordManagementCardProps {
  onPasswordChange?: (current: string, next: string) => void;
}

const PasswordManagementCard: React.FC<PasswordManagementCardProps> = ({
  onPasswordChange,
}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = () => {
    // TODO : handle password change logic
    if (onPasswordChange) {
      onPasswordChange(currentPassword, newPassword);
    }
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
          <div className="space-y-4 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </div>
            <div className="flex gap-2">
              <Button
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
        )}
      </CardContent>
    </Card>
  );
};

export default PasswordManagementCard;
