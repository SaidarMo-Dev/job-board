import { CheckCircle } from "lucide-react";

export default function AlreadyApplied() {
  return (
    <div className="flex-1 flex gap-2 items-center justify-center">
      <CheckCircle className="w-5 h-5 text-green-600" />
      <div className="text-xs py-1 px-2 rounded-full font-semibold text-green-600 bg-green-100">
        Already applied!
      </div>
    </div>
  );
}
