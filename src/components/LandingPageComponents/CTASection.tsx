import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../ui/button";

export function CTASection() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-6">
            Ready to find your next{" "}
            <span className="text-primary">opportunity</span>?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            Whether you're looking for your dream job or the perfect candidate,
            we've got you covered.
          </p>

          <div className="mt-8 gap-4 flex items-center justify-center">
            <Link to="/auth/register">
              <Button className="transform hover:-translate-y-0.5 transition cursor-pointer bg-primary hover:bg-primary-hover text-white">
                Create Free Account
                <ArrowRight className="opacity-90" />
              </Button>
            </Link>

            <Link to="/jobs">
              <Button className=" cursor-pointer" variant={"outline"}>
                Browse Jobs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
