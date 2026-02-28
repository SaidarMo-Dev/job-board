// Lucide react icons
import { Edit3, Save, X } from "lucide-react";

import { useState, useEffect } from "react";

// redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";

// ui Imports
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

// custom components
import CountrySelector from "../../components/BasicUserCardComponents/CountrySelector";
import { DateOfBirthSelector } from "../../components/BasicUserCardComponents/DateOfBirthSelector";

// features
import { updateUserThunk } from "@/features/users/userThunk";
import type { UpdateUserRequest } from "@/features/users/userTypes";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { Slide, toast } from "react-toastify";
import { getCurrentUserThunk } from "@/features/auth/authThunk";
import InfoRow from "./InfoRow";

export default function BasicUserInfoCard() {
  const [isEditing, setIsEditing] = useState(false);

  const currentUser = useSelector(selectCurrentUser);
  const [userInfo, setUserInfo] = useState(
    currentUser || {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      dateOfBirth: "",
      countryName: "",
    },
  );

  // Sync userInfo when currentUser updates
  useEffect(() => {
    if (currentUser) {
      setUserInfo(currentUser);
    }
  }, [currentUser]);

  // handle input change
  const handleInputChange = (field: string, value: string) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
  };

  const dispatch = useDispatch<AppDispatch>();

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to current user data
    if (currentUser) {
      setUserInfo(currentUser);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    const updatedUser: UpdateUserRequest = {
      id: currentUser?.id,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      gender: userInfo.gender,
      dateOfBirth: userInfo.dateOfBirth
        ? new Date(userInfo.dateOfBirth)
        : undefined,
      phoneNumber: userInfo.phoneNumber,
      address: userInfo.address,
      countryName: userInfo.countryName,
    };

    async function handleUpdate() {
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
        const errorMessage = result.payload || "Failed to save changes";
        toast.error(errorMessage, {
          position: "bottom-left",
          hideProgressBar: true,
          transition: Slide,
          autoClose: 2000,
        });
      }
    }
    handleUpdate();
  };

  return (
    /* Basic Info Card */

    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-xl">Basic Information</CardTitle>
          <p className="text-sm text-gray-600 mt-1">
            Your personal details and contact information
          </p>
        </div>
        {isEditing ? (
          <div className="flex items-center gap-4">
            {/* Save button */}
            <Button
              variant={"default"}
              size="sm"
              onClick={() => handleSave()}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </Button>

            {/* Cancel button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
          </div>
        ) : (
          // Edit button
          <Button
            variant={"outline"}
            size="sm"
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2"
          >
            <Edit3 className="h-4 w-4" />
            Edit
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {isEditing ? (
          // Edit card
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div className="space-y-3">
              <Label
                htmlFor="firstName"
                className="block text-sm font-medium text-foreground mb-2"
              >
                First Name
              </Label>
              <Input
                id="firstName"
                value={userInfo.firstName || ""}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                placeholder="Enter your first name"
                className="bg-muted border-input"
              />
            </div>

            {/* Last name */}
            <div className="space-y-3">
              <Label htmlFor="lastName" className="text-muted-foreground">
                Last Name
              </Label>
              <Input
                id="lastName"
                value={userInfo.lastName || ""}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                placeholder="Enter your last name"
                className="bg-muted border-input"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-3">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={userInfo.phoneNumber || ""}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
                placeholder="Enter your phone number"
                type="tel"
                className="bg-muted border-input"
              />
            </div>

            {/* Address */}
            <div className="space-y-3">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={userInfo.address || ""}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Enter your address"
                className="bg-muted border-input"
              />
            </div>

            {/* Gender */}
            <div className="space-y-3">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={userInfo.gender || ""}
                onValueChange={(value) => {
                  handleInputChange("gender", value);
                }}
              >
                <SelectTrigger className="bg-muted border-input">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Country selection */}
            <div className="space-y-3">
              <Label htmlFor="country">Nationality</Label>
              <CountrySelector
                onSelect={(countryName) => {
                  handleInputChange("countryName", countryName || "");
                }}
              />
            </div>

            {/* Date Of birth */}
            <div className="space-y-2 md:col-span-2">
              <DateOfBirthSelector
                onSelect={(date) => {
                  handleInputChange(
                    "dateOfBirth",
                    date?.toLocaleDateString() || "",
                  );
                }}
              />
            </div>
          </div>
        ) : (
          // Info section
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoRow
              label="First Name"
              onAddButtonClick={() => setIsEditing(true)}
            >
              {userInfo.firstName}
            </InfoRow>
            <InfoRow
              label="Last Name"
              onAddButtonClick={() => setIsEditing(true)}
            >
              {userInfo.lastName}
            </InfoRow>
            <InfoRow
              label="Phone Number"
              onAddButtonClick={() => setIsEditing(true)}
            >
              {userInfo.phoneNumber}
            </InfoRow>

            <InfoRow
              label="Address"
              onAddButtonClick={() => setIsEditing(true)}
            >
              {userInfo.address}
            </InfoRow>
            <InfoRow label="Gender" onAddButtonClick={() => setIsEditing(true)}>
              {userInfo.gender}
            </InfoRow>

            <InfoRow
              label="Country"
              onAddButtonClick={() => setIsEditing(true)}
            >
              {userInfo.countryName}
            </InfoRow>
            <InfoRow
              label="Date of Birth"
              onAddButtonClick={() => setIsEditing(true)}
            >
              {userInfo.dateOfBirth}
            </InfoRow>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
