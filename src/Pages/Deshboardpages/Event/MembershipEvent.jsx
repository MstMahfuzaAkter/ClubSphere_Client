import React from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loadingspinner from "../../../Components/Shared/Loadingspinner";
import { motion } from "framer-motion";
import { FiActivity, FiCalendar, FiMap, FiAward, FiInbox } from "react-icons/fi";
import dayjs from "dayjs";

const MembershipEvent = () => {
  const axiosSecure = useAxiosSecure();

  const { data: eventmembers = [], isLoading } = useQuery({
    queryKey: ["eventmembers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/membersevent");
      return res.data;
    },
  });

  if (isLoading) return <Loadingspinner />;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className=" pb-10"
    >
      {/* --- Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Event Activity</h2>
          <p className="text-sm text-slate-400 font-medium mt-1">History of all events you have participated in</p>
        </div>
        <div className="bg-indigo-50 text-indigo-600 px-5 py-2.5 rounded-2xl flex items-center gap-3 border border-indigo-100 shadow-sm">
           <FiActivity className="animate-pulse" />
           <span className="text-xs font-black uppercase tracking-widest">{eventmembers.length} Events Logged</span>
        </div>
      </div>

      {/* --- Content --- */}
      {eventmembers.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] p-20 text-center border border-slate-100 shadow-sm">
           <FiInbox size={48} className="mx-auto text-slate-200 mb-4" />
           <h3 className="text-lg font-bold text-slate-400 tracking-tight">No activity recorded yet.</h3>
           <p className="text-xs text-slate-300 mt-1 uppercase tracking-tighter font-black">Join an event to see your logs!</p>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full border-separate border-spacing-y-0">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400">
                  <th className="py-6 pl-8 text-[10px] font-black uppercase tracking-widest">#</th>
                  <th className="py-6 text-[10px] font-black uppercase tracking-widest">Event Details</th>
                  <th className="py-6 text-[10px] font-black uppercase tracking-widest text-center">Participation Date</th>
                  <th className="py-6 pr-8 text-[10px] font-black uppercase tracking-widest text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {eventmembers.map((event, index) => (
                  <tr key={event._id || index} className="hover:bg-slate-50/30 transition-colors group">
                    <td className="pl-8 py-6">
                      <span className="text-xs font-bold text-slate-300">{(index + 1).toString().padStart(2, '0')}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#007a99]/10 group-hover:text-[#007a99] transition-all duration-300">
                           <FiAward size={18} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-700 tracking-tight">{event.eventtitle || "N/A"}</span>
                          <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-tighter">
                            <FiMap size={10} /> {event.clubname || "N/A"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="inline-flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                        <FiCalendar size={12} className="text-[#007a99]" />
                        <span className="text-[11px] font-black text-slate-600">
                          {event.eventDate ? dayjs(event.eventDate).format("DD MMM YYYY") : "TBA"}
                        </span>
                      </div>
                    </td>
                    <td className="pr-8 text-right">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        event.status === "confirmed" || event.status === "active" || event.status === "completed"
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                        : "bg-amber-50 text-amber-600 border-amber-100"
                      }`}>
                        {event.status || "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MembershipEvent;