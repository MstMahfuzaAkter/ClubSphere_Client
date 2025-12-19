import React from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loadingspinner from "../../../Components/Shared/Loadingspinner";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { FiUsers, FiUserCheck, FiUserX, FiMail, FiCalendar, FiClock } from "react-icons/fi";
import { motion } from "framer-motion";

const ClubMembersPanel = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: memberships = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["clubmembers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/membership");
      return res.data;
    },
  });

  const handleExpire = async (id) => {
    try {
      const res = await axiosSecure.patch(`/membership/${id}/expire`);
      if (res.data.modifiedCount > 0) {
        toast.success("Membership status updated to Expired");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (isLoading) return <Loadingspinner />;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className=" pb-10"
    >
      {/* --- Header --- */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
            Member Directory
          </h2>
          <p className="text-sm text-slate-400 font-medium mt-1">Manage club access and membership lifecycles</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl shadow-sm border border-slate-100">
           <FiUsers className="text-[#007a99]" />
           <span className="text-xs font-black text-slate-600 uppercase tracking-widest">
             {memberships.length} Total Members
           </span>
        </div>
      </div>

      {/* --- Table Card --- */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-separate border-spacing-y-0">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400">
                <th className="py-6 pl-8 text-[10px] font-black uppercase tracking-[0.2em]">#</th>
                <th className="py-6 text-[10px] font-black uppercase tracking-[0.2em]">Member Info</th>
                <th className="py-6 text-[10px] font-black uppercase tracking-[0.2em]">Status</th>
                <th className="py-6 text-[10px] font-black uppercase tracking-[0.2em]">Join Date</th>
                <th className="py-6 pr-8 text-[10px] font-black uppercase tracking-[0.2em] text-right">Access Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {memberships.map((m, idx) => (
                <tr key={m._id} className="hover:bg-slate-50/20 transition-colors group">
                  <td className="pl-8 py-5">
                    <span className="text-xs font-bold text-slate-300">{idx + 1}</span>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#007a99]/10 group-hover:text-[#007a99] transition-all duration-300">
                        <FiMail size={16} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-700 tracking-tight">{m.userEmail.split('@')[0]}</span>
                        <span className="text-[10px] font-medium text-slate-400 lowercase">{m.userEmail}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border ${
                      m.status === "active" 
                      ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                      : "bg-amber-50 text-amber-600 border-amber-100"
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${m.status === "active" ? "bg-emerald-500" : "bg-amber-500"}`}></div>
                      <span className="text-[10px] font-black uppercase tracking-widest">{m.status}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col text-slate-500">
                      <span className="text-xs font-bold flex items-center gap-1">
                        <FiCalendar size={12} className="text-slate-300" />
                        {dayjs(m.createdAt).format("DD MMM, YYYY")}
                      </span>
                      <span className="text-[10px] font-medium flex items-center gap-1">
                         <FiClock size={10} className="text-slate-200" />
                         {dayjs(m.createdAt).format("hh:mm A")}
                      </span>
                    </div>
                  </td>
                  <td className="pr-8 text-right">
                    {m.status === "active" ? (
                      <button
                        onClick={() => handleExpire(m._id)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all shadow-sm active:scale-95 border border-rose-100"
                      >
                        <FiUserX size={14} /> Set Expired
                      </button>
                    ) : (
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-400 rounded-xl font-bold text-[10px] uppercase tracking-widest cursor-not-allowed">
                        <FiUserCheck size={14} /> Already Expired
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {memberships.length === 0 && (
          <div className="p-20 text-center">
            <FiUsers className="mx-auto text-slate-200 mb-4" size={48} />
            <p className="text-slate-400 font-medium tracking-tight">No members found in this club.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ClubMembersPanel;