import { useState } from "react";
import {
  Shield,
  Eye,
  EyeOff,
  Mail,
  Key,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function PasswordSecurityPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleEmailSave = () => {
    setIsEditingEmail(false);
    // TODO : handle email change
  };

  const handlePasswordChange = () => {
    if (newPassword === confirmPassword) {
      // TODO : handle change password

      setIsChangingPassword(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-10">
      <div className="custom-container max-w-4xl">
        <div className="mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Password & Security
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your account security and authentication settings
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Account Information
              </CardTitle>
              <CardDescription>
                Update your email address and basic account details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1 flex-1">
                  <Label className="text-base font-medium">Email Address</Label>
                  {isEditingEmail ? (
                    <div className="flex gap-2 mt-2 max-w-md">
                      <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1"
                        type="email"
                      />
                      <Button size="sm" onClick={handleEmailSave}>
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEmail("ilink.panel@gmail.com");
                          setIsEditingEmail(false);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">{email}</p>
                  )}
                </div>
                {!isEditingEmail && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditingEmail(true)}
                  >
                    Edit
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Password Management */}
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
                    <Label className="text-base font-medium">
                      Current Password
                    </Label>
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
                    <Label htmlFor="confirm-password">
                      Confirm New Password
                    </Label>
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

          {/* Two-Factor Authentication */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Two-Factor Authentication
              </CardTitle>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Label className="text-base font-medium">2FA Status</Label>
                    <Badge variant="secondary">Not Enabled</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Secure your account with two-factor authentication using
                    your phone or authenticator app
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Enable 2FA
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Additional security options for your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-medium">
                    Login Activity
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    View recent login attempts and active sessions
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  View Activity
                </Button>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-medium">
                    Account Recovery
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Set up recovery options in case you lose access to your
                    account
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Setup Recovery
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
