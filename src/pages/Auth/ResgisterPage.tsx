import { useState } from "react";
import { Link, useNavigate } from "react-router";

// React hook form
import z from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// User Service
import { createUser } from "../../features/users/userApi";
// react toastidy
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

// axios
import axios from "axios";
import type { ApiResponse } from "../../types/ApiResponse";
import { LogoBrand } from "@/features/auth/components/register/LogoBrand";
import { RoleSelector } from "@/features/auth/components/register/RoleSelector";
import type { AccountType } from "@/features/auth/registerTypes";
import { NameInputs } from "@/features/auth/components/register/NameInput";
import { PasswordsInput } from "@/features/auth/components/register/PasswordsInput";
import { TermsCheckBox } from "@/features/auth/components/register/TermsCheckBox";
import { SocialRegistrationAuth } from "@/features/auth/components/register/SocialRegistrationAuth";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;

// schema
const signUpSchema = z
  .object({
    firstName: z.string().min(1, { message: "First Name is Required" }).max(30),
    lastName: z.string().min(1, { message: "Last Name is Required" }).max(30),
    email: z.string().email(),
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
    role: z.string().min(1, { message: "Please choose one!" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not matches",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof signUpSchema>;

// register page

export default function RegisterPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });
  const selectedRole = watch("role");

  // handle select role
  function handleRoleSelect(role: string) {
    setValue("role", role, { shouldValidate: true });
  }

  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  // handle submit data
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      if (agreeToTerms === false) {
        toast.error("Please agree to the Terms of Service before continuing.");
        return;
      }

      setLoading(true);
      // create the user and make sure to send email as username
      const response = await createUser({ ...data });

      if (response.data.succeeded) {
        // localStorage.setItem("fromRegister", "true");
        sessionStorage.setItem("isSignupInProgress", "true");
        navigate("/auth/confirm-email");
      } else {
        toast.info(response.data?.message ?? "Something went wrong!");
      }
    } catch (error) {
      // if axios error then take the returned message from api and display it otherwise display Unknown error
      if (axios.isAxiosError(error)) {
        console.log(error);
        const errorResponse = error.response?.data as ApiResponse<null>;
        toast.error(errorResponse?.message ?? "Something went wrong!");
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-sky-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand Section */}
        <LogoBrand />

        {/* Card */}
        <div className="bg-white rounded-lg shadow-xl border-0 overflow-hidden">
          {/* Card Header */}
          <div className="px-6 py-8 border-b border-gray-100">
            <h2 className="text-2xl font-semibold text-center text-gray-900">
              Create your account
            </h2>
            <p className="text-center text-gray-600 mt-1">
              Join thousands of professionals finding their dream jobs
            </p>
          </div>

          {/* Card Content */}
          <div className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Account Type Selection */}
              <RoleSelector
                onSelect={(role) => handleRoleSelect(role)}
                selectedRole={selectedRole as AccountType}
                error={{ message: errors.role?.message }}
              />

              {/* Name Fields */}
              <NameInputs
                register={register}
                errors={{
                  firstName: errors.firstName,
                  lastName: errors.lastName,
                }}
              />

              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  className="w-full h-11 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600 transition-colors"
                />
                {errors.email && (
                  <p className="text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>

              {/* Passwords  */}
              <PasswordsInput
                register={register}
                errors={{
                  password: errors.password,
                  confirmPassword: errors.confirmPassword,
                }}
              />

              {/* Terms and Conditions */}
              <TermsCheckBox
                checked={agreeToTerms}
                onChange={(value) => setAgreeToTerms(value)}
              />

              {/* Create Account Button */}
              <button
                type="submit"
                className="w-full h-11 bg-sky-600 hover:bg-sky-700 text-white
                          font-medium rounded-md transition-colors focus:outline-none cursor-pointer
                          disabled:bg-gray-100 disabled:text-black"
                disabled={loading}
              >
                Create account
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">
                  Or sign up with
                </span>
              </div>
            </div>

            {/* Social Registration Buttons */}
            <SocialRegistrationAuth />
          </div>

          {/* Card Footer */}
          <div className="px-6 py-6 bg-gray-50 border-t border-gray-100">
            <p className="text-center text-sm text-gray-600 w-full">
              Already have an account?
              <Link
                to="/auth/login"
                className="text-sky-600 hover:text-sky-700 font-medium"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
