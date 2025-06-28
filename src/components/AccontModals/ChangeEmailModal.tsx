import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { useDispatch } from "react-redux";
import { SendChangeEmailVerificationThunk } from "@/features/auth/authThunk";
import InlineToast from "../Toasts/InlineToast";

interface ChangeEmailModelProps {
  open: boolean;
  onClose: () => void;
  onNext: (newEmail: string) => void;
}

export function ChangeEmailModal({
  open,
  onClose,
  onNext,
}: ChangeEmailModelProps) {
  const [newEmail, setNewEmail] = useState("");
  const [error, setError] = useState<string>("");
  const UserEmail = useSelector(
    (state: RootState) => state.authReducer.currentUser?.email
  );

  const dispatch = useDispatch<AppDispatch>();

  function handleSendVerification() {
    setError("");
    dispatch(
      SendChangeEmailVerificationThunk({
        currentEmail: UserEmail ?? "",
        newEmail,
      })
    ).then((result) => {
      if (SendChangeEmailVerificationThunk.fulfilled.match(result)) {
        onNext(newEmail);
        setNewEmail("");
      } else if (SendChangeEmailVerificationThunk.rejected.match(result)) {
        setError(result.payload ?? "");
      }
    });
  }
  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            onClose();
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            {error && (
              <InlineToast
                type="error"
                onClose={() => setError("")}
                message={error}
              />
            )}
            <DialogTitle>Change Email Address</DialogTitle>
            <DialogDescription>
              Enter your new email address. We'll send a verification code to
              confirm the change.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label>Current Email</label>
              <Input
                id="current-email"
                value={UserEmail}
                disabled
                className="bg-muted"
              />
            </div>

            <div className="space-y-2">
              <label>New Email Address</label>
              <Input
                id="new-email"
                type="email"
                placeholder="Enter new email address"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button
              className="flex-1 bg-sky-600 hover:bg-sky-700 text-white cursor-pointer"
              onClick={handleSendVerification}
              disabled={!newEmail || newEmail === UserEmail}
            >
              Send Verification
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
