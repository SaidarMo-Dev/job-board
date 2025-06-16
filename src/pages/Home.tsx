import {
  Briefcase,
  ChevronRight,
  Clock,
  Eye,
  FileText,
  Heart,
  MapPin,
  Search,
  Star,
  User,
  Users,
  Zap,
} from "lucide-react";
import HomeHeader from "../components/HomeHeader";
import { Link } from "react-router";

const JobFeaturesInfo = [
  {
    textColor: "text-sky-600",
    hoverTextColor: "hover:text-sky-600",
    title: "In Your Area",
    decription: "Jobs closest to you",
    mainColor: "sky-600",
    icon: MapPin,
    footerIcon: Users,
    footerDescription: "250+ jobs",
    footerBg: "bg-sky-200",
  },
  {
    hoverTextColor: "hover:text-green-600",
    textColor: "text-green-600",
    title: "Easy Apply Jobs",
    decription: "One-click apply using your profile",
    mainColor: "green-600",
    icon: Zap,
    footerIcon: Zap,
    footerDescription: "Quick apply",
    footerBg: "bg-green-200",
  },
  {
    hoverTextColor: "hover:text-purple-600",
    textColor: "text-purple-600",
    title: "Gig Work",
    decription: "Design your own schedule",
    mainColor: "purple-600",
    icon: Clock,
    footerIcon: Clock,
    footerDescription: "Flexible",
    footerBg: "bg-purple-200",
  },
];

export default function Home() {
  return (
    <div className="mb-15">
      <HomeHeader />

      <main className="custom-container">
        {/* hero section  */}
        <section>
          <div className="text-center mb-8 mt-10">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Welcome back! 👋
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ready to find your next opportunity? Let's discover jobs that
              match your skills and preferences.
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

        {/* Quick Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-12 mt-12">
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-300 rounded-md">
            <div className="p-0">
              <Briefcase className="h-8 w-8 text-sky-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-sky-900">0</div>
              <div className="text-sm text-sky-700">Interviews</div>
            </div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-md">
            <div className="p-0">
              <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-900">0</div>
              <div className="text-sm text-green-700">Applications</div>
            </div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-md">
            <div className="p-0">
              <Heart className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-900">0</div>
              <div className="text-sm text-purple-700">Saved Jobs</div>
            </div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-md">
            <div className="p-0">
              <Eye className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-900">0</div>
              <div className="text-sm text-orange-700">Recently Viewed</div>
            </div>
          </div>
        </section>
        {/* Jobs For you */}
        <section>
          {/* jobs in your area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div>
              <h2 className="font-semibold text-3xl mb-2">
                Discover more great jobs
              </h2>
              <h3 className="text-gray-600">
                Job matches based on your preferences
              </h3>

              {/* job features */}
              <div className="mt-8">
                <div>
                  {JobFeaturesInfo.map((jobInfo) => {
                    return (
                      <div
                        className={`border bg-white p-6 border-gray-200 rounded-md ${jobInfo.hoverTextColor} hover:shadow-md duration-200 mb-5 hover:-translate-y-1.5`}
                      >
                        <div className="flex gap-4 items-center">
                          <div
                            className={`${jobInfo.footerBg} rounded-md p-2 ${jobInfo.textColor}`}
                          >
                            <jobInfo.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">
                              {jobInfo.title}
                            </h3>

                            <p className="text-gray-700 text-sm">
                              {jobInfo.footerDescription}
                            </p>
                          </div>
                        </div>
                        {/* footer */}
                        <div className="flex items-center justify-between mt-4">
                          <div
                            className={`flex items-center rounded-full py-1 px-2 gap-2 ${jobInfo.footerBg} ${jobInfo.textColor}`}
                          >
                            <jobInfo.footerIcon className="w-3 h-3" />
                            <h4 className="text-xs font-bold">
                              {jobInfo.footerDescription}
                            </h4>
                          </div>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Profile and job matches  */}
            <div>
              {/* Job matches  */}
              <div>
                <h2 className="text-3xl font-semibold">Get better matches</h2>
                <p className="text-gray-600 mt-3">
                  Get better matches We’ll use your responses to give you better
                  matches in the future. Update your answers anytime on
                  <Link to="" className="text-sky-600 font-semibold">
                    your profile
                  </Link>
                </p>
                <div className="bg-white mt-3 p-5 text-center rounded-md">
                  <h3 className="font-semibold text-2xl">
                    Are you currently looking for a job in El Jadida?
                  </h3>
                  <div className="grid grid-cols-2 mt-8 gap-3 text-sm font-bold">
                    <button className="border border-gray-300 rounded-md p-2 hover:bg-gray-100 cursor-pointer">
                      Yes
                    </button>
                    <button className="border border-gray-300 rounded-md p-2 hover:bg-gray-100 cursor-pointer">
                      No
                    </button>
                    <button className="rounded-md p-2 hover:bg-gray-100 cursor-pointer">
                      Skip
                    </button>
                    <button className="rounded-md p-2 text-white bg-sky-600 hover:bg-sky-700 cursor-pointer">
                      Save
                    </button>
                  </div>
                </div>
              </div>
              {/* Complete Profile */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 p-4 rounded-md mt-2">
                {/* header */}
                <div>
                  <div className="flex items-center gap-2 text-sky-900 font-bold text-xl mb-1">
                    <User className="h-5 w-5" />
                    Complete Your Profile
                  </div>
                  <div className="text-sky-700 text-sm font-meduim">
                    Get better job matches by completing your profile
                  </div>
                </div>
                {/* centent */}
                <div className="space-y-4 mt-7">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-black">
                      Profile strength
                    </span>
                    <span className="text-sm text-sky-700">14%</span>
                  </div>
                  {/* progress */}
                  <div className="w-full bg-white h-2 rounded-full">
                    <div className="w-1/6 bg-black h-full rounded-full"></div>
                  </div>
                  <button className="w-full bg-sky-600 hover:bg-sky-700 p-2 mt-1 text-white rounded-md text-sm font-semibold cursor-pointer">
                    Edit Profile
                  </button>
                </div>
              </div>
              {/* end complete profile */}
            </div>
          </div>
          {/* Quick tips */}
          <div className="border bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 p-5 rounded-md">
            <div>
              <div className="flex items-center gap-2 text-green-900 font-bold text-2xl">
                <Zap className="h-5 w-5" />
                Quick Tip
              </div>
            </div>
            <div className="mt-7">
              <p className="text-sm text-green-800 mb-3">
                Complete your profile to get 3x more job matches and stand out
                to employers.
              </p>
              <button className="border border-green-300 text-green-700 hover:bg-green-100 bg-white py-2 px-4 rounded-md cursor-pointer">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
