import { type JobResponse } from "@/features/jobs/jobTypes";
import ApplicationHeader from "./ApplicationHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const job: JobResponse = {
  jobId: 1,
  title: "Test job",
  description: "test Description",
  companyName: "Hello",
  location: "El Jadida",
  jobType: "Full Type",
  maxSalary: 120000,
  minSalary: 130000,
  experienceLevel: "EntryLevel",
  datePosted: new Date(),
  status: "Pending",
  skills: [],
  cretaedByUser: "Mohammed",
  categories: [],
};

export default function JobApplicationWizard() {
  return (
    <div className="max-w-4xl m-auto space-y-5">
      {/* Application flow header */}
      <ApplicationHeader jobData={job} />
      <Card>
        {/* Steps */}
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Application - Step 1 of 4</CardTitle>
            <span className="text-sm text-gray-500">Personal info</span>
          </div>
          <Progress value={(1 / 4) * 100} className="mt-2" />
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
}
