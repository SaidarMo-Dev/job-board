import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { StatsCard } from "../dashboardTypes";

export default function StatsCard({ card }: { card: StatsCard }) {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
        <card.icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{card.value}</div>
        <p
          className={`text-xs ${
            card.changeType === "positive"
              ? "text-green-600"
              : card.changeType === "negative"
              ? "text-red-600"
              : "text-muted-foreground"
          }`}
        >
          {card.change} from last month
        </p>
      </CardContent>
    </Card>
  );
}
