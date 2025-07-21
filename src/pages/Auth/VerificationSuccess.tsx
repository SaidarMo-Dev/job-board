import { CheckCircle } from "lucide-react";
import { Link } from "react-router";

export default function VerificationSucess() {
  return (
    <div className="custom-container h-dvh w-full flex justify-center items-center">
      <div className="bg-white shadow-lg p-5 rounded-md flex flex-col items-center text-center md:w-120 sm:w-100">
        <CheckCircle className="w-17 h-17 bg-green-100 rounded-full p-3 text-green-500" />
        <h2 className="text-2xl font-bold my-2">Email Verified successfully</h2>
        <p className="mt-2 text-gray-400">
          Welcome aboard! Redirecting to login in seconds...
        </p>
        <div className="mt-5 border border-green-500 p-3 rounded-md text-left bg-green-50 w-full">
          Completed Successfully
        </div>

        <Link
          to="/auth/login"
          replace
          className="w-full font-semibold text-sm border border-gray-200 mt-6 py-2 px-3 rounded-sm hover:bg-gray-100"
        >
          GO to login page
        </Link>
      </div>
    </div>
  );
}
