import { useState } from "react";
import JobFilter from "../components/JobFilter";
import JobSearch from "../components/JobSearch";
import PopularCategories from "../components/PopularCategories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import JobCardFull from "../components/JobCardFull";
import type { JobProps } from "../types/JobProps";
import AuthGuard from "./Auth/authGuard";

const jobs: Array<JobProps> = [
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

export default function JobsPage() {
  const [sortOption, setSortOption] = useState("");
  return (
    <AuthGuard>
      <div className="bg-gray-50">
        {/* hero section */}
        <div className="bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a] py-15">
          <div className="custom-container text-center">
            <h2 className="text-5xl font-bold text-white">
              Find Your Dream Job
            </h2>
            <h4 className="my-3 text-lg font-medium text-white">
              Discover opportunities from top companies around the world
            </h4>
            <div className="max-w-4xl m-auto mt-7">
              <JobSearch />
            </div>
          </div>
        </div>

        {/* Jobs section */}
        <div className="custom-container">
          <div className="flex flex-col py-7 gap-7 lg:flex-row">
            <aside className="w-full lg:w-68 space-y-5">
              <JobFilter />
              <PopularCategories />
            </aside>

            {/* Job listing */}
            <main className="w-full">
              <div className="flex justify-between">
                <h2 className="text-2xl font-bold">Jobs Found</h2>
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-50 py-5">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Most Recent">Most Recent</SelectItem>
                    <SelectItem value="Highest Salary">
                      Highest Salary
                    </SelectItem>
                    <SelectItem value="Most Relevant">Most Relevant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Jobs */}
              <div className="mt-5 space-y-5">
                <JobCardFull jobInfo={jobs[0]} />
                <JobCardFull jobInfo={jobs[0]} />
              </div>
            </main>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
