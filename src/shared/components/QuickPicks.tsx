import { Clock, MapPin, Users, Zap } from "lucide-react";
import QuickPicksCard from "./QuickPicksCard";

const JobFeaturesInfo = [
  {
    textColor: "text-sky-600",
    hoverTextColor: "hover:text-sky-600",
    title: "In Your Area",
    decription: "Jobs closest to you",
    mainColor: "sky-600",
    icon: MapPin,
    footerIcon: Users,
    footerDescription: "250+ jobs",
    footerBg: "bg-sky-200",
  },
  {
    hoverTextColor: "hover:text-green-600",
    textColor: "text-green-600",
    title: "Easy Apply Jobs",
    decription: "One-click apply using your profile",
    mainColor: "green-600",
    icon: Zap,
    footerIcon: Zap,
    footerDescription: "Quick apply",
    footerBg: "bg-green-200",
  },
  {
    hoverTextColor: "hover:text-purple-600",
    textColor: "text-purple-600",
    title: "Gig Work",
    decription: "Design your own schedule",
    mainColor: "purple-600",
    icon: Clock,
    footerIcon: Clock,
    footerDescription: "Flexible",
    footerBg: "bg-purple-200",
  },
];

export default function QuickPicks() {
  return (
    <div>
      <h2 className="font-semibold text-3xl mb-2">Discover more great jobs</h2>
      <h3 className="text-gray-600">Job matches based on your preferences</h3>

      {/* Explore jobs */}
      <div className="mt-8">
        {JobFeaturesInfo.map((jobInfo) => {
          return <QuickPicksCard jobInfo={jobInfo} />;
        })}
      </div>
    </div>
  );
}
