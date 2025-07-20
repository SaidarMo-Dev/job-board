import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Home, Search } from "lucide-react";
import { Link } from "react-router";

export function NotFound() {
  return (
    <div className="p-5 md:p-15 md:w-3xl m-auto">
      <Card className="text-center px-15">
        {/* 404 Number */}
        <div className="flex justify-center items-center">
          <div className="relative mb-3">
            <h2 className="text-9xl md:text-[9rem] font-extrabold text-sky-600 relative z-10">
              404
            </h2>
            <div className="absolute inset-0 text-9xl md:text-[9rem] font-bold text-sky-200 leading-none select-none transform translate-x-2 translate-y-2">
              404
            </div>
          </div>
        </div>
        {/* Search Icon */}
        <div className="w-full flex items-center justify-center">
          <div className="bg-sky-600 text-white rounded-full w-13 h-13 flex items-center justify-center">
            <Search />
          </div>
        </div>

        {/* Content */}
        <CardContent>
          <h3 className="text-3xl font-bold">Page Not Found</h3>
          <div className="w-full flex justify-center items-center">
            <p className=" mt-4 text-gray-500 font-semibold text-lg">
              Oops! The page you're looking for seems to have wandered off into
              the digital void. Don't worry, it happens to the best of us.
            </p>
          </div>
        </CardContent>
        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
          <Button
            asChild
            size={"lg"}
            className="bg-sky-600 hover:bg-sky-700 text-white !px-7 rounded-full transition-all duration-200 transform hover:scale-105"
          >
            <Link to="/" className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              Go Home
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-sky-600 text-sky-600 hover:bg-sky-50 !px-7 py-3 rounded-full transition-all duration-200 bg-transparent"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </Button>
        </div>
        <Separator className="bg-sky-100" />

        {/* Footer */}
        <CardFooter>
          <div className="w-full flex flex-col items-center justify-center">
            <h4 className="text-slate-500">
              Need help? Here are some suggestions:
            </h4>
            <div className="text-sky-600 mt-2">
              <Link to="/">
                <Button variant="link" className="text-inherit">
                  Home
                </Button>
              </Link>
              <Link to="/">
                <Button variant="link" className="text-inherit">
                  Contact Us
                </Button>
              </Link>
              <Link to="/">
                <Button variant="link" className="text-inherit">
                  Help Center
                </Button>
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
