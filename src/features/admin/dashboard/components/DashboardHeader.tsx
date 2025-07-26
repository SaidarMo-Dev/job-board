import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="flex items-center">
      <div>
        <h2 className="font-bold text-3xl text-gray-800 mb-1">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your iLink job portal.
        </p>
      </div>
      <Button
        className="ml-auto  bg-sky-600 w-40 hover:bg-sky-700 cursor-pointer"
        size="lg"
      >
        <Plus />
        Quick action
      </Button>
    </header>
  );
}
