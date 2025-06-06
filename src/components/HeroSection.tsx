export function HeroSection() {
  return (
    <>
      <div className="bg-blue-50 p-15">
        <div className="text-center">
          <h1 className="text-6xl font-bold">Find Your Dream Job</h1>
          <span className="text-6xl font-bold text-sky-500">Today</span>
          <p className="text-2xl mt-5 text-gray-600">
            Connect with thousands of companies hiring now. Your next career
            opportunity is just a search away.
          </p>
        </div>
        <div className="bg-white mt-12 p-5 flex gap-3">
          <input
            type="text"
            placeholder="Job Title"
            className="border-2 p-3 w-1/2 outline-0 rounded-sm border-gray-200"
          />
          <input
            type="text"
            placeholder="Location"
            className="border-2 p-3  w-1/2 outline-0 rounded-sm border-gray-200"
          />
          <button className="cursor-pointer w-60 rounded-sm bg-sky-500 text-white">
            search Jobs
          </button>
        </div>
      </div>
    </>
  );
}
