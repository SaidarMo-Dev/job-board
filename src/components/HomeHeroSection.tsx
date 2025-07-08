import { selectCurrentUser } from "@/features/auth/authSlice";
import JobSearch from "@/features/jobs/components/JobSearch";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

interface HomeHeroSectionProps {
  className?: string;
}
export default function HomeHeroSection({
  className = "",
}: HomeHeroSectionProps) {
  const currentUser = useSelector(selectCurrentUser);

  const navigate = useNavigate();

  function performSearch(title: string, location: string) {
    const params = new URLSearchParams();

    if (title && location) {
      params.set("searchByTitle", title);
      params.set("searchByLocation", location);

      navigate(`/jobs?${params.toString()}`);
    } else if (title) {
      params.set("searchByTitle", title);
      navigate(`/jobs?${params.toString()}`);
    } else if (location) {
      params.set("searchByLocation", location);
      navigate(`/jobs?${params.toString()}`);
    }
  }
  return (
    <section className={`py-10 ${className}`}>
      <div className="text-center">
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

        <JobSearch
          onSearch={(title, location) => performSearch(title, location)}
          className="max-w-220 m-auto mt-7"
        />
      </div>
    </section>
  );
}
