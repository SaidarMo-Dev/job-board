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
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import { VerifyEmailChangeThunk } from "@/features/auth/authThunk";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/authSlice";

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
  const userOldEmail = useSelector(selectCurrentUser)?.email;

  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  function handleCodeChange(index: number, value: string) {
    setError("");
    if (value.length <= 1) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  }
  function handleKeyDown(
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  }

  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string>("");

  function handleVerifyCode() {
    setError("");

    const code = verificationCode.join("");
    dispatch(
      VerifyEmailChangeThunk({ oldEmail: userOldEmail ?? "", newEmail, code })
    ).then((result) => {
      if (VerifyEmailChangeThunk.fulfilled.match(result)) {
        setVerificationCode(["", "", "", "", "", ""]);
        onComplete();
      } else if (VerifyEmailChangeThunk.rejected.match(result)) {
        setError("Incorrect verification code");
      }
    });
  }
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
                  className={`w-12 h-12 text-center text-lg font-semibold ${
                    error ? "border-red-500" : ""
                  }`}
                />
              ))}
            </div>
            {error && <p className="my-1 text-red-500 text-center ">{error}</p>}
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
            className="flex-1 bg-sky-600 hover:bg-sky-700 text-white cursor-pointer"
            onClick={handleVerifyCode}
            disabled={verificationCode.some((digit) => !digit)}
          >
            Verify & Update
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
