import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { RoleType } from "@/features/admin/users/usersTypes";
import type { UseFormRegister } from "react-hook-form";

interface NameFieldsProps {
  errors?: {
    firstName?: {
      message?: string;
    };
    lastName?: {
      message?: string;
    };
  };

  register: UseFormRegister<{
    firstName: string;
    email: string;
    password: string;
    lastName: string;
    confirmPassword: string;
    role: RoleType;
  }>;
  direction?: "row" | "col";
}

export function NameInputs({
  errors,
  register,
  direction = "row",
}: NameFieldsProps) {
  return (
    <div
      className={`grid gap-3 ${
        direction === "col" ? "grid-cols-1" : "grid-cols-2"
      }`}
    >
      <div className="space-y-2">
        <Label htmlFor="firstName">First name</Label>
        <Input
          {...register("firstName")}
          id="firstName"
          type="text"
          placeholder="John"
        />
        {errors?.firstName && (
          <p className="text-sm text-red-400">{errors.firstName.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="lastName">Last name</Label>
        <Input
          {...register("lastName")}
          id="lastName"
          type="text"
          placeholder="Doe"
        />
        {errors?.lastName && (
          <p className="text-sm text-red-400">{errors.lastName.message}</p>
        )}
      </div>
    </div>
  );
}
