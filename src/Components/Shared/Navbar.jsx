import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import ThemeToggle from "../../theme/themetogol";
import useAuth from "../../Hook/useAuth";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const { user, logoutuser } = useAuth();
  const [open, setOpen] = useState(false);
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/Clubs">Clubs</NavLink>
      </li>
      <li>
        <NavLink to="/Events">Events</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-300 fixed shadow-sm -my-[15px]">
      <div className="navbar max-w-10/12 mx-auto  ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to="/">
            <div>
              <img src={logo} alt="Logo" className="w-10 h-10 rounded-full cursor-pointer" />
            </div>
          </Link>

          <Link to='/'>
            <h1 className="btn btn-ghost text-[15px] lg:text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">ClubSphere</h1>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        <div className="navbar-end">
            <ThemeToggle className="w-2 h-2" />
          

          {user ? (
            <div className="relative ">
              <div className="flex items-center gap-5">

                {/* Avatar Button */}
                <button
                  className="avatar rounded-full border overflow-hidden"
                  onClick={() => setOpen(!open)}
                  title={user?.displayName}
                >
                  <img
                    className="w-9 h-9 rounded-full object-cover"
                    src={user?.photoURL}
                    alt="User Avatar"
                  />
                </button>
              </div>

              {/* Dropdown */}
              {open && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-4 z-50
                 text-gray-700 text-sm animate-fadeIn"
                >
                  <p className="font-semibold">{user?.displayName}</p>
                  <p className="text-gray-500 text-xs mt-1">{user?.email}</p>

                  {/* Mobile logout button (inside dropdown) */}

                  <Link to="/deshboard">
                    <button className="btn bg-[#0092b8] text-white rounded-xl w-full my-2">
                      Dashboard
                    </button>
                  </Link>
                  <button
                    onClick={() => logoutuser()}
                    className="btn bg-[#0092b8] text-white rounded-xl w-full my-2 "
                  >
                    LogOut
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn bg-[#0092b8] text-white ml-2">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
