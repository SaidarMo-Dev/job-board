import {
  Calendar,
  Mail,
  UserIcon,
  Shield,
  MapPin,
  MapIcon,
  UserCog2,
  PhoneIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { getGender, getRoleColor } from "@/utils/styleHelpers";
import type { AdminProfile } from "../../auth/adminTypes";
import type { RoleType } from "../../users/usersTypes";

interface ShowInfoModalProps {
  open: boolean;
  admin: AdminProfile | null;
  onClose?: () => void;
}
export default function AdminDetailsDialog({
  open,
  admin,
  onClose,
}: ShowInfoModalProps) {
  function handleClose() {
    if (onClose) onClose();
  }

  if (!admin) return null;

  const fullName = admin.firstName + " " + admin.lastName;

  const listRoles = admin.roles.map((role) => {
    return (
      <Badge className={`${getRoleColor(role as RoleType)}`}>{role}</Badge>
    );
  });

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserIcon className="h-5 w-5" />
            Admin Details: {fullName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* User Avatar and Basic Info */}
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
              <UserIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">{fullName}</h3>
              <div className="flex items-center gap-2">{listRoles}</div>
            </div>
          </div>

          <Separator />

          {/* User Details Grid */}
          <div className="grid gap-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Mail className="h-4 w-4" />
                Email
              </div>
              <div className="col-span-2 text-sm">{admin.email}</div>
            </div>

            <div className="grid grid-cols-3 items-center gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Shield className="h-4 w-4" />
                Roles
              </div>
              <div className="col-span-2">{listRoles}</div>
            </div>

            <div className="grid grid-cols-3 items-center gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Date Of Birth
              </div>
              <div className="col-span-2 text-sm">
                {admin.dateOfBirth ? admin.dateOfBirth : "Not specified"}
              </div>
            </div>

            <div className="grid grid-cols-3 items-center gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Address
              </div>
              <div className="col-span-2 text-sm">{admin.address}</div>
            </div>

            <div className="grid grid-cols-3 items-center gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <PhoneIcon className="h-4 w-4" />
                Phone Number
              </div>
              <div className="col-span-2 text-sm">
                {admin.phoneNumber ?? "Not Specefied"}
              </div>
            </div>

            <div className="grid grid-cols-3 items-center gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <UserCog2 className="h-4 w-4" />
                Gender
              </div>
              <div className="col-span-2 text-sm">
                {getGender(admin.gender)}
              </div>
            </div>

            <div className="grid grid-cols-3 items-center gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <MapIcon className="h-4 w-4" />
                Country
              </div>
              <div className="col-span-2 text-sm">{admin.country}</div>
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleClose}>
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
