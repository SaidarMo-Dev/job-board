import { Edit, User } from "lucide-react";
import ProgressBar from "./ProgressBar";
import { Link } from "react-router";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { ROUTES } from "@/constants/routes";

export default function CompleteProfileCard() {
  const profileCompletion = useAppSelector(
    (state) => state.dashboardStatsReducer.stats?.profileCompletion
  );
  return (
    <Card className="bg-gray-50 p-4 rounded-md md:w-105">
      {/* header */}
      <CardHeader>
        <div className="flex items-center gap-2 text-sky-900 font-bold text-xl mb-1">
          <User className="h-5 w-5" />
          Complete Your Profile
        </div>
        <div className="text-sky-700 text-sm font-meduim">
          Get better job matches by completing your profile
        </div>
      </CardHeader>
      {/* centent */}
      <CardContent className="space-y-4 mt-7">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-black">
            Profile strength
          </span>
          <span className="text-sm text-sky-700">
            {profileCompletion ?? 10}%
          </span>
        </div>
        <ProgressBar value={profileCompletion ?? 10} color="bg-sky-600" />
        <Button asChild className="w-full">
          <Link to={ROUTES.MEMBER.PROFILE}>
            <Edit className="w-5 h-5" />
            Edit Profile
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
