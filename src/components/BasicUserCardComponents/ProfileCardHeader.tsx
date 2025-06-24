import { Camera, MapPin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/authSlice";

export default function ProfileCarHeader() {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <Card className="overflow-hidden py-0">
      <div className="h-32 bg-gradient-to-tr from-[#4338ca] via-[#1e40af] to-[#164e63]"></div>
      <CardContent className="relative pt-0 pb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-16">
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
          <div className="flex-1 sm:ml-4 mt-4 sm:mt-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {currentUser?.firstName} {currentUser?.lastName}
                </h2>
                <p className="text-gray-600">Software Developer</p>
                <div className="flex items-center gap-2 mt-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">
                    {currentUser?.countryName
                      ? currentUser.countryName
                      : "Select Nationality"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  Open to work
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
