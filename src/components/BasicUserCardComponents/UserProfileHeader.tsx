import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Mail, Phone, Share2, Camera } from "lucide-react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { useRef, useState } from "react";
import { UplodUserProfileImage } from "@/features/users/userApi";
import { toast } from "react-toastify";
import { extractAxiosErrorMessage } from "@/utils/apiErrorHandler";

export default function ProfileHeader() {
  const currentUser = useAppSelector(selectCurrentUser);

  const initials = currentUser
    ? `${currentUser.firstName?.[0] ?? ""}${currentUser.lastName?.[0] ?? ""}` ||
      "U"
    : "U";

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file", {
        position: "top-center",
      });

      return;
    }

    setPreviewUrl(URL.createObjectURL(file));
    setIsUploading(true);

    try {
      const res = await UplodUserProfileImage(file);
      if (res.succeeded) {
        toast.success("Profile image uploaded successfully", {
          position: "top-center",
        });
      } else {
        toast.error(res.message || "Failed to upload profile image", {
          position: "top-center",
        });
        setPreviewUrl(null);
      }
    } catch (error) {
      console.log(error);
      const message = extractAxiosErrorMessage(error);

      toast.error(message || "Failed to upload profile image", {
        position: "top-center",
      });
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-1">
            Manage your personal information and preferences
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Share2 className="h-4 w-4" />
          Share profile
        </Button>
      </div>

      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                <AvatarImage
                  src={
                    previewUrl ||
                    currentUser?.profileImageUrl ||
                    "/images/avatar-placeholder.svg"
                  }
                  alt="Profile picture"
                />
                <AvatarFallback className="text-2xl bg-gray-200">
                  {initials}
                </AvatarFallback>
              </Avatar>
              {/* Hidden file input */}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              {/* Upload button */}
              <Button
                size="sm"
                disabled={isUploading}
                className="absolute bottom-2 right-2 rounded-full w-8 h-8 p-0
                  bg-white text-gray-600 hover:bg-gray-50 border 
                  border-gray-300 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  {currentUser?.firstName + " " + currentUser?.lastName}
                </h1>

                <p className="text-foreground mt-2 leading-relaxed">
                  No bio speciefied
                </p>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {currentUser?.countryName ?? "Unknown"}
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {currentUser?.email ?? "Unknown"}
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  {currentUser?.phoneNumber ?? "Unknown"}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
