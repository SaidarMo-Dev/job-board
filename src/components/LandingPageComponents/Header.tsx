import { Menu } from "lucide-react";
import { useState, useEffect } from "react";

export function Header() {
  const [openMenu, setOpenMenu] = useState(false);

  function handleMenuClick() {
    setOpenMenu(!openMenu);
  }

  // Inside your component
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleChange = () => {
      if (mediaQuery.matches) {
        setOpenMenu(false);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <header className="p-2.5 shadow-lg bg-white sticky top-0 z-1000">
      <div className="custum-container">
        <div className="relative flex justify-between items-center">
          {/* Logo */}
          <div className="font-bold text-2xl text-sky-500">UpLink</div>

          <div onClick={handleMenuClick}>
            <Menu className="md:hidden" />
          </div>
          {/* Navigation */}
          <nav
            className={`${
              openMenu ? "block" : "hidden"
            } md:block absolute md:static right-0 top-full shadow-md md:shadow-none bg-white w-full md:w-auto p-5 md:p-0`}
          >
            <ul className="flex flex-col md:flex-row text-lg">
              <li>
                <a className="nav-ele block" href="">
                  Find Jobs
                </a>
              </li>
              <li>
                <a className="nav-ele block" href="">
                  Companies
                </a>
              </li>
              <li>
                <a className="nav-ele block" href="">
                  Contact
                </a>
              </li>
              <li>
                <a className="nav-ele block" href="">
                  About
                </a>
              </li>

              {openMenu && (
                <>
                  <li>
                    <button className="nav-ele">Log in</button>
                  </li>
                  <li>
                    <button className="nav-ele">Register</button>
                  </li>
                </>
              )}
            </ul>
          </nav>

          <div className="hidden md:block">
            <button className="mr-4 pl-5 pr-5 pt-3 pb-3 rounded-md hover:bg-blue-50 hover:text-sky-600 font-medium">
              Log in
            </button>
            <button className="pl-5 pr-5 pt-3 pb-3 rounded-md bg-sky-600 text-white font-medium">
              Register
            </button>
          </div>

          {/* Actions */}
        </div>
      </div>
    </header>
  );
}
