import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { RoleType } from "@/features/admin/users/usersTypes";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { type UseFormRegister } from "react-hook-form";

interface PasswordsInputProps {
  register: UseFormRegister<{
    firstName: string;
    email: string;
    password: string;
    lastName: string;
    confirmPassword: string;
    role: RoleType;
  }>;
  errors?: {
    password?: {
      message?: string;
    };
    confirmPassword?: {
      message?: string;
    };
  };
}

export function PasswordsInput({ register, errors }: PasswordsInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <>
      <div className="space-y-2">
        <Label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </Label>
        <div className="relative">
          <Input
            {...register("password")}
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>

        {errors?.password && (
          <p className="text-sm text-red-400">{errors?.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm password
        </Label>
        <div className="relative">
          <Input
            {...register("confirmPassword")}
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showConfirmPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
        {errors?.confirmPassword && (
          <p className="text-sm text-red-400">
            {errors?.confirmPassword.message}
          </p>
        )}
      </div>
    </>
  );
}
