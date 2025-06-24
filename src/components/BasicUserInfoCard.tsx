import { Briefcase, Edit3, Save } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { useState } from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/authSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import CountrySelector from "./BasicUserComponents/CountrySelector";
import UserInfoLabel from "./BasicUserComponents/UserInfoLabel";
import AddButton from "./BasicUserComponents/AddButton";

export default function BasicUserInfoCard() {
  const [isEditing, setIsEditing] = useState(false);

  const currentUser = useSelector(selectCurrentUser);
  const [userInfo, setUserInfo] = useState({ ...currentUser });

  // handle input change
  const handleInputChange = (field: string, value: string) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Handle save logic here
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* FirstName Field */}
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            {isEditing ? (
              <Input
                id="firstName"
                value={userInfo.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                placeholder="Enter your first name"
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
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            {isEditing ? (
              <Input
                id="lastName"
                value={userInfo.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                placeholder="Enter your last name"
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
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            {isEditing ? (
              <Input
                id="phone"
                value={userInfo.PhoneNumber}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Enter your phone number"
                type="tel"
              />
            ) : (
              <div className="flex items-center gap-2">
                {userInfo.PhoneNumber ? (
                  <UserInfoLabel fieldInfo={userInfo.PhoneNumber} />
                ) : (
                  <AddButton field={"Phone Number"} />
                )}
              </div>
            )}
          </div>

          {/* Address Fields */}

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            {isEditing ? (
              <Input
                id="address"
                value={userInfo.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Enter your address"
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

          <div className="space-y-2">
            <Label htmlFor="phone">Gender</Label>
            {isEditing ? (
              <Select
                value={userInfo.gender}
                onValueChange={(value) => {
                  handleInputChange("gender", value);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">other</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="flex items-center gap-2">
                {userInfo.PhoneNumber ? (
                  <UserInfoLabel fieldInfo={userInfo.gender} />
                ) : (
                  <AddButton field={"Gender"} />
                )}
              </div>
            )}
          </div>

          {/* Country selection */}
          <div className="space-y-2">
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
        </div>

        {/* Bio Section */}
        {/* TODO : link with user bio */}
        <div className="space-y-2 w-1/2">
          <Label htmlFor="bio">About</Label>
          {isEditing ? (
            <Textarea
              id="bio"
              placeholder="Tell us about yourself"
              className="min-h-[100px]"
            />
          ) : (
            <div className="flex items-start gap-2">
              <Briefcase className="h-4 w-4 text-gray-500 mt-1" />
              <p className="text-gray-900">Test user bio</p>
            </div>
          )}
        </div>

        {/* Status Badge */}
        <div className="pt-2">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Open to work
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
