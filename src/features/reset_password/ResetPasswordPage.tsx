"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Eye, EyeOff, Lock } from "lucide-react";
import { Link, useLocation } from "react-router";
import { resetPassword } from "../auth/authApi";
import { extractAxiosErrorMessage } from "@/utils/apiErrorHandler";
import Loader from "@/components/Loaders/Loader";
import { ROUTES } from "@/constants/routes";

interface PasswordStrength {
  score: number;
  feedback: string[];
}

export default function ResetPasswordPage() {
  const location = useLocation();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const calculatePasswordStrength = (password: string): PasswordStrength => {
    let score = 0;
    const feedback: string[] = [];

    if (password.length >= 8) {
      score += 20;
    } else {
      feedback.push("At least 8 characters");
    }

    if (/[A-Z]/.test(password)) {
      score += 20;
    } else {
      feedback.push("One uppercase letter");
    }

    if (/[a-z]/.test(password)) {
      score += 20;
    } else {
      feedback.push("One lowercase letter");
    }

    if (/\d/.test(password)) {
      score += 20;
    } else {
      feedback.push("One number");
    }

    if (/[^A-Za-z0-9]/.test(password)) {
      score += 20;
    } else {
      feedback.push("One special character");
    }

    return { score, feedback };
  };

  const passwordStrength = calculatePasswordStrength(password);

  const getStrengthText = (score: number) => {
    if (score < 60) return "Weak";
    if (score < 75) return "Medium";
    return "Strong";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setApiError("");
    setError("");
    e.preventDefault();
    if (password != confirmPassword) {
      setError("Passwords do not match");

      return;
    }

    setLoading(true);

    try {
      const res = await resetPassword(
        location.state?.resetToken ?? "",
        password,
        confirmPassword
      );
      if (!res.succeeded) {
        setError(res.message);
        return;
      } else {
        setIsSuccess(true);
      }
    } catch (err) {
      console.log(err);
      setApiError(extractAxiosErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };
  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold">
              Password Reset Successful
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Your password has been successfully updated
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                You can now log in with your new password.
              </AlertDescription>
            </Alert>

            <div className="mt-4">
              <Link to={ROUTES.LOGIN} replace>
                <Button className="w-full">Continue to Login</Button>
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
            <Lock className="h-6 w-6 text-primary" />
          </div>

          {/* api error  */}
          {apiError && (
            <div
              role="alert"
              className="text-sm text-red-400 ml-2 bg-red-50 p-2 rounded"
            >
              {apiError}
            </div>
          )}

          {/* start reset password card */}
          <CardTitle className="text-2xl font-bold">
            Create New Password
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Step 3 of 3 - Choose a strong, secure password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <Button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {password && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Password strength:</span>
                    <span
                      className={`font-medium ${
                        passwordStrength.score < 50
                          ? "text-destructive"
                          : passwordStrength.score < 75
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      {getStrengthText(passwordStrength.score)}
                    </span>
                  </div>
                  <Progress value={passwordStrength.score} className="h-2" />
                  {passwordStrength.feedback.length > 0 && (
                    <div className="text-sm text-muted-foreground">
                      <p>Password needs:</p>
                      <ul className="list-disc list-inside ml-2">
                        {passwordStrength.feedback.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pr-10"
                  aria-describedby="password-error"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            {error && (
              <div
                id="password-error"
                role="alert"
                className="text-sm text-red-500 ml-2 bg-red-50 p-2 rounded"
              >
                {error}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              Update Password
              {loading && (
                <Loader variant="dots" size="sm" color="text-white" />
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
