import type { LucideIcon } from "lucide-react";

export interface StatsCard {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: LucideIcon;
}

export interface ActivityItem {
  id: string;
  type: "user" | "job" | "company";
  message: string;
  timestamp: string;
  user?: {
    name: string;
    avatar?: string;
  };
}
