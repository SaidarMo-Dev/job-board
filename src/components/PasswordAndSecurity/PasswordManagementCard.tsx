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
import React from "react";

interface PasswordManagementCardProps {
  isChangingPassword: boolean;
  showPassword: boolean;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  onShowPassword: () => void;
  onChangePassword: () => void;
  onCancel: () => void;
  onInputChange: (field: string, value: string) => void;
}

const PasswordManagementCard: React.FC<PasswordManagementCardProps> = ({
  isChangingPassword,
  showPassword,
  currentPassword,
  newPassword,
  confirmPassword,
  onShowPassword,
  onChangePassword,
  onCancel,
  onInputChange,
}) => (
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
              <Button variant="ghost" size="sm" onClick={onShowPassword}>
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={onChangePassword}>
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
              onChange={(e) => onInputChange("currentPassword", e.target.value)}
              placeholder="Enter current password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => onInputChange("newPassword", e.target.value)}
              placeholder="Enter new password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => onInputChange("confirmPassword", e.target.value)}
              placeholder="Confirm new password"
            />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={onChangePassword}
              disabled={
                !currentPassword ||
                !newPassword ||
                newPassword !== confirmPassword
              }
            >
              Update Password
            </Button>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </CardContent>
  </Card>
);

export default PasswordManagementCard;
