import ErrorField from "@/components/ErrorField";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROUTES } from "@/constants/routes";
import { useVerificationCode } from "@/hooks/useverificationCode";
import { isEmailValid } from "@/utils/Validations";
import { ArrowLeft, CheckCircle, Mail } from "lucide-react";
import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  confirmResetPasswordCode,
  sendResetPasswordCode,
} from "../auth/authApi";
import { extractAxiosErrorMessage } from "@/utils/apiErrorHandler";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const {
    verificationCode,
    setVerificationCode,
    handleCodeChange,
    handleCodePaste,
    handleKeyDown,
    inputsRef,
    code,
  } = useVerificationCode(6);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isEmailValid(email)) {
      setError("Invalid email address");
      return;
    }

    setLoading(true);

    try {
      const res = await sendResetPasswordCode(email);
      if (!res.succeeded) setError(res.message);
    } catch (err) {
      setError(extractAxiosErrorMessage(err));
    } finally {
      setLoading(false);
      setIsSubmitted(true);
    }
  };

  const resetStates = useCallback(() => {
    setEmail("");
    setVerificationCode(["", "", "", "", "", ""]);
    setError("");
    setIsSubmitted(false);
  }, [setVerificationCode]);

  const handleEmailChange = useCallback((value: string) => {
    setEmail(value);

    if (!isEmailValid(value)) {
      setError("Invalid email address");
    } else {
      setError("");
    }
  }, []);

  const confirmResetPassword = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await confirmResetPasswordCode(email, code);
      if (!response.succeeded) {
        setError(response.message);
        return;
      }

      navigate(ROUTES.PRIVATE.RESET_PASSWORD, {
        state: { resetToken: response.data },
      });
      
    } catch (err) {
      setError(extractAxiosErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [code, email, navigate]);

  const setInputRef = useCallback(
    (ie: HTMLInputElement | null, index: number) => {
      inputsRef.current[index] = ie;
    },
    [inputsRef]
  );

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">
              Check Your Email
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Step 2 of 3 - Email confirmation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Mail className="h-4 w-4" />
              <AlertDescription>
                We've sent a password reset code to <strong>{email}</strong>.
                Enter it below to continue.
              </AlertDescription>
            </Alert>
            {/* Hidden helper text for screen readers */}
            <p id="verification-instructions" className="sr-only">
              Enter the 6-digit verification code we sent to your email.
            </p>
            <div className="flex justify-center gap-2 items-center my-3">
              {verificationCode.map((digit, index) => (
                <Input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    setError("");
                    handleCodeChange(index, e.target.value);
                  }}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handleCodePaste}
                  aria-label={`Verification code digit ${index + 1} of ${
                    verificationCode.length
                  }`}
                  aria-describedby="verification-instructions"
                  className={`w-12 h-12 text-center text-lg font-semibold ${
                    error ? "border-red-500" : ""
                  }`}
                  ref={(ie) => {
                    setInputRef(ie, index);
                  }}
                />
              ))}
            </div>
            {error && <ErrorField message={error} />}

            <div className="text-sm text-muted-foreground text-center">
              <p>
                Didn't receive the email? Check your spam folder or your email
                address may not exist.
              </p>
              <Button
                variant="link"
                className="p-0 h-auto text-primary"
                onClick={resetStates}
              >
                Try again with a different email
              </Button>
            </div>
            <div className="pt-4 space-y-2">
              <Button
                className="w-full"
                onClick={confirmResetPassword}
                disabled={code.length < 6 || loading}
              >
                Continue to Reset Password
              </Button>

              <Link to={ROUTES.LOGIN} className="block">
                <Button variant="outline" className="w-full bg-transparent">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Login
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Forgot Password?</CardTitle>
          <CardDescription className="text-muted-foreground">
            Step 1 of 3 - Enter your email address
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                aria-describedby={error ? "email-error" : undefined}
                className={`w-full ${error ? "border-red-500" : ""}`}
              />
              {error && <ErrorField message={error} />}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={error !== "" || !email || loading}
            >
              Send Reset Link
            </Button>

            <div className="text-center">
              <Link to={ROUTES.LOGIN}>
                <Button variant="link" className="text-muted-foreground">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Login
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
