import JobApplicationCard from "@/components/JobApplicationCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const jobTest = {
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
};

export default function UserApplications() {
  return (
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
              <JobApplicationCard jobInfo={jobTest} status="incompleted" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
