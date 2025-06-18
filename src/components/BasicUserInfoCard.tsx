import { Briefcase, Edit3, Save } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { useState } from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";

export default function BasicUserInfoCard() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    bio: "I am actively looking for new jobs and am open to all types of work experiences.",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            {isEditing ? (
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                placeholder="Enter your first name"
              />
            ) : (
              <div className="flex items-center gap-2">
                {formData.firstName ? (
                  <span className="text-gray-900">{formData.firstName}</span>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-sky-600 p-0 h-auto"
                  >
                    + Add first name
                  </Button>
                )}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            {isEditing ? (
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                placeholder="Enter your last name"
              />
            ) : (
              <div className="flex items-center gap-2">
                {formData.lastName ? (
                  <span className="text-gray-900">{formData.lastName}</span>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-sky-600 p-0 h-auto"
                  >
                    + Add last name
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Phone Field */}
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          {isEditing ? (
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="Enter your phone number"
              type="tel"
            />
          ) : (
            <div className="flex items-center gap-2">
              {formData.phone ? (
                <span className="text-gray-900">{formData.phone}</span>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sky-600 p-0 h-auto"
                >
                  + Add phone
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Address Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="address">Address</Label>
            {isEditing ? (
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Enter your address"
              />
            ) : (
              <div className="flex items-center gap-2">
                {formData.address ? (
                  <span className="text-gray-900">{formData.address}</span>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-sky-600 p-0 h-auto"
                  >
                    + Add address
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bio Section */}
        <div className="space-y-2">
          <Label htmlFor="bio">About</Label>
          {isEditing ? (
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              placeholder="Tell us about yourself"
              className="min-h-[100px]"
            />
          ) : (
            <div className="flex items-start gap-2">
              <Briefcase className="h-4 w-4 text-gray-500 mt-1" />
              <p className="text-gray-900">{formData.bio}</p>
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
