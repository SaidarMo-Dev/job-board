import JobSearch from "../components/JobSearch";

export default function JobsPage() {
  return (
    <>
      {/* hero section */}
      <div className="custom-container text-center">
        <h2 className="mt-15 text-5xl font-bold">Find Your Dream Job</h2>
        <h4 className="my-3 text-lg font-medium">
          Discover opportunities from top companies around the world
        </h4>
        <div className="max-w-4xl m-auto mt-7">
          <JobSearch />
        </div>
      </div>

      {/* Content */}
      <main>
        <div>
          <aside>
            
          </aside>
        </div>
      </main>
    </>
  );
}
