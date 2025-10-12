import { Zap } from "lucide-react";

export default function QuickTips() {
  return (
    <div className="border bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 p-5 rounded-md">
      <div>
        <div className="flex items-center gap-2 text-green-900 font-bold text-2xl">
          <Zap className="h-5 w-5" />
          Quick Tip
        </div>
      </div>
      <div className="mt-7">
        <p className="text-sm text-green-800 mb-3">
          Complete your profile to get 3x more job matches and stand out to
          employers.
        </p>
        <button className="border border-green-300 text-green-700 hover:bg-green-100 bg-white py-2 px-4 rounded-md cursor-pointer">
          Learn More
        </button>
      </div>
    </div>
  );
}
