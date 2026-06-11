import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { useQuery } from "@tanstack/react-query";
import { fetchPopularCategories } from "@/features/admin/categories/categoryApi";
import { JobDropdown } from "./JobDropdown";

import logo from "@/assets/ilink-logo.svg";
import { useAppSelector } from "@/hooks/useAppSelector";
import { DashboardButton } from "@/features/dashboard/components/DashboardButton";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentUser = useAppSelector(selectCurrentUser);

  const location = useLocation();
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
    <header className="sticky  w-full top-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-300/30">
      <div className="custom-container max-w-7xl mx-auto flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-sky-600 hover:text-sky-600 transition-colors"
        >
          <img src={logo} alt="logo" width={40} height={40} />
        </Link>

        {/* Desktop Navigation */}

        <nav className="hidden md:flex space-x-8 ml-10">
          <JobDropdown categories={jobCategories} />

          {staticLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="px-3 py-2 text-gray-700 hover:text-primary-hover font-medium"
            >
              {link.label}
            </Link>
          ))}

          {location.pathname === "/" && (
            <a
              href="#about"
              className="px-3 py-2 text-gray-700 hover:text-primary-hover font-medium"
            >
              About
            </a>
          )}
        </nav>

        {/* Auth Buttons */}
        {!currentUser ? (
          <div className="hidden md:flex items-center space-x-2">
            <Link
              to="/auth/login"
              className="text-gray-700 hover:text-primary-hover hover:bg-sky-100 py-2 px-4 rounded-md"
            >
              Login
            </Link>
            <Link
              to="/auth/register"
              className="bg-primary hover:bg-primary-hover hover:-translate-y-0.5 transition-transform duration-200 text-white px-4 py-2 rounded-md"
            >
              Register
            </Link>
          </div>
        ) : (
          <DashboardButton />
        )}

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-gray-700 hover:text-primary-hover p-2"
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
                className="block py-2 text-gray-700 hover:text-primary-hover"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {!currentUser ? (
              <div className="hidden md:flex items-center space-x-2">
                <Link
                  to="/auth/login"
                  className="text-gray-700 hover:text-primary-hover hover:bg-sky-100 py-2 px-4 rounded-md"
                >
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  className="bg-primary hover:bg-primary-hover hover:-translate-y-0.5 transition-transform duration-200 text-white px-4 py-2 rounded-md"
                >
                  Register
                </Link>
              </div>
            ) : (
              <DashboardButton />
            )}
          </>
        </div>
      )}
    </header>
  );
};

export default Header;
