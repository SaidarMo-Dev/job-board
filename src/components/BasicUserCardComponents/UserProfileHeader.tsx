import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Mail, Phone, Edit, Share2, Camera } from "lucide-react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectCurrentUser } from "@/features/auth/authSlice";

export default function ProfileHeader() {
  const currentUser = useAppSelector(selectCurrentUser);

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
                  src="/placeholder.svg?height=128&width=128"
                  alt="Profile"
                />
                <AvatarFallback className="text-2xl bg-gray-200">
                  MS
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                className="absolute bottom-2 right-2 rounded-full w-8 h-8 p-0 bg-white text-gray-600 hover:bg-gray-50 border border-gray-300"
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

              {/* <div className="flex gap-2">
                <Badge
                  variant="secondary"
                  className="bg-accent text-accent-foreground"
                >
                  Open to work
                </Badge>
                <Badge variant="outline">Remote friendly</Badge>
              </div> */}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
