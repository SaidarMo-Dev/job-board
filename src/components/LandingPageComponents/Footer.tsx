import LinkedinIcon from "@/shared/components/LinkedinIcon";
import { Mail, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router";

import logo from "@/assets/ilink-logo.svg";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <img src={logo} alt="logo" width={40} height={40} />
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Connect with top employers and find your dream job. We help
              professionals advance their careers and companies find exceptional
              talent.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/mohammed-saidar-1b3477363"
                target="_blank"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              >
                <LinkedinIcon />
              </a>
            </div>
          </div>

          {/* Job Seekers */}
          <div>
            <h3 className="text-lg font-semibold mb-4">For Job Seekers</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/jobs"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/companies"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  Companies
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-gray-700 dark:text-gray-200">
              Contact
            </h4>
            <div className="space-y-3">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Mail className="h-4 w-4 mr-3 text-blue-500" />
                <span>mohammed.saidar.eco@gmail.com</span>
              </div>

              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <MapPin className="h-4 w-4 mr-3 text-blue-500" />
                <span>Morocco, El Jadida</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Footer */}
      <div className="flex items-center justify-center py-5 border-t border-gray-200 dark:border-gray-800 pt-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} iLink. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
