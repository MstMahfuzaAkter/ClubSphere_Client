import React from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loadingspinner from "../../../Components/Shared/Loadingspinner";
import { motion } from "framer-motion";
import { FiUsers, FiMail, FiCheckCircle, FiClock, FiInbox } from "react-icons/fi";
import dayjs from "dayjs";

const EventRegistation = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: eventRegistrations = [],
    isLoading,
  } = useQuery({
    queryKey: ["eventRegistrations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/eventRegistrations");
      return res.data;
    },
  });

  if (isLoading) return <Loadingspinner />;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className=" pb-10 max-w-6xl mx-auto"
    >
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Registration Logs</h2>
          <p className="text-sm text-slate-400 font-medium mt-1">Track users who signed up for your events</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl shadow-sm border border-slate-100">
           <FiUsers className="text-[#007a99]" />
           <span className="text-xs font-black text-slate-600 uppercase tracking-widest">
             {eventRegistrations.length} Total Attendees
           </span>
        </div>
      </div>

      {/* --- Desktop Table --- */}
      <div className="hidden md:block bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <table className="table w-full border-separate border-spacing-y-0">
          <thead>
            <tr className="bg-slate-50/50 text-slate-400">
              <th className="py-6 pl-8 text-[10px] font-black uppercase tracking-[0.2em] text-center">#</th>
              <th className="py-6 text-[10px] font-black uppercase tracking-[0.2em]">Attendee Email</th>
              <th className="py-6 text-[10px] font-black uppercase tracking-[0.2em]">Status</th>
              <th className="py-6 pr-8 text-[10px] font-black uppercase tracking-[0.2em] text-right">Registered Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {eventRegistrations.length > 0 ? (
              eventRegistrations.map((event, index) => (
                <tr key={index} className="hover:bg-slate-50/30 transition-colors group">
                  <td className="pl-8 py-5 text-center font-bold text-slate-300 text-xs">{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#007a99]/10 group-hover:text-[#007a99] transition-all">
                        <FiMail size={16} />
                      </div>
                      <span className="text-sm font-bold text-slate-700 tracking-tight">{event.useremail}</span>
                    </div>
                  </td>
                  <td>
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border ${
                      event.status === "confirmed" || event.status === "active"
                      ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                      : "bg-indigo-50 text-indigo-600 border-indigo-100"
                    }`}>
                      <FiCheckCircle size={10} />
                      <span className="text-[10px] font-black uppercase tracking-widest">{event.status}</span>
                    </div>
                  </td>
                  <td className="pr-8 text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                        <FiClock size={12} className="text-slate-300" />
                        {dayjs(event.regeesteredat).format("DD MMM, YYYY")}
                      </span>
                      <span className="text-[10px] font-medium text-slate-400">
                        {dayjs(event.regeesteredat).format("hh:mm A")}
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-20 text-center">
                   <FiInbox size={40} className="mx-auto text-slate-200 mb-2" />
                   <p className="text-slate-400 font-medium">No registrations yet.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- Mobile Cards --- */}
      <div className="md:hidden space-y-4">
        {eventRegistrations.length > 0 ? (
          eventRegistrations.map((event, index) => (
            <div key={index} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                 <span className="text-4xl font-black text-slate-50 italic">#{index + 1}</span>
              </div>
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#007a99]/10 flex items-center justify-center text-[#007a99]">
                    <FiMail size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">User Email</span>
                    <span className="text-sm font-bold text-slate-700 break-all">{event.useremail}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</span>
                    <span className="text-xs font-bold text-indigo-600 capitalize">{event.status}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Registered At</span>
                    <span className="text-xs font-bold text-slate-600">{dayjs(event.regeesteredat).format("DD/MM/YY")}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-3xl p-10 text-center border border-dashed border-slate-200">
             <p className="text-slate-400 font-medium">No registrations found.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default EventRegistation;