import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useWatch, type UseFormRegister } from "react-hook-form";

interface PasswordsInputProps {
  register: UseFormRegister<{
    firstName: string;
    email: string;
    password: string;
    lastName: string;
    confirmPassword: string;
    role: string;
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
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="relative">
          <input
            {...register("password")}
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            className="w-full h-11 px-3 py-2 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600 transition-colors"
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
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm password
        </label>
        <div className="relative">
          <input
            {...register("confirmPassword")}
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            className="w-full h-11 px-3 py-2 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600 transition-colors"
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
