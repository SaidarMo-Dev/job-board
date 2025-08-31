import AccountInformationCard from "@/components/PasswordAndSecurity/AccountInformationCard";
import PasswordManagementCard from "@/components/PasswordAndSecurity/PasswordManagementCard";
import TwoFactorAuthenticationCard from "@/components/PasswordAndSecurity/TwoFactorAuthenticationCard";
import SecuritySettingsCard from "@/components/PasswordAndSecurity/SecuritySettingsCard";

export default function PasswordSecurityPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 py-10">
      <div className="custom-container max-w-4xl">
        <div className="mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Password & Security
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your account security and authentication settings
            </p>
          </div>
        </div>
        <div className="space-y-6">
          <AccountInformationCard />
          <PasswordManagementCard />
          <TwoFactorAuthenticationCard
            onEnable2FA={() => {
              /* TODO: handle enable 2FA */
            }}
          />
          <SecuritySettingsCard
            onSetupRecovery={() => {
              /* TODO: handle setup recovery */
            }}
          />
        </div>
      </div>
    </div>
  );
}
