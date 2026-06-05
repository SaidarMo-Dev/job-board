import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { ConfirmEmailByCode } from "../../authApi";
import axios from "axios";
import type { ApiResponse } from "@/shared/types/ApiResponse";
import { formatTime } from "@/utils/stringUtils";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { resendCodeThunk } from "../../authThunk";
export function ConfirmEmail() {
  const [count, setCount] = useState(0);
  const dispatch = useAppDispatch();

  const [isPending, setIsPending] = useState(false);

  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  // code change handler: Update the corresponding index of the verificationCode state, and auto-focus the next input box if value is not empty
  function handleCodeChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return; // Only allow numbers
    setVerifyError("");
    if (value.length <= 1) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
      // Auto-submit check using the FRESH array data
      const isComplete = newCode.every((digit) => digit !== "");
      if (isComplete) {
        const fullCode = newCode.join("");
        handleVerifyCode(fullCode);
      }
    }
  }

  function handleKeyDown(
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }

    // Allow users to use left and right arrow keys to navigate between input boxes
    if (e.key === "ArrowLeft" && index > 0) {
      document.getElementById(`code-${index - 1}`)?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      document.getElementById(`code-${index + 1}`)?.focus();
    }
  }

  const [verifyError, setVerifyError] = useState<string>("");

  const email = sessionStorage.getItem("userEmail") ?? "";
  const navigate = useNavigate();

  // verify code handler: Call API to verify the code, if success navigate to success page, if error show error message
  const handleVerifyCode = async (code?: string) => {
    setIsPending(true);

    try {
      const freshCode = code ?? verificationCode.join("");

      const response = await ConfirmEmailByCode(email, freshCode);
      if (response.succeeded) {
        sessionStorage.setItem("emailVerified", "true");
        navigate("/auth/confirm-email/success", {
          replace: true,
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const res = error.response?.data as ApiResponse<string>;
        setVerifyError(res.message ?? "Something went wrong!");
      } else setVerifyError("Something went wrong!");
    } finally {
      setIsPending(false);
    }
  };

  const handleResendCode = () => {
    setCount(70);
    dispatch(resendCodeThunk({ email: email }));
  };

  useEffect(() => {
    if (count <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [count]);

  // Paste feature: Allow users to paste the 6-digit code directly into the first input box
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    // Check if pasted content is a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const newCode = pastedData.split("");
      setVerificationCode(newCode);

      // Focus the last input box
      document.getElementById("code-5")?.focus();
    }
  };

  return (
    <div className="max-w-[450px] border border-gray-200 rounded-lg shadow-lg p-7 mx-auto mb-3">
      <div className="flex flex-col items-center">
        {/* Logo  */}

        <div className="w-15 h-15 rounded-full bg-sky-100 flex items-center justify-center p-3">
          <Mail className="h-8 w-8 text-sky-600" />
        </div>
        <h2 className="font-bold text-3xl my-3">Check your email</h2>
        <p className="text-gray-500">We sent a verification code to {email}</p>

        <h4 className="text-gray-500 mt-7">Enter the 6-digit code</h4>
        <div className="flex justify-center gap-2 items-center mt-5">
          {verificationCode.map((digit, index) => (
            <Input
              key={index}
              id={`code-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              disabled={isPending}
              onPaste={handlePaste}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`w-12 h-12 text-center text-lg font-semibold ${
                verifyError ? "border-red-500" : ""
              }`}
            />
          ))}
        </div>
        {verifyError && (
          <p className="text-red-500 my-1 text-center">{verifyError}</p>
        )}

        <Button
          className="bg-primary hover:bg-sky-700 cursor-pointer w-full p-5 mt-5 disabled:bg-accent disabled:text-gray-500 disabled:cursor-not-allowed"
          onClick={() => handleVerifyCode()}
          disabled={isPending || verificationCode.some((digit) => !digit)}
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify email"
          )}
        </Button>
        <h4 className="text-gray-500 mt-5">Didn't receive the code?</h4>
        {count === 0 ? (
          <Button
            variant={"secondary"}
            size="lg"
            className="my-2 bg-transparent shadow-none text-primary cursor-pointer"
            onClick={handleResendCode}
          >
            Resend code
          </Button>
        ) : (
          <span className="text-primary font-medium text-xl tracking-wider bg-primary/6 px-5 py-1 rounded-lg my-3">
            {formatTime(count)}
          </span>
        )}

        <Link to="/auth/login">
          <Button
            variant="secondary"
            size="lg"
            className="w-full bg-transparent shadow-none text-gray-600 cursor-pointer"
          >
            <ArrowLeft className="mr-3" />
            Back to login
          </Button>
        </Link>
      </div>
    </div>
  );
}
