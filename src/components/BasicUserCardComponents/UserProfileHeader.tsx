import { Share2 } from "lucide-react";
import { Button } from "../ui/button";

export default function UserProfileHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600 mt-1">
          Manage your personal information and preferences
        </p>
      </div>
      <Button variant="outline" className="flex items-center gap-2">
        <Share2 className="h-4 w-4" />
        Share profile
      </Button>
    </div>
  );
}
