import JobApplicationCard from "@/components/JobApplicationCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthGuard from "./Auth/authGuard";

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

export default function UserApplications() {
  return (
    <AuthGuard>
      <div className="bg-neutral-50 h-dvh">
        <div className="custom-container">
          <h2 className="font-semibold text-5xl pt-10">Applications</h2>
          <p className="text-lg text-gray-600 mt-2">
            Track your job application progress
          </p>
          <Tabs defaultValue="all" className="w-full mt-7">
            <TabsList className="w-full grid grid-cols-4 lg:w-[500px]">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="submitted">Submited</TabsTrigger>
              <TabsTrigger value="incomplete">Incomplete</TabsTrigger>
              <TabsTrigger value="expired">Expired</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {jobs.map((job) => {
                  return (
                    <JobApplicationCard jobInfo={job} status="incompleted" />
                  );
                })}
              </div>
            </TabsContent>
            {/* <div className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              No {tab === "all" ? "" : tab} applications yet
            </h3>
            <p className="text-muted-foreground mb-4">
              {tab === "incomplete"
                ? "Complete your pending applications to improve your chances"
                : "Start applying to jobs to see them here"}
            </p>
            <Button>Browse Jobs</Button>
          </div> */}
          </Tabs>
        </div>
      </div>
    </AuthGuard>
  );
}
