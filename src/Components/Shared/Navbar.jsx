import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../Hook/useAuth";
import logo from "../../assets/logo.jfif";

const Navbar = () => {
  const { user, logoutuser } = useAuth();
  const [open, setOpen] = useState(false);

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => isActive ? "text-[#0092b8] font-bold" : "hover:text-[#0092b8]"}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/Clubs"
          className={({ isActive }) => isActive ? "text-[#0092b8] font-bold" : "hover:text-[#0092b8]"}
        >
          Clubs
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/Events"
          className={({ isActive }) => isActive ? "text-[#0092b8] font-bold" : "hover:text-[#0092b8]"}
        >
          Events
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => isActive ? "text-[#0092b8] font-bold" : "hover:text-[#0092b8]"}
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => isActive ? "text-[#0092b8] font-bold" : "hover:text-[#0092b8]"}
            >
              Contact
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-gradient-to-br from-[#e0f7ff] to-[#fff4e6] backdrop-blur-md fixed top-0 w-full z-[100] shadow-sm transition-all duration-300">
      <div className="navbar max-w-7xl mx-auto w-full">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#007a99]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-2xl border border-slate-100">
              {links}
            </ul>
          </div>

          <Link to="/" className="flex items-center gap-2 group">
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-full cursor-pointer border-2 border-transparent group-hover:border-[#0092b8] transition-all" />
            <h1 className="text-xl lg:text-2xl font-black bg-gradient-to-r from-[#0092b8] to-[#007a99] bg-clip-text text-transparent tracking-tight">
              ClubConnect
            </h1>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-[16px] font-medium gap-2">
            {links}
          </ul>
        </div>

        <div className="navbar-end gap-3">
          {user ? (
            <div className="relative">
              <button
                className="avatar rounded-full border-2 border-[#0092b8]/20 hover:border-[#0092b8] transition-all overflow-hidden p-0.5"
                onClick={() => setOpen(!open)}
              >
                <img
                  className="w-9 h-9 rounded-full object-cover"
                  src={user?.photoURL || "https://via.placeholder.com/150"}
                  alt="User Avatar"
                />
              </button>

              {open && (
                <div
                  className="absolute right-0 mt-3 w-56 bg-white shadow-2xl rounded-2xl p-4 z-[100] border border-slate-100 animate-in fade-in zoom-in duration-200"
                  onMouseLeave={() => setOpen(false)}
                >
                  <div className="pb-3 border-b border-slate-100 mb-3">
                    <p className="font-bold text-slate-800 truncate">{user?.displayName}</p>
                    <p className="text-slate-500 text-xs truncate">{user?.email}</p>
                  </div>

                  <Link to="/deshboard" onClick={() => setOpen(false)}>
                    <button className="btn btn-sm h-10 bg-[#0092b8] hover:bg-[#007a99] border-none text-white rounded-xl w-full mb-2 shadow-md transition-all">
                      Dashboard
                    </button>
                  </Link>
                  <button
                    onClick={() => {
                      logoutuser();
                      setOpen(false);
                    }}
                    className="btn btn-sm h-10 bg-slate-100 hover:bg-red-50 hover:text-red-600 border-none text-slate-600 rounded-xl w-full transition-all"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className="btn bg-[#0092b8] hover:bg-[#007a99] border-none text-white px-6 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;