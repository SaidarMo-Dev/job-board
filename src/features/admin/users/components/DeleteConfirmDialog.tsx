import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { verifyPassword } from "@/features/auth/authApi";
import { DeleteUser } from "@/features/users/userApi";
import { extractAxiosErrorMessage } from "@/utils/apiErrorHandler";

interface DeleteConfirmDailogProps {
  open: boolean;
  userId: number;
  onClose?: () => void;
}
export default function DeleteConfirmDailog({
  open,
  userId,
  onClose,
}: DeleteConfirmDailogProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!password.trim()) {
      setError("Password is required to confirm deletion");
      return;
    }

    try {
      setError("");
      setLoading(true);

      await verifyPassword(password);

      await DeleteUser(userId);

      toast.success("Deleted successfully.", {
        position: "bottom-left",
      });
      if (onClose) onClose();
    } catch (error) {
      
      setError(extractAxiosErrorMessage<string>(error));
    } finally {
      setLoading(false);
    }
  };

  function handleClose() {
    onClose?.();
  }
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <DialogTitle>Delete Account</DialogTitle>
          </div>
          <DialogDescription className="text-left">
            This action cannot be undone. This will permanently delete your
            account and remove all associated data from our servers.
          </DialogDescription>
        </DialogHeader>

        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Warning:</strong> All your data, including projects, files,
            and settings will be permanently lost.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Enter your password to confirm
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading || !password.trim()}
          >
            {loading ? "Deleting..." : "Delete Account"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
