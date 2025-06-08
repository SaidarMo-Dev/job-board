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
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
        </div>

        <button>Viwe All Jobs</button>
      </div>
    </section>
  );
}
