import type React from "react";
import { useCallback, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "../../contexts/ToastContext";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "@/store";
import { getCurrentUserThunk, handleLogin } from "@/features/auth/authThunk";
import { ROUTES } from "@/constants/routes";
import { getAdminProfileThunk } from "@/features/admin/auth/adminThunk";
import { adminLogin } from "@/features/admin/auth/adminSlice";
import { LogoBrand } from "@/features/auth/components/register/LogoBrand";
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [UsernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const { handleShowCloseToast } = useToast();

  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  // handle login
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErrorMessage("");

      try {
        const result = await dispatch(
          handleLogin({ UsernameOrEmail, Password: password })
        ).unwrap();

        if (result.includes("Admin")) {
          dispatch(adminLogin());
          await dispatch(getAdminProfileThunk());
          return navigate(ROUTES.ADMIN.DASHBOARD);
        }

        await dispatch(getCurrentUserThunk());
        navigate(ROUTES.MEMBER.HOME);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred";
        setErrorMessage(message);
      }
    },
    [dispatch, UsernameOrEmail, password, navigate]
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-sky-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo/Brand Section */}
          <LogoBrand />

          {/* Card */}
          <div className="bg-white rounded-lg shadow-xl border-0 overflow-hidden">
            {/* Card Header */}
            <div className="px-6 pt-5">
              <h2 className="text-2xl font-semibold text-gray-900">
                Ready to take the next step?
              </h2>
              <p className=" text-gray-500 ml-0.5 mt-1">
                Create an account or sign in.
              </p>
            </div>

            {/* Card Content */}
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <input
                    id="emailOrUsername"
                    type="text"
                    placeholder="Email Or Username"
                    value={UsernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                    className="w-full h-11 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-2 focus:border-sky-600 transition-colors"
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-11 px-3 py-2 pr-10 rounded-md border border-gray-300 focus:outline-none focus:border-2 focus:border-sky-600 transition-colors"
                      required
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
                </div>

                {errorMessage && (
                  <div className="bg-red-100 p-4 text-red-500 font-light  rounded-md">
                    <span className="font-medium text-red-600 mr-1">Oops!</span>
                    {errorMessage}
                  </div>
                )}

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      id="remember"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-600"
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm text-gray-600 cursor-pointer"
                    >
                      Remember me
                    </label>
                  </div>
                  <Link
                    to={ROUTES.PUBLIC.FORGOT_PASSWORD}
                    className="text-sm text-sky-600 hover:text-sky-700 font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  className="w-full h-11 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2"
                >
                  Sign in
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid gap-3">
                <button
                  className="flex items-center justify-center pl-3 h-11 focus:border-2 focus:border-sky-600 font-medium bg-white border border-gray-300 rounded-md transition-colors focus:outline-none  hover:border-sky-600 hover:bg-blue-50"
                  onClick={() => {
                    handleShowCloseToast({
                      title: "Not Yet Available",
                      description:
                        "Coming soon! Google Option is under development.",
                    });
                  }}
                >
                  <svg
                    className="mr-5"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M17.64 9.20455C17.64 8.56637 17.5827 7.95273 17.4764 7.36364H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8195H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20455Z"
                      fill="#4285F4"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4205 9 14.4205C6.65591 14.4205 4.67182 12.8373 3.96409 10.71H0.957275V13.0418C2.43818 15.9832 5.48182 18 9 18Z"
                      fill="#34A853"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957273C0.347727 6.17318 0 7.54773 0 9C0 10.4523 0.347727 11.8268 0.957273 13.0418L3.96409 10.71Z"
                      fill="#FBBC05"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z"
                      fill="#EA4335"
                    ></path>
                  </svg>
                  Continue With Google
                </button>
                <button
                  className="flex items-center justify-center pl-3 h-11 font-medium bg-white border border-gray-300 rounded-md transition-colors focus:outline-none focus:border-2 focus:border-sky-600 hover:border-sky-600 hover:bg-blue-50"
                  onClick={() => {
                    handleShowCloseToast({
                      title: "Not Yet Available",
                      description:
                        "Coming soon! Apple Option is under development.",
                    });
                  }}
                >
                  <svg
                    className="mr-5 mb-1"
                    width="16pt"
                    height="16pt"
                    viewBox="0 0 16 16"
                    version="1.1"
                  >
                    <path d="M 14.152344 12.257812 C 13.921875 12.792969 13.648438 13.28125 13.332031 13.734375 C 12.902344 14.347656 12.546875 14.773438 12.277344 15.007812 C 11.855469 15.398438 11.402344 15.59375 10.917969 15.605469 C 10.570312 15.605469 10.152344 15.507812 9.664062 15.308594 C 9.175781 15.109375 8.726562 15.007812 8.316406 15.007812 C 7.886719 15.007812 7.421875 15.109375 6.929688 15.308594 C 6.433594 15.507812 6.035156 15.613281 5.730469 15.621094 C 5.265625 15.640625 4.804688 15.4375 4.339844 15.007812 C 4.046875 14.753906 3.679688 14.3125 3.238281 13.6875 C 2.761719 13.019531 2.375 12.25 2.070312 11.367188 C 1.742188 10.414062 1.578125 9.496094 1.578125 8.601562 C 1.578125 7.582031 1.800781 6.699219 2.242188 5.960938 C 2.589844 5.367188 3.050781 4.898438 3.628906 4.554688 C 4.207031 4.210938 4.835938 4.039062 5.507812 4.027344 C 5.875 4.027344 6.359375 4.140625 6.960938 4.363281 C 7.558594 4.589844 7.941406 4.703125 8.113281 4.703125 C 8.238281 4.703125 8.664062 4.570312 9.390625 4.304688 C 10.074219 4.058594 10.652344 3.957031 11.125 3.996094 C 12.40625 4.097656 13.371094 4.605469 14.011719 5.515625 C 12.863281 6.210938 12.296875 7.183594 12.308594 8.433594 C 12.320312 9.40625 12.671875 10.214844 13.367188 10.859375 C 13.679688 11.15625 14.03125 11.386719 14.421875 11.550781 C 14.335938 11.796875 14.246094 12.03125 14.152344 12.257812 Z M 11.210938 0.679688 C 11.210938 1.445312 10.933594 2.15625 10.375 2.816406 C 9.707031 3.597656 8.894531 4.050781 8.015625 3.980469 C 8.003906 3.886719 8 3.792969 8 3.691406 C 8 2.957031 8.316406 2.175781 8.882812 1.535156 C 9.167969 1.210938 9.527344 0.941406 9.960938 0.726562 C 10.394531 0.511719 10.808594 0.394531 11.195312 0.375 C 11.207031 0.476562 11.210938 0.582031 11.210938 0.679688 Z M 11.210938 0.679688 "></path>
                  </svg>
                  Continue With Apple
                </button>
              </div>
            </div>

            {/* Card Footer */}
            <div className="px-6 py-6 bg-gray-50 border-t border-gray-100">
              <p className="text-center text-sm text-gray-600 w-full">
                Don't have an account?
                <Link
                  to="/auth/register"
                  className="text-sky-600 hover:text-sky-700 font-medium"
                >
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-xs text-gray-500">
            <p>
              By signing in, you agree to our{" "}
              <a href="/terms" className="text-sky-600 hover:text-sky-700">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-sky-600 hover:text-sky-700">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
