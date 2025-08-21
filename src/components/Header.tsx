import { useState, useRef, useEffect } from "react";
import { Bell, ChevronDown, Menu, User, X } from "lucide-react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/features/auth/authSlice";
import { useQuery } from "@tanstack/react-query";
import { fetchPopularCategories } from "@/features/admin/categories/categoryApi";
import UserMenu from "./UserMenu";

// ✅ Custom hook for outside click
function useOutsideClick(
  ref: React.RefObject<HTMLElement | null>,
  onClose: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, onClose]);
}

const Header = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // ✅ Menu states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  // ✅ Refs for outside click
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(dropdownRef, () => setDropdownOpen(false));
  useOutsideClick(userMenuRef, () => setOpenUserMenu(false));
  // ✅ Fetch categories
  const {
    data: popularCategories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["PopularCategories"],
    queryFn: fetchPopularCategories,
  });

  const jobCategories =
    popularCategories?.map((cat) => ({
      name: cat.name,
      href: `/jobs?PopularCategories=${encodeURIComponent(cat.name)}`,
    })) ?? [];


  // ✅ Static links
  const staticLinks = [
    { to: "/companies", label: "Companies" },
    { to: "/contact", label: "Contact" },
    { to: "/about", label: "About" },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-lg">
      <div className="custom-container max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-sky-600 hover:text-sky-600 transition-colors"
          >
            iLink
          </Link>

          {/* Desktop Navigation */}
          <nav
            className={`${!isAuthenticated ? "hidden" : ""} md:flex space-x-8 ${
              isAuthenticated ? "mr-auto ml-10" : ""
            } `}
          >
            {/* Find Jobs Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center text-gray-700 hover:text-sky-600 px-2 py-2 font-medium transition-colors"
              >
                Find Jobs
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                  {isLoading && (
                    <div className="px-4 py-2 text-gray-400">Loading...</div>
                  )}
                  {isError && (
                    <div className="px-4 py-2 text-red-500">
                      Failed to load categories
                    </div>
                  )}
                  {jobCategories.map((category) => (
                    <Link
                      key={category.name}
                      to={category.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-sky-600"
                      onClick={() => setDropdownOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <Link
                      to="/jobs"
                      className="block px-4 py-2 font-medium text-sky-600 hover:bg-blue-50"
                      onClick={() => setDropdownOpen(false)}
                    >
                      View All Jobs
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Other Links (desktop) */}
            {!isAuthenticated &&
              staticLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="px-3 py-2 text-gray-700 hover:text-sky-600 font-medium"
                >
                  {link.label}
                </Link>
              ))}
          </nav>

          {/* Auth Buttons / User Menu */}
          {!isAuthenticated ? (
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/auth/login"
                className="text-gray-700 hover:text-sky-600 hover:bg-sky-100 font-medium transition-colors py-2 px-6 rounded-md"
              >
                Log in
              </Link>
              <Link
                to="/auth/register"
                className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 font-medium rounded-md"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-sm hover:bg-gray-100">
                <Bell className="h-5 w-5" /> {/* ✅ fixed bug */}
              </button>
              <Link
                to="/members/profile"
                className="p-2 rounded-sm hover:bg-gray-100"
              >
                <User className="h-5 w-5" />
              </Link>
              <div ref={userMenuRef}>
                <button
                  className="p-2 rounded-sm hover:bg-gray-100"
                  onClick={() => setOpenUserMenu(!openUserMenu)}
                >
                  <Menu className="h-5 w-5" />
                </button>
                {openUserMenu && <UserMenu />}
              </div>
            </div>
          )}

          {/* Mobile Menu Button */}
          {!isAuthenticated && (
            <div className="flex md:hidden">
              <button
                className="text-gray-700 hover:text-sky-600 p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
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

      {/* Mobile Menu */}
      {!isAuthenticated && (
        <div
          className={`md:hidden transition-all duration-300 ${
            mobileMenuOpen
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-b">
            {/* Find Jobs (mobile) */}
            <div className="px-3 py-2">
              <button
                onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                className="flex items-center text-gray-900 hover:text-sky-600 font-medium"
              >
                Find Jobs
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform ${
                    mobileDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileDropdownOpen && (
                <div className="pl-4 space-y-2">
                  {jobCategories.map((category) => (
                    <Link
                      key={category.name}
                      to={category.href}
                      className="block text-gray-700 hover:text-sky-600 text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                  <Link
                    to="/jobs"
                    className="block text-sky-600 font-medium text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    View All Jobs
                  </Link>
                </div>
              )}
            </div>

            {/* Static Links (mobile) */}
            {staticLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block px-3 py-2 text-gray-700 hover:text-sky-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Auth Buttons (mobile) */}
            <div className="px-3 py-2 space-y-2 mt-5">
              <Link
                to="/auth/login"
                className="block w-full py-2 rounded-md hover:bg-sky-50 text-center text-gray-700 hover:text-sky-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log in
              </Link>
              <Link
                to="/auth/register"
                className="block w-full bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-md text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
