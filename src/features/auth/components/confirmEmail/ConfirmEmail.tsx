import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { ConfirmEmailByCode } from "../../authApi";
import axios from "axios";
import type { ApiResponse } from "@/shared/types/ApiResponse";
import { formatTime } from "@/utils/stringUtils";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { resendCodeThunk } from "../../authThunk";
import { useAppSelector } from "@/hooks/useAppSelector";
export function ConfirmEmail() {
  const [count, setCount] = useState(0);
  const dispatch = useAppDispatch();
  const resendError = useAppSelector((state) => state.authReducer.error);

  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  function handleCodeChange(index: number, value: string) {
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
  const [verifyError, setVerifyError] = useState<string>("");

  const email = sessionStorage.getItem("userEmail") ?? "";
  const navigate = useNavigate();
  const handleVerifyCode = async () => {
    try {
      const response = await ConfirmEmailByCode(
        email,
        verificationCode.join("")
      );
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

  return (
    <div className="max-w-[450px] border border-gray-200 rounded-lg shadow-lg p-7 mx-auto mb-3">
      <div className="flex flex-col items-center">
        {/* handle resend error */}
        {resendError && (
          <span className="bg-red-50 text-red-500 py-1 px-3 rounded-md font-medium mb-2">
            {resendError}
          </span>
        )}

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
          className="bg-primary hover:bg-sky-700 cursor-pointer w-full p-5 mt-5"
          onClick={handleVerifyCode}
          disabled={verificationCode.some((digit) => !digit)}
        >
          Verify email
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
