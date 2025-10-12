import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import type { UpdateUserRequest } from "@/features/users/userTypes";
import { DatePicker } from "@/shared/components/DatePicker";
import { CountryCombobox } from "@/shared/components/CountrySelect";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { Slide, toast } from "react-toastify";
import { getCurrentUserThunk } from "@/features/auth/authThunk";
import { updateUserThunk } from "@/features/users/userThunk";
import type { AdminProfile } from "../../auth/adminTypes";

interface EditProfileDialogProps {
  open: boolean;
  user: AdminProfile;
  onClose?: () => void;
}

export default function EditProfileDialog({
  open,
  user,
  onClose,
}: EditProfileDialogProps) {
  function handleClose() {
    if (onClose) onClose();
  }
  if (!user) handleClose();
  // Edit Profile Form State
  const [editForm, setEditForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    gender: user.gender,
    dateOfBirth: user.dateOfBirth,
    phoneNumber: user.phoneNumber,
    address: user.address,
    country: user.country,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const validateEditForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!editForm.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!editForm.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (
      editForm.phoneNumber &&
      !/^\+?[\d\s\-$$$$]+$/.test(editForm.phoneNumber)
    ) {
      newErrors.phoneNumber = "Invalid phone number format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = async () => {
    if (!validateEditForm()) return;

    setLoading(true);

    const updatedUser: UpdateUserRequest = {
      id: user?.Id ?? -1,
      firstName: editForm.firstName,
      lastName: editForm.lastName,
      gender: editForm.gender,
      dateOfBirth: editForm.dateOfBirth
        ? new Date(editForm.dateOfBirth)
        : undefined,
      phoneNumber: editForm.phoneNumber,
      address: editForm.address,
      imagePath: "", // TODO  : Handle saving image
      countryName: editForm.country,
    };

    const result = await dispatch(updateUserThunk(updatedUser));

    if (updateUserThunk.fulfilled.match(result)) {
      toast.success("Saved Successfully", {
        position: "bottom-left",
        hideProgressBar: true,
        transition: Slide,
        autoClose: 2000,
      });

      await dispatch(getCurrentUserThunk());
    } else {
      toast.error(result.payload ?? "Network error", {
        position: "bottom-left",
        hideProgressBar: true,
        transition: Slide,
        autoClose: 2000,
      });
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile information. Email changes require separate
            verification.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="editFirstName">First Name *</Label>
            <Input
              id="editFirstName"
              value={editForm.firstName}
              onChange={(e) =>
                setEditForm({ ...editForm, firstName: e.target.value })
              }
              className={errors.firstName ? "border-red-500" : ""}
            />
            {errors.firstName && (
              <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="editLastName">Last Name *</Label>
            <Input
              id="editLastName"
              value={editForm.lastName}
              onChange={(e) =>
                setEditForm({ ...editForm, lastName: e.target.value })
              }
              className={errors.lastName ? "border-red-500" : ""}
            />
            {errors.lastName && (
              <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="editGender">Gender</Label>
            <Select
              value={editForm.gender}
              onValueChange={(value) =>
                setEditForm({ ...editForm, gender: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
                <SelectItem value="Prefer not to say">
                  Prefer not to say
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Date of birth */}
          <div>
            <DatePicker
              date={new Date(editForm.dateOfBirth ?? "")}
              label="Date of birth:"
              onSelect={(date) =>
                setEditForm({
                  ...editForm,
                  dateOfBirth: date?.toLocaleDateString(),
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="editPhone">Phone Number</Label>
            <Input
              id="editPhone"
              value={editForm.phoneNumber}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  phoneNumber: e.target.value,
                })
              }
              className={errors.phoneNumber ? "border-red-500" : ""}
            />
            {errors.phoneNumber && (
              <p className="text-sm text-red-500 mt-1">{errors.phoneNumber}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="editCountry">Country</Label>

            <CountryCombobox
              onSelect={(countryName) => {
                editForm.country = countryName ? countryName : "";
              }}
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="editAddress">Address</Label>
            <Textarea
              id="editAddress"
              value={editForm.address}
              onChange={(e) =>
                setEditForm({ ...editForm, address: e.target.value })
              }
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSaveProfile}
            className="bg-sky-600 hover:bg-sky-700 dark:bg-foreground dark:hover:bg-gray-300"
          >
            {loading ? "Savig..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
