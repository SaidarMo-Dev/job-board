import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export function ConfirmEmail() {
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
  const [verifyError, setError] = useState<string>("");

  const navigate = useNavigate();
  const handleVerifyCode = () => {
    // TODO : Verify email
    sessionStorage.setItem("emailVerified", "true");
    navigate("/auth/confirm-email/success", {
      replace: true,
    });
  };

  return (
    <div className="max-w-[450px] border border-gray-200 rounded-lg shadow-lg p-7 mx-auto mb-3">
      <div className="flex flex-col items-center">
        {/* Logo  */}
        <div className="w-15 h-15 rounded-full bg-sky-100 flex items-center justify-center p-3">
          <Mail className="h-8 w-8 text-sky-600" />
        </div>
        <h2 className="font-bold text-3xl my-3">Check your email</h2>
        <p className="text-gray-500">We sent a verification code to you!</p>

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
          className="bg-sky-600 hover:bg-sky-700 cursor-pointer w-full p-5 mt-5"
          onClick={handleVerifyCode}
          disabled={verificationCode.some((digit) => !digit)}
        >
          Verify email
        </Button>
        <h4 className="text-gray-500 mt-5">Didn't receive the code?</h4>
        <Button
          variant={"secondary"}
          size="lg"
          className="my-6 bg-transparent shadow-none text-sky-600 cursor-pointer"
        >
          Resend code
        </Button>
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
