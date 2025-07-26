import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const topCompaniesData = [
  { name: "Microsoft", jobs: "10", applications: "123" },
  { name: "EduTech Solutions", jobs: "14", applications: "134" },
  { name: "ETR Solutions", jobs: "5", applications: "68" },
];

export function TopCompaniesTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Top Hiring Companies</CardTitle>
        <CardDescription>
          Companies with the most active job postings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topCompaniesData.map((company, index) => (
            <div
              key={company.name}
              className="flex items-center justify-between p-3 rounded-lg border"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-600/70 text-white font-semibold text-sm">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium">{company.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {company.jobs} active jobs
                  </p>
                </div>
              </div>
              <Badge variant="secondary">
                {company.applications} applications
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
