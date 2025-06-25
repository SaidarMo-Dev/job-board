import { Link } from "react-router";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export default function AccountSettings() {
  return (
    <Card className="shadow-sm">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="text-sm text-gray-600">
            Looking to change your email? You can edit it from the{" "}
            <Link
              to="/members/password-security"
              className="p-0 h-auto text-blus-600 font-medium underline-offset-4 hover:underline"
            >
              Password and Security page
            </Link>
            .
          </div>
          <div className="pt-4 border-t">
            <Button variant="destructive" size="sm">
              Close my account
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
