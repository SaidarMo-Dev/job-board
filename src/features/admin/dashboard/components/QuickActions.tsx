import { Briefcase, Building, Settings, Users } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Action from "./Action";
const actions = [
  {
    title: "Add New User",
    icon: Users,
    onClick: () => console.log("Add user clicked"),
  },
  {
    title: "Post New Job",
    icon: Briefcase,
    onClick: () => console.log("Post job clicked"),
  },
  {
    title: "Add Company",
    icon: Building,
    onClick: () => console.log("Add company clicked"),
  },
  {
    title: "System Settings",
    icon: Settings,
    onClick: () => console.log("Settings clicked"),
  },
];

export default function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Quick Actions</CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {actions.map((action) => (
          <Action
            action={action}
            onClick={() => console.log(`${action.title} clicked`)}
          />
        ))}
      </CardContent>
    </Card>
  );
}
