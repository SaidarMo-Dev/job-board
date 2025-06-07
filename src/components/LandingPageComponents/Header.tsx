export function Header() {
  return (
    <div className="custum-container">
      <header className="flex justify-between items-center p-2.5 shadow-lg bg-white sticky top-0 z-1000">
        {/* Logo */}
        <div className="font-bold text-2xl text-sky-500">UpLink</div>

        {/* Navigation */}
        <nav>
          <ul className="flex text-lg">
            <li>
              <a className="nav-ele" href="">
                Find Jobs
              </a>
            </li>
            <li>
              <a className="nav-ele" href="">
                Companies
              </a>
            </li>
            <li>
              <a className="nav-ele" href="">
                Contact
              </a>
            </li>
            <li>
              <a className="nav-ele" href="">
                About
              </a>
            </li>
          </ul>
        </nav>

        {/* Actions */}
        <div>
          <button className="mr-4 pl-5 pr-5 pt-3 pb-3 rounded-md hover:bg-blue-50 hover:text-sky-600 font-medium">
            Log in
          </button>
          <button className="pl-5 pr-5 pt-3 pb-3 rounded-md bg-sky-600 text-white font-medium">
            Register
          </button>
        </div>
      </header>
    </div>
  );
}
