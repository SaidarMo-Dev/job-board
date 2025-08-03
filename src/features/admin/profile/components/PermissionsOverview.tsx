import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Settings, Shield, Users } from "lucide-react";

const permissions = [
  {
    icon: Shield,
    label: "Full Access",
    description: "Complete system control",
  },
  {
    icon: Users,
    label: "Manage Users",
    description: "Create, edit, delete users",
  },
  {
    icon: BarChart3,
    label: "Analytics",
    description: "View all reports and metrics",
  },
  {
    icon: Settings,
    label: "System Settings",
    description: "Configure application settings",
  },
];
export default function PermissionsPverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-foreground">
          Permissions Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {permissions.map((permission, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 rounded-lg bg-muted"
            >
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                <permission.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground">
                  {permission.label}
                </h3>
                <p className="text-sm mt-1 text-muted-foreground">
                  {permission.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
