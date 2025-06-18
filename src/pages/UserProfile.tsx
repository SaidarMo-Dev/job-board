import AccountSettings from "@/components/AccountSettings";
import BasicUserInfoCard from "@/components/BasicUserInfoCard";
import { Button } from "@/components/ui/button";

import { Share2 } from "lucide-react";
import AuthGuard from "./Auth/authGuard";

export default function UserProfilePage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="custom-container space-y-6">
          {/* Header */}
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

          <BasicUserInfoCard />
          <AccountSettings />
        </div>
      </div>
    </AuthGuard>
  );
}
