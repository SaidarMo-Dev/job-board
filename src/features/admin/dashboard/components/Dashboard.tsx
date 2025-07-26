import { Briefcase, Building, TrendingUp, Users } from "lucide-react";
import type { ActivityItem, StatsCard } from "../dashboardTypes";
import DashboardHeader from "./DashboardHeader";
import StatsCards from "./statsCards";
import QuickActions from "./QuickActions";
import { ActivityTimeline } from "./ActivityTimeline";
import { AnalyticsOverview } from "./anlytics/AnalyticsOverview";

const cards: StatsCard[] = [
  {
    title: "Total Users",
    icon: Users,
    value: "120",
    change: "2.4%",
    changeType: "positive",
  },
  {
    title: "Active Jobs",
    icon: Briefcase,
    value: "39",
    change: "89%",
    changeType: "positive",
  },
  {
    title: "Companies",
    icon: Building,
    value: "23",
    change: "34%",
    changeType: "positive",
  },
  {
    title: "Applications",
    icon: TrendingUp,
    value: "120",
    change: "2.4%",
    changeType: "positive",
  },
];

const recentActivity: ActivityItem[] = [
  {
    id: "1",
    type: "user",
    message: "New user registration",
    timestamp: "2 minutes ago",
    user: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    id: "2",
    type: "job",
    message: "Job posting approved",
    timestamp: "15 minutes ago",
    user: {
      name: "Tech Corp",
    },
  },
  {
    id: "3",
    type: "company",
    message: "Company profile updated",
    timestamp: "1 hour ago",
    user: {
      name: "Innovation Labs",
    },
  },
  {
    id: "4",
    type: "user",
    message: "Application submitted",
    timestamp: "2 hours ago",
    user: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  },
];
export default function Dashboard() {
  return (
    <section className="px-2">
      <DashboardHeader />
      {/* content */}
      <div className="mt-7">
        <StatsCards cards={cards} />
        <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-6">
          <ActivityTimeline activities={recentActivity} />
          <QuickActions />
        </div>
        <AnalyticsOverview />
      </div>
    </section>
  );
}
