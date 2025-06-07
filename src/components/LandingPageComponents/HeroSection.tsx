import { Blocks, MapPin, Search, Users } from "lucide-react";

export function HeroSection() {
  return (
    <>
      <section className="bg-slate-50 p-15">
        <div className="custum-container">
          {/* Descriptions */}
          <div className="text-center">
            <h1 className="text-6xl font-bold">Find Your Dream Job</h1>
            <span className="text-6xl font-bold text-sky-500">Today</span>
            <p className="text-2xl mt-5 text-gray-600">
              Connect with thousands of companies hiring now. Your next career
              opportunity is just a search away.
            </p>
          </div>

          {/* hero-media */}
          <div className="relative bg-white p-8 mt-15 rounded-xl shadow-2xl">
            <div>
              <img
                src="/public/images/heroImage.jpg"
                alt="hero image"
                className="w-full h-80 object-cover rounded-xl"
              />
            </div>
            <div className="absolute -top-4 -left-5 flex items-center rounded-lg bg-white gap-2 shadow-xl p-4">
              <div>
                <Users color="green" />
              </div>
              <div className="font-semibold">Remote Teams</div>
            </div>
            <div className="absolute -right-5 -bottom-4 flex items-center rounded-lg bg-white gap-2 shadow-xl p-4">
              <div>
                <Blocks color="#1e88e5" />
              </div>
              <div className="font-semibold">Career Growth</div>
            </div>
          </div>
        </div>
      </section>

      {/* Find Job */}
      <section className="mt-15 p-15 bg-white text-center">
        <div className="custom-container">
          {/* main container find job */}
          <div>
            <h2 className="font-bold text-4xl">Start Your Job Search</h2>
            <h4 className="mt-2 text-lg text-gray-500">Find opportunities that match your skills and aspirations</h4>
            
            <div className="flex mt-5 bg-white gap-3 rounded-full border border-gray-100 items-center pr-2 shadow-lg">
              {/* Job Title Input */}
              <div className="relative w-1/2">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Job Title"
                  className="w-full pl-12 p-3 outline-0 rounded-lg border-gray-200"
                />
              </div>

              {/* Separator */}
              <div className="h-10 w-0.5 bg-gray-400"></div>

              {/* Location Input */}
              <div className="relative w-1/2">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full pl-12 p-4 outline-0 rounded-lg border-gray-200"
                />
              </div>
              <button className="cursor-pointer w-35 p-2 rounded-3xl bg-sky-600 text-white text-lg hover:bg-sky-600/90">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
