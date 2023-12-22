import { NavLink } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";
import { BsCart3, BsMoonFill, BsSunFill } from "react-icons/bs";

import NavLinks from "./NavLinks"; // Correct import statement
import { useEffect, useState } from "react";

const themes = {
  forest: "forest",
  dracula: "dracula",
};

const getThemeFromLocalStorage = () => {
  return localStorage.getItem("theme") || themes.forest;
};

const Navbar = () => {
  const [theme, setTheme] = useState(getThemeFromLocalStorage());
  const handleTheme = () => {
    // destructuring the themes.
    const { forest, dracula } = themes;
    const newTheme = theme === forest ? dracula : forest;
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <nav className="bg-base-200">
      <div className="navbar align-navbar">
        <div className="navbar-start">
          <NavLink className="hidden lg:flex text-3xl items-center btn btn-primary">
            TL
          </NavLink>
          {/* SMALL SCREEN NAV-LINKS */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBarsStaggered className="h-6 w-6"></FaBarsStaggered>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-2 z-[1] p-2 shadow bg-base-300 rounded-box w-56"
            >
              <NavLinks></NavLinks>
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex ">
          <ul className="menu menu-horizontal">
            <NavLinks></NavLinks>
          </ul>
        </div>
        <div className="navbar-end">
          <label className="swap swap-rotate">
            <input type="checkbox" onChange={handleTheme}></input>
            <BsSunFill className="swap-on h-4 w-4"></BsSunFill>
            <BsMoonFill className="swap-off h-4 w-4"></BsMoonFill>
          </label>

          <NavLink to="/cart" className="btn btn-ghost btn-circle btn-md ml-4">
            <div className="indicator">
              <BsCart3 className="h-6 w-6"></BsCart3>
              <span className="badge badge-sm badge-primary indicator-item">
                4
              </span>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
