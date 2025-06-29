import RecoverContactInformation from "@/components/PasswordAndSecurity/RecoverContactInforamtion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export default function AccountRecovery() {
  return (
    <div className="custom-conatiner max-w-2xl mx-auto">
      <div className="flex items-center space-x-4 my-6">
        <Link to="/members/password-security">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Security
          </Button>
        </Link>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Account Recovery Setup</h1>
        <p className="text-muted-foreground">
          Set up multiple ways to recover your account if you lose access
        </p>
      </div>
      <RecoverContactInformation />
    </div>
  );
}
