import { useState, useRef } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/features/auth/authSlice";
import { useQuery } from "@tanstack/react-query";
import { fetchPopularCategories } from "@/features/admin/categories/categoryApi";
import { JobDropdown } from "./JobDropdown";

// Dropdown Component (desktop + mobile shared)

const Header = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fetch categories
  const { data: popularCategories = [] } = useQuery({
    queryKey: ["PopularCategories"],
    queryFn: fetchPopularCategories,
  });

  const jobCategories = popularCategories.map((cat) => ({
    name: cat.name,
    href: `/jobs?PopularCategories=${encodeURIComponent(cat.name)}`,
  }));

  const staticLinks = [
    { to: "/companies", label: "Companies" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-lg">
      <div className="custom-container max-w-7xl mx-auto flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-sky-600 hover:text-sky-600 transition-colors"
        >
          iLink
        </Link>

        {/* Desktop Navigation */}

        <nav className="hidden md:flex space-x-8 ml-10">
          <JobDropdown categories={jobCategories} />

          {staticLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="px-3 py-2 text-gray-700 hover:text-sky-600 font-medium"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="#about"
            className="px-3 py-2 text-gray-700 hover:text-sky-600 font-medium"
          >
            About
          </a>
        </nav>

        {/* Auth Buttons */}
        {!isAuthenticated && (
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/auth/login"
              className="text-gray-700 hover:text-sky-600 hover:bg-sky-100 py-2 px-6 rounded-md"
            >
              Log in
            </Link>
            <Link
              to="/auth/register"
              className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-md"
            >
              Register
            </Link>
          </div>
        )}

        {/* Mobile Menu Button */}
        <div className="md:hidden">
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
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b px-4 py-3 space-y-2">
          <>
            <JobDropdown categories={jobCategories} isMobile={true} />
            {staticLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block py-2 text-gray-700 hover:text-sky-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/auth/login"
              className="block py-2 text-gray-700 hover:text-sky-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Log in
            </Link>
            <Link
              to="/auth/register"
              className="block py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-md text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Register
            </Link>
          </>
        </div>
      )}
    </header>
  );
};

export default Header;
