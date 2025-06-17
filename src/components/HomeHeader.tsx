import { Bell, ChevronUp, Menu, User } from "lucide-react";
import { useState } from "react";
import UserMenu from "./UserMenu";

const jobCategories = [
  { name: "Technology", href: "#" },
  { name: "Healthcare", href: "#" },
  { name: "Finance", href: "#" },
  { name: "Marketing", href: "#" },
  { name: "Sales", href: "#" },
  { name: "Design", href: "#" },
  { name: "Education", href: "#" },
  { name: "Engineering", href: "#" },
];

const HomeHeader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isUsermenuOpen, setIsUsermenuOpen] = useState(false);
  return (
    <header className="shadow-sm bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="custom-container relative">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-sky-600">iLink</h1>
            <nav className="hidden md:flex space-x-6">
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Find Jobs
                  <ChevronUp
                    className={`absolute -right-7 top-0 w-5 h-5 ${
                      dropdownOpen ? "rotate-180" : "rotate-0"
                    } duration-200`}
                  />
                </button>
                {/* Drop down menu  */}
                {dropdownOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                    {jobCategories.map((category) => (
                      <a
                        key={category.name}
                        href={category.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-sky-600 transition-colors duration-200"
                        onClick={() => setDropdownOpen(false)}
                      >
                        {category.name}
                      </a>
                    ))}
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <a
                        href="/jobs"
                        className="text-sm md:text-base block px-4 py-2 font-medium text-sky-600 hover:bg-blue-50 transition-colors duration-200"
                        onClick={() => setDropdownOpen(false)}
                      >
                        View All Jobs
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-sm hover:bg-gray-100">
              <Bell className="h-5 w-" />
            </button>
            <button className="p-2 rounded-sm hover:bg-gray-100">
              <User className="h-5 w-5" />
            </button>
            <div
              className=""
              onClick={() => {
                setIsUsermenuOpen(!isUsermenuOpen);
              }}
            >
              <button className="p-2 rounded-sm hover:bg-gray-100">
                <Menu className="h-5 w-5" />
              </button>
              {isUsermenuOpen && <UserMenu />}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
