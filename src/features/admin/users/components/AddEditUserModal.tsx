import { Eye, EyeOff, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { roles, type RoleType, type UserManagement } from "../usersTypes";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAppSelector } from "@/hooks/useAppSelector";
import { selectSaveUserLoading } from "../userSlice";
import { useEffect, useState } from "react";

interface AddEditUserModalProps {
  isOpen: boolean;
  onClose?: () => void;
  user?: UserManagement;
  mode: "Edit" | "AddNew";
}

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;

// Create separate schemas for add and edit
const baseUserSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is Required" }).max(30),
  lastName: z.string().min(1, { message: "Last Name is Required" }).max(30),
  email: z.string().email(),
  role: z.enum(roles, { required_error: "Please select a role" }),
});

const addUserSchema = baseUserSchema
  .extend({
    password: z
      .string()
      .min(8, { message: "Password must contain at least 8 character(s)" })
      .max(20, { message: "Password must be at most 20 characters long" })
      .regex(passwordRegex, {
        message:
          "Password must include uppercase, lowercase, number, and special character",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const editUserSchema = baseUserSchema.extend({
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
});

type AddFormData = z.infer<typeof addUserSchema>;
type EditFormData = z.infer<typeof editUserSchema>;
type FormData = AddFormData | EditFormData;

export default function AddEditUserModal({
  isOpen,
  onClose,
  user,
  mode = "AddNew",
}: AddEditUserModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(mode === "AddNew" ? addUserSchema : editUserSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      role: (user?.role as RoleType) || "JobSeeker",
      password: "",
      confirmPassword: "",
    },
  });

  const role = watch("role");

  // Reset form when user data changes
  useEffect(() => {
    reset({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      role: (user?.role as RoleType) || "JobSeeker",
      password: "",
      confirmPassword: "",
    });
  }, [user, reset]);

  const saveLoading = useAppSelector(selectSaveUserLoading);

  const onSubmit = (data: FormData) => {
    // Handle form submission
    console.log(data);
    // You'll need to implement your actual submission logic here
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === "Edit" ? "Edit User" : "Add New User"}
          </DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Firstname and Lastname inputs */}
          <>
            <div className="grid gap-3 grid-cols-1">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  {...register("firstName")}
                  id="firstName"
                  type="text"
                  placeholder="John"
                />
                {errors?.firstName && (
                  <p className="text-sm text-red-400">
                    {errors.firstName.message}
                  </p>
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
                  <p className="text-sm text-red-400">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
          </>

          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              {...register("email")}
              id="email"
              type="email"
              placeholder="Enter email address"
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <X className="h-3 w-3" />
                <span>{errors.email.message}</span>
              </p>
            )}
          </div>

          {/* Role Selector */}
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={role}
              onValueChange={(value) => setValue("role", value as RoleType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role === "JobSeeker" ? "Job Seeker" : role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <X className="h-3 w-3" />
                <span>{errors.role.message}</span>
              </p>
            )}
          </div>

          {/* Password and confirm password  */}
          {mode === "AddNew" && (
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
                  <p className="text-sm text-red-400">
                    {errors?.password.message}
                  </p>
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
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={saveLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saveLoading}
              className="bg-sky-600 hover:bg-sky-700"
            >
              {saveLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  {mode === "AddNew" ? "Adding..." : "Updating..."}
                </div>
              ) : mode === "AddNew" ? (
                "Add User"
              ) : (
                "Update User"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
