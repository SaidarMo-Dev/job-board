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
    role: string;
  }>;
}

export function NameInputs({ errors, register }: NameFieldsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-2">
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-700"
        >
          First name
        </label>
        <input
          {...register("firstName")}
          id="firstName"
          type="text"
          placeholder="John"
          className="w-full h-11 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600 transition-colors"
        />
        {errors?.firstName && (
          <p className="text-sm text-red-400">{errors.firstName.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-gray-700"
        >
          Last name
        </label>
        <input
          {...register("lastName")}
          id="lastName"
          type="text"
          placeholder="Doe"
          className="w-full h-11 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600 transition-colors"
        />
        {errors?.lastName && (
          <p className="text-sm text-red-400">{errors.lastName.message}</p>
        )}
      </div>
    </div>
  );
}
