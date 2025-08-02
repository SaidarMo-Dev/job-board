import {
  Eye,
  Calendar,
  Clock,
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import type { RoleType, UserManagement } from "../usersTypes";
import {
  formatRole,
  getGender,
  getRoleColor,
  getStatusColor,
} from "@/utils/styleHelpers";

interface ShowInfoModalProps {
  open: boolean;

  user: UserManagement;
  onClose?: () => void;
}
export default function ShowInfoModal({
  open,
  user,
  onClose,
}: ShowInfoModalProps) {
  function handleClose() {
    if (onClose) onClose();
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserIcon className="h-5 w-5" />
            User Details: {user.fullName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* User Avatar and Basic Info */}
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
              <UserIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">{user.fullName}</h3>
              <div className="flex items-center gap-2">
                <Badge className={`${getStatusColor(user.isDeleted)}`}>
                  {user.isDeleted ? "Suspended" : "Active"}
                </Badge>
                <Badge className={`${getRoleColor(user.role as RoleType)}`}>
                  {formatRole(user.role as RoleType)}
                </Badge>
              </div>
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
              <div className="col-span-2 text-sm">{user.email}</div>
            </div>

            <div className="grid grid-cols-3 items-center gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Shield className="h-4 w-4" />
                Role
              </div>
              <div className="col-span-2">
                <Badge className={`${getRoleColor(user.role as RoleType)}`}>
                  {formatRole(user.role as RoleType)}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-3 items-center gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Date Of Birth
              </div>
              <div className="col-span-2 text-sm">
                {user.dateofBirth
                  ? user.dateofBirth.toLocaleDateString()
                  : "Not specified"}
              </div>
            </div>

            <div className="grid grid-cols-3 items-center gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Address
              </div>
              <div className="col-span-2 text-sm">{user.email}</div>
            </div>

            <div className="grid grid-cols-3 items-center gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <UserIcon className="h-4 w-4" />
                Status
              </div>
              <div className="col-span-2">
                <Badge className={`${getStatusColor(user.isDeleted)}`}>
                  {user.isDeleted ? "Suspended" : "Active"}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-3 items-center gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <PhoneIcon className="h-4 w-4" />
                Phone Number
              </div>
              <div className="col-span-2 text-sm">
                {user.phoneNumber ?? "Not Specefied"}
              </div>
            </div>

            <div className="grid grid-cols-3 items-center gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <UserCog2 className="h-4 w-4" />
                Gender
              </div>
              <div className="col-span-2 text-sm">{getGender(user.gender)}</div>
            </div>

            <div className="grid grid-cols-3 items-center gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <MapIcon className="h-4 w-4" />
                Country
              </div>
              <div className="col-span-2 text-sm">{user.country}</div>
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
