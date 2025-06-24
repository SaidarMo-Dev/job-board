import { selectCurrentUser } from "@/features/auth/authSlice";
import { MapPin, Search } from "lucide-react";
import { useSelector } from "react-redux";

export default function HomeHeroSection() {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <section>
      <div className="text-center mb-8 mt-10">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Welcome back {currentUser?.firstName}! 👋
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Ready to find your next opportunity? Let's discover jobs that match
          your skills and preferences.
        </p>
      </div>
      <div>
        {/* Job Search  */}

        <div className="max-w-4xl mx-auto shadow-lg border-0 bg-white/90 backdrop-blur-sm">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative w-full md:w-1/2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  placeholder="Job title"
                  className="pl-10 h-12 text-lg focus:border-blue-500 border border-neutral-300 w-full rounded-md"
                />
              </div>
              <div className="relative w-full md:w-1/2">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  placeholder="Location"
                  className="pl-10 h-12 text-lg focus:border-blue-500 border border-neutral-300 focus:outline-none w-full rounded-md"
                />
              </div>
              <button className="h-12 bg-sky-600 hover:bg-sky-700 text-white md:w-50 rounded-md flex items-center justify-center px-3 text-sm font-medium w-full">
                <Search className="h-5 w-5 mr-2" />
                Search Job
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
