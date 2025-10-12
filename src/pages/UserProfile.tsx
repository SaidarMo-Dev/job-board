import AccountSettings from "@/shared/components/AccountSettings";
import BasicUserInfoCard from "@/shared/components/BasicUserInfoCard";

import AuthGuard from "./Auth/authGuard";
import ProfileHeader from "@/components/BasicUserCardComponents/UserProfileHeader";

export default function UserProfilePage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="custom-container">
          <div className="space-y-6 md:max-w-[850px] lg:w-[850px] m-auto">
            {/* Header */}
            <ProfileHeader />

            <BasicUserInfoCard />
            <AccountSettings />
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
