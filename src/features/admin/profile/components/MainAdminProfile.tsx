import ChangeEmail from "@/components/PasswordAndSecurity/ChangeEmail";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { getRoleColor } from "@/utils/styleHelpers";
import { Mail, MapPin, Shield, Upload } from "lucide-react";
import { useState } from "react";
import type { AdminProfile } from "../../auth/adminTypes";
import AdminDetailsDialog from "../dialogs/AdminDetailsDialog";

interface MainAdminProfileProps {
  admin: AdminProfile | null;
}
export default function MainAdminProfile({ admin }: MainAdminProfileProps) {
  const [openChangeEmail, setOpenChangeEmail] = useState(false);
  const [showAdminDetails, setShowAdminDetails] = useState(false);

  if (!admin) return null;
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Admin Profile
          </CardTitle>
          <CardDescription>
            Manage your administrative account settings and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar & Basic Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={"/placeholder.svg"}
                  alt={`${admin.firstName} ${admin.lastName}`}
                />
                <AvatarFallback className="text-lg">
                  {admin.firstName[0]}
                  {admin.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                variant="outline"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-transparent"
              >
                <Upload className="h-3 w-3" />
              </Button>
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <h2 className="text-2xl font-bold">
                  {admin.firstName} {admin.lastName}
                </h2>
                <Badge
                  variant="secondary"
                  className={`${getRoleColor("Admin")}`}
                >
                  Admin
                </Badge>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{admin.email}</span>
                <Button
                  variant={"ghost"}
                  className="mr-4 cursor-pointer text-gray-700 dark:text-foreground"
                  onClick={() => setOpenChangeEmail(true)}
                >
                  Change Email
                </Button>
                <ChangeEmail
                  open={openChangeEmail}
                  onClose={() => setOpenChangeEmail(false)}
                />
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span> Country : {admin.country}</span>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <Button
              variant={"outline"}
              onClick={() => setShowAdminDetails(true)}
            >
              Show Details
            </Button>
          </div>
        </CardContent>
      </Card>
      <AdminDetailsDialog
        admin={admin}
        open={showAdminDetails}
        onClose={() => setShowAdminDetails(false)}
      />
    </>
  );
}
