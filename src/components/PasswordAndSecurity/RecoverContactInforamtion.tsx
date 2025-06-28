import { Mail } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { set } from "date-fns";
import { useState } from "react";

export default function RecoverContactInformation() {
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [recoveryPhone, setRecoveryPhone] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Mail className="h-5 w-5" />
          <span>Recovery Contact Information</span>
        </CardTitle>
        <CardDescription>
          Add alternative contact methods for account recovery
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="recovery-email">Recovery Email Address</Label>
          <Input
            id="recovery-email"
            type="email"
            placeholder="recovery@example.com"
            value={recoveryEmail}
            onChange={(e) => setRecoveryEmail(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            This should be different from your primary email address
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="recovery-phone">Recovery Phone Number</Label>
          <Input
            id="recovery-phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={recoveryPhone}
            onChange={(e) => setRecoveryPhone(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            We'll send SMS codes to this number for account recovery
          </p>
        </div>

        <div className="flex justify-end">
          <Button
            className="bg-sky-600 hover:bg-sky-700 text-white"
            disabled={!recoveryEmail || !recoveryPhone}
          >
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
