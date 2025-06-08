import { JobCard } from "../JobCard";

export function FeaturedJobs() {
  return (
    <section className="bg-white p-15">
      <div className="custum-container">
        {/* title */}
        <div className="text-center">
          <h2 className="text-4xl font-bold">Featured Jobs</h2>
          <p className="mt-3 text-xl text-gray-600">
            Discover hand-picked opportunities from top companies looking for
            talented professionals like you{" "}
          </p>
        </div>

        {/* jobs */}
        <div className="mt-15 grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-5">
          <JobCard
            job={{
              Title: "Senior Frontend Developer",
              Company: "Microsoft",
              Location: "Now York, NY",
              JobType: "Full Time",
              SalaryRange: "$90k - $120k",
              Skills: [
                { Id: 1, Skill: "Typescript" },
                { Id: 2, Skill: "React" },
                { Id: 3, Skill: "JS" },
              ],
            }}
          />
          <JobCard
            job={{
              Title: "Product Manager",
              Company: "MS Solutions",
              Location: "Morocco Eljadida",
              JobType: "Full Time",
              SalaryRange: "$40k - $70k",
              Skills: [
                { Id: 1, Skill: "Strategy" },
                { Id: 2, Skill: "Analytics" },
                { Id: 3, Skill: "Saas" },
              ],
            }}
          />
          <JobCard
            job={{
              Title: "UX Designer",
              Company: "Oracle",
              Location: "Morocoo Tanger, Af",
              JobType: "Part Time",
              SalaryRange: "$97k - $100k",
              Skills: [
                { Id: 1, Skill: "Figma" },
                { Id: 2, Skill: "Mobile" },
              ],
            }}
          />
          <JobCard
            job={{
              Title: "Senior Frontend Developer",
              Company: "Microsoft",
              Location: "Now York, NY",
              JobType: "Full Time",
              SalaryRange: "$90k - $120k",
              Skills: [
                { Id: 1, Skill: "Typescript" },
                { Id: 2, Skill: "React" },
                { Id: 3, Skill: "JS" },
              ],
            }}
          />
          <JobCard
            job={{
              Title: "Senior Frontend Developer",
              Company: "Microsoft",
              Location: "Now York, NY",
              JobType: "Full Time",
              SalaryRange: "$90k - $120k",
              Skills: [
                { Id: 1, Skill: "Typescript" },
                { Id: 2, Skill: "React" },
                { Id: 3, Skill: "JS" },
              ],
            }}
          />
          <JobCard
            job={{
              Title: "Senior Frontend Developer",
              Company: "Microsoft",
              Location: "Now York, NY",
              JobType: "Full Time",
              SalaryRange: "$90k - $120k",
              Skills: [
                { Id: 1, Skill: "Typescript" },
                { Id: 2, Skill: "React" },
                { Id: 3, Skill: "JS" },
              ],
            }}
          />
        </div>

        <button>Viwe All Jobs</button>
      </div>
    </section>
  );
}
