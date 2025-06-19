import JobCardMini from "@/components/JobCardMini";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const jobs = [
  {
    Title: "Senior Frontend Developer",
    Company: "Microsoft",
    Location: "Now York, NY",
    JobType: "Full Time",
    SalaryRange: "$90k - $120k",
    CreatedAt: "2",
    Description:
      "Join our team to build cutting-edge web applications using modern React ecosystem. Work with a talented",
    Skills: [
      { Id: 1, Skill: "Typescript" },
      { Id: 2, Skill: "React" },
      { Id: 3, Skill: "JS" },
    ],
  },
];
export default function JobsHistoryPage() {
  return (
    <div className="bg-neutral-50 h-dvh">
      <div className="custom-container">
        <h2 className="font-semibold text-4xl pt-10">Recently viewed jobs</h2>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs &&
            jobs.map((job) => {
              return <JobCardMini jobInfo={job}/>;
            })}
        </div>
        {jobs.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No saved jobs yet</h3>
            <p className="text-muted-foreground mb-4">
              Start browsing jobs and save the ones you're interested in
            </p>
            <Button>Browse Jobs</Button>
          </div>
        )}
      </div>
    </div>
  );
}
