import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";

interface ActionProps {
  action: {
    icon: LucideIcon;
    title: string;
  };
  onClick?: () => void;
}
export default function Action({ action, onClick }: ActionProps) {
  return (
    <Button
      variant="outline"
      className="w-full justify-start bg-transparent"
      onClick={onClick}
    >
      <action.icon className="mr-2 h-4 w-4" />
      {action.title}
    </Button>
  );
}
