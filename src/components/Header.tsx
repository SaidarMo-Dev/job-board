import { useState, useRef, useEffect } from "react";
import { Bell, ChevronDown, Menu, User, X } from "lucide-react";
import { Link } from "react-router";
import UserMenu from "./UserMenu";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/features/auth/authSlice";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [isUsermenuOpen, setIsUsermenuOpen] = useState(false);
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // TODO: UPDATE THE href
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

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-lg">
      <div className="custom-container">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a
                href="/"
                className="text-2xl font-bold text-sky-600 hover:text-sky-600 transition-colors"
              >
                iLink
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav
              className={`${
                isAuthenticated === false ? "hidden" : ""
              } md:flex space-x-8`}
            >
              {/* Find Jobs Dropdown */}
              <div className={`relative`} ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center text-gray-700 hover:text-sky-600 px-2 py-2 font-medium transition-colors duration-200 focus:outline-none focus:text-sky-600"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                >
                  Find Jobs
                  <ChevronDown
                    className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
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

              {isAuthenticated === false && (
                <>
                  <a
                    href="/companies"
                    className="block px-3 py-2 text-gray-700 hover:text-sky-600 text-base font-medium transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Companies
                  </a>
                  <a
                    href="/contact"
                    className="block px-3 py-2 text-gray-700 hover:text-sky-600 text-base font-medium transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </a>
                  <a
                    href="/about"
                    className="block px-3 py-2 text-gray-700 hover:text-sky-600 text-base font-medium transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </a>
                </>
              )}
            </nav>

            {/* Desktop Auth Buttons */}
            {isAuthenticated === false ? (
              <div className=" hidden md:flex items-center space-x-4">
                <Link
                  to="/auth/login"
                  className="text-sm md:text-base text-gray-700 hover:text-sky-600  hover:bg-sky-100 font-medium transition-colors duration-200 py-2 px-6 rounded-md"
                >
                  Log in
                </Link>

                <Link
                  to="/auth/register"
                  className=" text-sm md:text-base bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 font-medium rounded-md transition-colors duration-200 inline-block"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-sm hover:bg-gray-100">
                  <Bell className="h-5 w-" />
                </button>
                <Link
                  to={"/members/profile"}
                  className="block p-2 rounded-sm hover:bg-gray-100"
                >
                  <User className="h-5 w-5" />
                </Link>
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
            )}

            {/* Mobile menu button */}
            {isAuthenticated === false && (
              <div className="flex md:hidden">
                <button
                  type="button"
                  className="text-gray-700 hover:text-sky-600 focus:outline-none focus:text-sky-600 p-2"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-expanded={mobileMenuOpen}
                  aria-controls="mobile-menu"
                >
                  <span className="sr-only">
                    {mobileMenuOpen ? "Close menu" : "Open menu"}
                  </span>
                  {mobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isAuthenticated === false && (
          <div
            className={`md:hidden transition-all duration-300 ease-in-out ${
              mobileMenuOpen
                ? "max-h-screen opacity-100"
                : "max-h-0 opacity-0 overflow-hidden"
            }`}
            id="mobile-menu"
            aria-label="Mobile navigation"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-b border-gray-200">
              {/* Mobile Job Categories */}
              <div className="px-3 py-2">
                {/* <div className="font-medium text-gray-900 mb-2">Find Jobs</div> */}
                <button
                  onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                  className="flex items-center text-gray-900 hover:text-sky-600 py-2 font-medium transition-colors duration-200 focus:outline-none focus:text-sky-600"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                >
                  Find Jobs
                  <ChevronDown
                    className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                      mobileDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {mobileDropdownOpen && (
                  <div className="pl-4 space-y-2">
                    {jobCategories.map((category) => (
                      <a
                        key={category.name}
                        href={category.href}
                        className="block text-gray-700 hover:text-sky-600 text-sm transition-colors duration-200 py-1"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {category.name}
                      </a>
                    ))}
                    <a
                      href="/jobs"
                      className="block text-sky-600 font-medium text-sm transition-colors duration-200 py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      View All Jobs
                    </a>
                  </div>
                )}
              </div>

              {/* Other Mobile Nav as */}
              <a
                href="/companies"
                className="block px-3 py-2 text-gray-700 hover:text-sky-600 text-base font-medium transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Companies
              </a>
              <a
                href="/contact"
                className="block px-3 py-2 text-gray-700 hover:text-sky-600 text-base font-medium transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
              <a
                href="/about"
                className="block px-3 py-2 text-gray-700 hover:text-sky-600 text-base font-medium transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>

              {/* Mobile Auth Buttons */}
              <div className="px-3 py-2 space-y-2 mt-5">
                <a
                  href="/auth/login"
                  className="block w-full py-2 rounded-md hover:bg-sky-50 text-center  text-gray-700 hover:text-sky-600 text-base font-medium transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log in
                </a>
                <a
                  href="/auth/register"
                  className="block w-full bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 text-sm font-medium rounded-md transition-colors duration-200 text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
