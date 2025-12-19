import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { motion } from "framer-motion";
import { MdCardMembership, MdPendingActions, MdOutlineAnalytics } from "react-icons/md";
import { FcCheckmark, FcCancel } from "react-icons/fc";
import { FaUsers, FaBuilding, FaCalendarAlt, FaDollarSign } from "react-icons/fa";
import Loadingspinner from "../../../Components/Shared/Loadingspinner";
import AdminChart from "./AdminChart";

/* ---------- Optimized Stat Card ---------- */
const StatCard = ({ title, value, icon: Icon, iconColor, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ y: -5 }}
    className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-50 flex items-center gap-5 transition-all"
  >
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-slate-50 ${iconColor} shadow-inner`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</p>
      <h3 className="text-2xl font-black text-slate-800 mt-1 tracking-tight">{value}</h3>
    </div>
  </motion.div>
);

const Adminoverviews = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin-summary"],
    queryFn: async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error("User not logged in");

      const token = await user.getIdToken(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/summary`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
  });

  if (isLoading) return <Loadingspinner />;
  if (isError) return <div className="p-10 text-red-500 ">Error: {error.message}</div>;

  return (
    <div className="">
      {/* Header Section */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">System Overview</h1>
          <p className="text-slate-400 font-medium mt-1">Real-time platform metrics and analytics</p>
        </div>
        <div className="flex items-center gap-2 bg-[#007a99]/10 text-[#007a99] px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
          <div className="w-2 h-2 bg-[#007a99] rounded-full animate-pulse" /> Live System Data
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        <StatCard title="Total Users" value={data?.users || 0} icon={FaUsers} iconColor="text-blue-500" delay={0.1} />
        <StatCard title="Total Clubs" value={data?.clubs?.total || 0} icon={FaBuilding} iconColor="text-purple-500" delay={0.2} />
        <StatCard title="Total Events" value={data?.events || 0} icon={FaCalendarAlt} iconColor="text-indigo-500" delay={0.3} />
        <StatCard title="Revenue" value={`$${data?.revenue || 0}`} icon={FaDollarSign} iconColor="text-emerald-500" delay={0.4} />
        <StatCard title="Memberships" value={data?.memberships || 0} icon={MdCardMembership} iconColor="text-orange-500" delay={0.5} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Chart Card */}
        <div className="lg:col-span-2">
          <AdminChart />
        </div>

        {/* Club Status breakdown Side Card */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl shadow-slate-200"
          >
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-white/10 rounded-lg"><MdOutlineAnalytics size={20} /></div>
                <h3 className="font-black tracking-tight text-lg">Club Health</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3 font-bold text-sm">
                  <FcCheckmark size={24} /> Approved
                </div>
                <span className="text-xl font-black">{data?.clubs?.approved || 0}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3 font-bold text-sm">
                  <MdPendingActions size={24} className="text-amber-400" /> Pending
                </div>
                <span className="text-xl font-black">{data?.clubs?.pending || 0}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3 font-bold text-sm">
                  <FcCancel size={24} /> Rejected
                </div>
                <span className="text-xl font-black">{data?.clubs?.rejected || 0}</span>
              </div>
            </div>
          </motion.div>
          
          {/* Info Tip */}
          <div className="p-6 bg-blue-50 rounded-[2rem] border border-blue-100">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Quick Tip</p>
            <p className="text-sm text-blue-800/70 font-medium leading-relaxed">
              Check the pending clubs section to approve new organizations waiting for validation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adminoverviews;