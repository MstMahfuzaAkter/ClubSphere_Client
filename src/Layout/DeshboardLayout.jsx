import React from "react";
import { Link, Outlet, useLocation } from "react-router";
import useRole from "../router/useRole";
import { motion } from "framer-motion";
import { IoIosCreate } from "react-icons/io";
import { FaUser, FaHome } from "react-icons/fa";
import {
  MdManageHistory,
  MdCreateNewFolder,
  MdGroups2,
  MdMapsHomeWork,
  MdAttachMoney,
  MdOutlineDashboard,
} from "react-icons/md";
import { BsCollectionFill } from "react-icons/bs";
import { FiCalendar, FiLogOut, FiMenu } from "react-icons/fi";
import { FaRegIdBadge } from "react-icons/fa6";

const DashboardLayout = () => {
  const { role } = useRole();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const MenuItem = ({ to, icon: Icon, children }) => {
    const active = isActive(to);
    return (
      <li className="mb-1">
        <Link
          to={to}
          className={`
            group flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all duration-300
            ${active
              ? "bg-[#007a99] text-white shadow-lg shadow-cyan-900/20 scale-[1.02]"
              : "text-slate-500 hover:bg-slate-50 hover:text-[#007a99]"
            }
          `}
        >
          <Icon className={`w-5 h-5 ${active ? "text-white" : "text-slate-400 group-hover:text-[#007a99]"}`} />
          <span className="truncate tracking-wide text-sm">{children}</span>
          {active && (
            <motion.div
              layoutId="activeSide"
              className="ml-auto w-1.5 h-5 bg-cyan-300 rounded-full"
            />
          )}
        </Link>
      </li>
    );
  };

  return (
    <div className="drawer lg:drawer-open  bg-[#f8fbff]">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <nav className="navbar bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 sticky top-0 z-30">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-4" className="btn btn-ghost text-slate-600">
              <FiMenu size={24} />
            </label>
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-black tracking-tight text-slate-800 ml-2 lg:hidden">
              Club<span className="text-[#007a99]">Sphere</span>
            </h1>
            <div className="hidden lg:block">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Dashboard / {role}</span>
            </div>
          </div>

          <div className="flex-none gap-4">
            <Link to="/" className="btn btn-ghost btn-circle text-slate-500 hover:text-[#007a99]">
              <FaHome size={20} />
            </Link>
          </div>
        </nav>

        {/* Page Content */}
        <main className="p-4 md:p-8 lg:p-10">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
      <div className="drawer-side z-40">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <aside className="w-72 bg-white border-r border-slate-100 flex flex-col h-full">
          <div className="p-8">
            <h1 className="text-2xl font-black tracking-tighter text-slate-800">
              Club<span className="text-[#007a99]">Sphere</span>
            </h1>
          </div>
          <div className="px-6 mb-6">
            <Link
              to="/deshboard/profile"
              className="flex items-center gap-3 p-3 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-[#007a99]/30 transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-[#007a99] flex items-center justify-center text-white shadow-lg">
                <FaUser size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black text-slate-800 tracking-tight leading-none">Account Settings</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">View Profile</span>
              </div>
            </Link>
          </div>
          <ul className="flex-1 px-4 overflow-y-auto custom-scrollbar">
            {role === "manager" && (
              <>
                <li className="px-4 mt-6 mb-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Manager Tools</li>
                <MenuItem to="/deshboard" icon={MdOutlineDashboard}>Overview</MenuItem>
                <MenuItem to="/deshboard/manager/create-club" icon={IoIosCreate}>Create Club</MenuItem>
                <MenuItem to="/deshboard/manager/create-event" icon={MdCreateNewFolder}>Create Event</MenuItem>
                <MenuItem to="/deshboard/manager/my-clubs" icon={BsCollectionFill}>My Clubs</MenuItem>
                <MenuItem to="/deshboard/manager/ClubMembersPanel" icon={MdGroups2}>Club Members</MenuItem>
                <MenuItem to="/deshboard/manager/event-mangemnet" icon={FiCalendar}>Event Management</MenuItem>
                <MenuItem to="/deshboard/manager/event-registrations" icon={FaRegIdBadge}>Registrations</MenuItem>
              </>
            )}
            {role === "admin" && (
              <>
                <li className="px-4 mt-6 mb-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Admin Controls</li>
                <MenuItem to="/deshboard" icon={MdOutlineDashboard}>Analytics</MenuItem>
                <MenuItem to="/deshboard/admin/manageuser" icon={FaUser}>User Control</MenuItem>
                <MenuItem to="/deshboard/admin/manageclub" icon={MdManageHistory}>Club Requests</MenuItem>
                <MenuItem to="/deshboard/admin/Transactions" icon={MdAttachMoney}>Revenue</MenuItem>
              </>
            )}
            {role === "member" && (
              <>
                <li className="px-4 mt-6 mb-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Member Space</li>
                <MenuItem to="/deshboard" icon={MdOutlineDashboard}>Overview</MenuItem>
                <MenuItem to="/deshboard/member/my-club" icon={BsCollectionFill}>Joined Clubs</MenuItem>
                <MenuItem to="/deshboard/member/my-events" icon={FiCalendar}>Registered Events</MenuItem>
                <MenuItem to="/deshboard/member/transaction" icon={MdAttachMoney}>Payments</MenuItem>
              </>
            )}
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;