import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Input } from "../ui/input";

interface VerificationCodeModelProps {
  newEmail: string;
  open: boolean;
  onBack: () => void;
  onComplete: () => void;
}
export default function VerificationCodeModal({
  newEmail,
  open,
  onBack,
  onComplete,
}: VerificationCodeModelProps) {
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  function handleCodeChange(index: number, value: string) {}
  function handleKeyDown(
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) {}
  function handleVerifyCode() {}
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Verify Email Address</DialogTitle>
          <DialogDescription>
            Enter the 6-digit verification code sent to {newEmail}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <Label htmlFor="verification-code" className="text-center block">
              Verification Code
            </Label>
            <div className="flex gap-2 justify-center">
              {verificationCode.map((digit, index) => (
                <Input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-lg font-semibold"
                />
              ))}
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              {"Didn't receive the code?"}
            </p>
            <Button variant="link" className="p-0 h-auto text-sm">
              Resend code
            </Button>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onBack}>
            Back
          </Button>
          <Button
            className="flex-1"
            onClick={onComplete}
            disabled={verificationCode.some((digit) => !digit)}
          >
            Verify & Update
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
