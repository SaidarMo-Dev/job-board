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
  const currentEmail = "";

  function handleSendVerification() {}
  function handleCloseModals() {}
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
                value={currentEmail}
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
              className="flex-1"
              onClick={() => onNext(newEmail)}
              disabled={!newEmail || newEmail === currentEmail}
            >
              Send Verification
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
