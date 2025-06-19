import { User } from "lucide-react";
import ProgressBar from "./ProgressBar";
import { Link } from "react-router";

export default function CompleteProfileCard() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 p-4 rounded-md mt-2">
      {/* header */}
      <div>
        <div className="flex items-center gap-2 text-sky-900 font-bold text-xl mb-1">
          <User className="h-5 w-5" />
          Complete Your Profile
        </div>
        <div className="text-sky-700 text-sm font-meduim">
          Get better job matches by completing your profile
        </div>
      </div>
      {/* centent */}
      <div className="space-y-4 mt-7">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-black">
            Profile strength
          </span>
          <span className="text-sm text-sky-700">14%</span>
        </div>
        <ProgressBar value={16} color="bg-sky-600" />
        <Link
          to={"/members/profile"}
          className=" block text-center w-full bg-sky-600 hover:bg-sky-700 p-2 mt-1 text-white rounded-md text-sm font-semibold cursor-pointer"
        >
          Edit Profile
        </Link>
      </div>
    </div>
  );
}
