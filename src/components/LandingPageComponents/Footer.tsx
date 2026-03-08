import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-primary">iLink</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Connect with top employers and find your dream job. We help
              professionals advance their careers and companies find exceptional
              talent.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Job Seekers */}
          <div>
            <h3 className="text-lg font-semibold mb-4">For Job Seekers</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  Browse Jobs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  Companies
                </a>
              </li>
            </ul>
          </div>

          {/* Employers */}
          <div>
            <h3 className="text-lg font-semibold mb-4">For Employers</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  Post a Job
                </a>
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
                <span>saidarmohammedeco@gmail.com</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Phone className="h-4 w-4 mr-3 text-blue-500" />
                <span>+212 656852262</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <MapPin className="h-4 w-4 mr-3 text-blue-500" />
                <span>Morocco, El Jadida</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 dark:text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} iLink. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
