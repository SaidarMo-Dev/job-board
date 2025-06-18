import JobCardMini from "@/components/JobCardMini";

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
export default function UserSavedJobs() {
  return (
    <div className="bg-neutral-50 h-dvh">
      <div className="custom-container">
        <h2 className="font-semibold text-5xl pt-10">Saved Jobs</h2>
        <p className="text-lg text-gray-600 mt-2">
          Keep track of jobs you're interested in
        </p>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <JobCardMini jobInfo={jobTest} />
          <JobCardMini jobInfo={jobTest} />
          <JobCardMini jobInfo={jobTest} />
        </div>
      </div>
    </div>
  );
}
