import { ArrowRight } from "lucide-react";
import { JobCard } from "../../features/jobs/components/JobCard";
import type { JobProps } from "../../types/JobProps";
import { useToast } from "../../contexts/ToastContext";

export function FeaturedJobs() {
  const { handleShowCloseToast } = useToast();
  const featuredJobs: Array<JobProps> = [
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
    {
      Title: "Product Manager",
      Company: "MS Solutions",
      Location: "Morocco Eljadida",
      JobType: "Full Time",
      SalaryRange: "$40k - $70k",
      CreatedAt: "2",
      Description: "",
      Skills: [
        { Id: 1, Skill: "Strategy" },
        { Id: 2, Skill: "Analytics" },
        { Id: 3, Skill: "Saas" },
      ],
    },
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

  return (
    <section className="bg-white py-15">
      <div className="custom-container">
        {/* title */}
        <div className="text-center">
          <h2 className="text-4xl font-bold">Featured Jobs</h2>
          <p className="mt-3 text-xl text-gray-600">
            Discover hand-picked opportunities from top companies looking for
            talented professionals like you{" "}
          </p>
        </div>

        {/* jobs */}
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] gap-5 mt-15">
          {featuredJobs.map((job, index) => {
            return <JobCard job={job} key={index} />;
          })}
        </div>
        <button
          className="relative mt-15 block m-auto font-semibold border border-neutral-200 pt-2 pr-10 pb-2 pl-4 rounded hover:bg-neutral-100"
          onClick={() =>
            handleShowCloseToast({
              title: "Not Yet Available",
              description: "Coming soon! This feature is under development.",
            })
          }
        >
          <ArrowRight className="absolute right-2" width="20px" />
          Viwe All Jobs
        </button>
      </div>
    </section>
  );
}
