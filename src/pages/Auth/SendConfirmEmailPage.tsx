import { CheckCircle } from "lucide-react";
import { Link, Navigate } from "react-router";
import { useEffect } from "react";

export default function SendConfirmEmailPage() {
  const fromRegister = localStorage.getItem("fromRegister") === "true";

  useEffect(() => {
    localStorage.removeItem("fromRegister");
  }, []);

  if (!fromRegister) {
    return <Navigate to="/register" replace />;
  }

  return (
    <div className="custom-container h-dvh w-full flex justify-center items-center">
      <div className="bg-white shadow-lg p-5 rounded-md flex flex-col items-center text-center md:w-120 sm:w-100">
        <CheckCircle className="w-17 h-17 bg-green-100 rounded-full p-3 text-green-500" />
        <h2 className="text-2xl font-bold my-2">Created successfully</h2>
        <h2 className="text-xl font-semibold my-2">Check your email </h2>
        <p className="text-gray-600">
          We've sent a confirmation link to your email address
        </p>
        <div className="bg-gray-50 p-2 mt-5 rounded-sm flex space-x-3 items-center justify-center">
          <p className=" text-gray-600 text-sm">
            Please check your inbox and click on the confirmation link to verify
            your account. If you don't see the email, check your spam folder.
          </p>
        </div>

        <Link
          to="/login"
          className="font-semibold bg-sky-600 text-xs mt-5 py-2 px-3 rounded-sm hover:bg-sky-600/90 text-white"
        >
          Return to login{" "}
        </Link>
      </div>
    </div>
  );
}
