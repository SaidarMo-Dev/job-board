// Lucide react icons
import { Edit3, Save } from "lucide-react";

import { useState } from "react";

// redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";

// ui Imports
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

// custom components
import CountrySelector from "./BasicUserCardComponents/CountrySelector";
import UserInfoLabel from "./BasicUserCardComponents/UserInfoLabel";
import AddButton from "./BasicUserCardComponents/AddButton";
import { DateOfBirthSelector } from "./BasicUserCardComponents/DateOfBirthSelector";

// features
import { updateUserThunk } from "@/features/users/userThunk";
import type { UpdateUserRequest } from "@/features/users/userTypes";
import { selectAuthError, selectCurrentUser } from "@/features/auth/authSlice";
import { Slide, toast } from "react-toastify";
import { getCurrentUserThunk } from "@/features/auth/authThunk";

export default function BasicUserInfoCard() {
  const [isEditing, setIsEditing] = useState(false);

  const currentUser = useSelector(selectCurrentUser);
  const [userInfo, setUserInfo] = useState({ ...currentUser });

  // handle input change
  const handleInputChange = (field: string, value: string) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
  };

  const dispatch = useDispatch<AppDispatch>();
  const authError = useSelector(selectAuthError);

  const handleSave = () => {
    setIsEditing(false);
    const updatedUser: UpdateUserRequest = {
      id: currentUser?.id,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      gender: userInfo.gender,
      dateOfBirth: userInfo.dateOfBirth ? new Date(userInfo.dateOfBirth) : null,
      phoneNumber: userInfo.phoneNumber,
      address: userInfo.address,
      imagePath: userInfo.imagePath,
      countryName: userInfo.countryName,
    };

    async function handleUpdate() {
      const result = await dispatch(updateUserThunk(updatedUser));
      if (updateUserThunk.fulfilled.match(result)) {
        toast.success("Saved Successfull", {
          position: "bottom-left",
          hideProgressBar: true,
          transition: Slide,
          autoClose: 2000,
        });

        await dispatch(getCurrentUserThunk());
      } else {
        toast.error(authError, {
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
        <Button
          variant={isEditing ? "default" : "outline"}
          size="sm"
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className="flex items-center gap-2"
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4" />
              Save
            </>
          ) : (
            <>
              <Edit3 className="h-4 w-4" />
              Edit
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* FirstName Field */}
          <div className="space-y-3">
            <Label htmlFor="firstName">First Name</Label>
            {isEditing ? (
              <Input
                id="firstName"
                value={userInfo.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                placeholder="Enter your first name"
                className="rounded-md h-[41px]"
                style={{ fontSize: "16px" }}
              />
            ) : (
              <div className="flex items-center gap-2">
                {userInfo.firstName ? (
                  <UserInfoLabel fieldInfo={userInfo.firstName} />
                ) : (
                  <AddButton field={"First Name"} />
                )}
              </div>
            )}
          </div>

          {/* LastName field */}
          <div className="space-y-3">
            <Label htmlFor="lastName">Last Name</Label>
            {isEditing ? (
              <Input
                id="lastName"
                value={userInfo.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                placeholder="Enter your last name"
                className="rounded-md h-[41px]"
                style={{ fontSize: "16px" }}
              />
            ) : (
              <div className="flex items-center gap-2">
                {userInfo.lastName ? (
                  <UserInfoLabel fieldInfo={userInfo.lastName} />
                ) : (
                  <AddButton field={"Last Name"} />
                )}
              </div>
            )}
          </div>

          {/* Phone Field */}
          <div className="space-y-3">
            <Label htmlFor="phone">Phone Number</Label>
            {isEditing ? (
              <Input
                id="phone"
                value={userInfo.phoneNumber}
                onChange={(e) =>
                  handleInputChange("PhoneNumber", e.target.value)
                }
                placeholder="Enter your phone number"
                type="tel"
                className="rounded-md h-[41px]"
                style={{ fontSize: "16px" }}
              />
            ) : (
              <div className="flex items-center gap-2">
                {userInfo.phoneNumber ? (
                  <UserInfoLabel fieldInfo={userInfo.phoneNumber} />
                ) : (
                  <AddButton field={"Phone Number"} />
                )}
              </div>
            )}
          </div>

          {/* Address Fields */}

          <div className="space-y-3">
            <Label htmlFor="address">Address</Label>
            {isEditing ? (
              <Input
                id="address"
                value={userInfo.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Enter your address"
                className="rounded-md h-[41px]"
                style={{ fontSize: "16px" }}
              />
            ) : (
              <div className="flex items-center gap-2">
                {userInfo.address ? (
                  <UserInfoLabel fieldInfo={userInfo.address} />
                ) : (
                  <AddButton field={"Address"} />
                )}
              </div>
            )}
          </div>

          {/* Gender field */}
          <div className="space-y-3">
            <Label htmlFor="phone">Gender</Label>
            {isEditing ? (
              <Select
                value={userInfo.gender}
                onValueChange={(value) => {
                  handleInputChange("gender", value);
                }}
              >
                <SelectTrigger className="w-full !h-[41px]">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">other</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="flex items-center gap-2">
                {userInfo.gender ? (
                  <UserInfoLabel fieldInfo={userInfo.gender} />
                ) : (
                  <AddButton field={"Gender"} />
                )}
              </div>
            )}
          </div>

          {/* Country selection */}
          <div className="space-y-3">
            <Label htmlFor="phone">Nationality</Label>
            {isEditing ? (
              <CountrySelector
                onSelect={(countryName) => {
                  userInfo.countryName = countryName ? countryName : "";
                }}
              />
            ) : (
              <div className="flex items-center gap-2">
                {userInfo.countryName ? (
                  <UserInfoLabel fieldInfo={userInfo.countryName} />
                ) : (
                  <AddButton field="Country" />
                )}
              </div>
            )}
          </div>

          {/* Date Of birth */}
          <div className="space-y-2 md:col-span-2">
            {isEditing ? (
              <DateOfBirthSelector
                onSelect={(date) => {
                  userInfo.dateOfBirth = date?.toLocaleDateString();
                }}
              />
            ) : (
              <div className="flex items-center gap-2">
                {userInfo.countryName ? (
                  <UserInfoLabel fieldInfo={userInfo.dateOfBirth} />
                ) : (
                  <AddButton field="Date of birth" />
                )}
              </div>
            )}
          </div>
          {/* Bio Section */}
          {/* TODO : link with user bio */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="bio">About</Label>
            {isEditing ? (
              <Textarea
                id="bio"
                placeholder="Tell us about yourself"
                className="min-h-[100px] !text-[16px]"
              />
            ) : (
              <div className="p-3 bg-gray-50 rounded-lg border min-h-[80px]">
                <span className="text-gray-900">Test user bio</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
