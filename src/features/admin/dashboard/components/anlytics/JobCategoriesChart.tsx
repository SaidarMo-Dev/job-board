import "@/App.css";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { getCSSVariable } from "@/utils/getCSSVariable";
import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const chartConfig = {
  count: {
    label: "Jobs",
  },
  technology: {
    label: "Technology",
    color: "hsl(var(--chart-1))",
  },
  healthcare: {
    label: "Healthcare",
    color: "hsl(var(--chart-2))",
  },
  finance: {
    label: "Finance",
    color: "hsl(var(--chart-3))",
  },
  education: {
    label: "Education",
    color: "hsl(var(--chart-4))",
  },
  marketing: {
    label: "Marketing",
    color: "hsl(var(--chart-5))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-6))",
  },
} satisfies ChartConfig;

interface JobCategory {
  category: string;
  count: number;
  fill: string;
}

export default function JobCategoriesChart() {
  const [chartData, setChartData] = useState<JobCategory[]>([]);

  const updateColors = () => {
    const data: JobCategory[] = [
      { category: "Technology", count: 45, fill: getCSSVariable("--chart-1") },
      { category: "Healthcare", count: 32, fill: getCSSVariable("--chart-2") },
      { category: "Finance", count: 28, fill: getCSSVariable("--chart-3") },
      { category: "Education", count: 22, fill: getCSSVariable("--chart-4") },
      { category: "Marketing", count: 18, fill: getCSSVariable("--chart-5") },
      { category: "Other", count: 15, fill: getCSSVariable("--chart-6") },
    ];
    setChartData(data);
  };

  useEffect(() => {
    updateColors();

    const observer = new MutationObserver(() => updateColors());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Job Categories</CardTitle>
        <CardDescription>
          Distribution of active job postings by category
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, percent }) =>
                  `${category} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
