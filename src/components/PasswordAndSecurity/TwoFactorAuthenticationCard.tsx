import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Smartphone } from "lucide-react";
import React from "react";

interface TwoFactorAuthenticationCardProps {
  onEnable2FA: () => void;
}

const TwoFactorAuthenticationCard: React.FC<
  TwoFactorAuthenticationCardProps
> = ({ onEnable2FA }) => (
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
            Secure your account with two-factor authentication using your phone
            or authenticator app
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={onEnable2FA}>
          Enable 2FA
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default TwoFactorAuthenticationCard;
