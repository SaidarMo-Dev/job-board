import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";
import React from "react";
import { Link } from "react-router";

interface SecuritySettingsCardProps {
  onSetupRecovery: () => void;
}

const SecuritySettingsCard: React.FC<SecuritySettingsCardProps> = () => (
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
          <Label className="text-base font-medium">Account Recovery</Label>
          <p className="text-sm text-muted-foreground">
            Set up recovery options in case you lose access to your account
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Link to={"/members/password-security/account-recovery"}>
            Setup Recovery
          </Link>
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default SecuritySettingsCard;
