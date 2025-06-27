import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { useState } from "react";
import ChangeEmail from "./ChangeEmail";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

const AccountInformationCard = () => {
  const UserEmail = useSelector(
    (state: RootState) => state.authReducer.currentUser?.email
  );

  const [isEditing, setIsEditing] = useState(false);
  return (
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
            <p className="text-sm text-muted-foreground">{UserEmail}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Edit
          </Button>
        </div>
      </CardContent>
      <ChangeEmail open={isEditing} onClose={() => setIsEditing(false)} />
    </Card>
  );
};

export default AccountInformationCard;
