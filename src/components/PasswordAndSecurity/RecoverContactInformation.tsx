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
import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { AddRecoveryContactInformationThunk } from "@/features/auth/authThunk";
import { useSelector } from "react-redux";
import { Slide, toast } from "react-toastify";
import UserInfoLabel from "../BasicUserCardComponents/UserInfoLabel";
import AddButton from "../BasicUserCardComponents/AddButton";
import { selectCurrentUserRecoveryInfo } from "@/features/auth/authSlice";
import InlineToast from "../Toasts/InlineToast";

export default function RecoverContactInformation() {
  const CurrentUserRecoveryInfo = useSelector(selectCurrentUserRecoveryInfo);
  const [recoveryEmail, setRecoveryEmail] = useState(
    CurrentUserRecoveryInfo.recoveryEmail ?? ""
  );
  const [recoveryPhone, setRecoveryPhone] = useState(
    CurrentUserRecoveryInfo.recoveryPhone ?? ""
  );
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector(
    (state: RootState) => state.authReducer.currentUser?.id
  );

  const handleSave = () => {
    setError(null); // Reset error state
    dispatch(
      AddRecoveryContactInformationThunk({
        userId: userId ?? -1,
        email: recoveryEmail,
        phoneNumber: recoveryPhone,
      })
    ).then((result) => {
      if (AddRecoveryContactInformationThunk.fulfilled.match(result)) {
        toast.success("Recovery contact Saved Successfully", {
          position: "bottom-left",
          transition: Slide,
        });
        setIsEditing(false);
      } else {
        setError(
          result.payload ?? "Something went wrong while saving recovery contact"
        );
      }
    });
  };
  return (
    <div className="my-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between space-x-2 ">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              <span className="font-semibold text-2xl">
                Recovery Contact Information
              </span>
            </div>
            {!isEditing && (
              <Button
                variant={"outline"}
                size={"sm"}
                className="w-20 cursor-pointer"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
            )}
          </CardTitle>
          <CardDescription>
            Add alternative contact methods for account recovery
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {error && <InlineToast type="error" message={error} />}
          <div className="space-y-3 mt-3">
            <Label htmlFor="recovery-email" className="">
              Recovery Email Address
            </Label>
            {isEditing ? (
              <div>
                <Input
                  className="py-5"
                  id="recovery-email"
                  type="email"
                  placeholder="recovery@example.com"
                  value={recoveryEmail}
                  onChange={(e) => setRecoveryEmail(e.target.value)}
                />
              </div>
            ) : (
              <div>
                {recoveryEmail ? (
                  <UserInfoLabel fieldInfo={recoveryEmail} />
                ) : (
                  <AddButton
                    field="recovery email"
                    onClick={() => setIsEditing(true)}
                  />
                )}
              </div>
            )}
            <p className="text-xs text-muted-foreground -mt-1">
              This should be different from your primary email address
            </p>
          </div>

          <div className="space-y-3 mt-6">
            <Label htmlFor="recovery-phone">Recovery Phone Number</Label>

            {isEditing ? (
              <div>
                <Input
                  className="py-5"
                  id="recovery-phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={recoveryPhone}
                  onChange={(e) => setRecoveryPhone(e.target.value)}
                />
              </div>
            ) : (
              <div>
                {recoveryPhone ? (
                  <UserInfoLabel fieldInfo={recoveryPhone} />
                ) : (
                  <AddButton
                    field="recovery phone"
                    onClick={() => setIsEditing(true)}
                  />
                )}
              </div>
            )}

            <p className="text-xs text-muted-foreground -mt-1">
              We'll send SMS codes to this number for account recovery
            </p>
          </div>

          {isEditing && (
            <div className="flex justify-end space-x-3">
              <Button
                variant={"outline"}
                className="w-30 cursor-pointer"
                onClick={() => {
                  setIsEditing(false);
                  setRecoveryEmail(CurrentUserRecoveryInfo.recoveryEmail ?? "");
                  setRecoveryPhone(CurrentUserRecoveryInfo.recoveryPhone ?? "");
                }}
              >
                Cancel
              </Button>

              <Button
                className="bg-sky-600 hover:bg-sky-700 text-white w-40 cursor-pointer"
                disabled={!recoveryEmail || !recoveryPhone}
                onClick={handleSave}
              >
                Save
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
