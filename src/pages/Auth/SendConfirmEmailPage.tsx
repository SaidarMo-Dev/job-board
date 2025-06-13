import { CheckCircle } from "lucide-react";
import { Link } from "react-router";

export default function SendConfirmEmailPage() {
  return (
    <div className="custom-container h-dvh w-full flex justify-center items-center">
      <div className="bg-white border border-gray-300 p-5 rounded-md flex flex-col items-center text-center md:w-120 sm:w-100">
        <CheckCircle className="w-12 h-12 text-sky-500" />
        <h2 className="text-2xl font-semibold my-2">Check your email </h2>
        <p className="text-gray-600 text-sm">
          We've sent a confirmation link to your email address
        </p>
        <p className="mt-7 text-gray-600 text-sm">
          Please check your inbox and click on the confirmation link to verify
          your account. If you don't see the email, check your spam folder.
        </p>

        <Link
          to="/login"
          className="font-medium text-sm mt-5 border border-gray-300 py-2 px-3 rounded-sm hover:bg-gray-100"
        >
          Return to login{" "}
        </Link>
      </div>
    </div>
  );
}
