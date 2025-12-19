import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck, FaTimes, FaChartBar, FaEnvelope, FaMoneyBillWave } from "react-icons/fa";
import Loadingspinner from "../../Components/Shared/Loadingspinner";

const ManageClub = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedClub, setSelectedClub] = useState(null);
  const [clubStats, setClubStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(false);

  const { data: clubs = [], isPending, refetch } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/clubs");
      return res.data;
    },
  });

  const updateClubStatus = async (club, status) => {
    try {
      const res = await axiosSecure.patch(`/clubs/${club._id}/status`, { status });
      if (res.data.modifiedCount) {
        toast.success(`Club ${status === 'aproved' ? 'approved' : 'rejected'} successfully!`);
        refetch();
      }
    } catch (error) {
      toast.error(`Failed to ${status} club`);
    }
  };

  const handleviewstat = async (club) => {
    try {
      setSelectedClub(club);
      setLoadingStats(true);
      document.getElementById("club_stats_modal").showModal();
      const res = await axiosSecure.get(`/clubss/${club._id}/stats`);
      setClubStats(res.data);
    } catch (error) {
      toast.error("Failed to load club stats");
    } finally {
      setLoadingStats(false);
    }
  };

  if (isPending) return <Loadingspinner />;

  return (
    <div className="">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Manage Clubs</h1>
          <p className="text-sm text-slate-400 font-medium">Review, approve, and track club performances</p>
        </div>
        <div className="px-5 py-2 bg-[#007a99]/10 text-[#007a99] rounded-2xl text-xs font-black uppercase tracking-widest border border-[#007a99]/20">
          Total: {clubs.length} Clubs
        </div>
      </div>

      {/* Table Area */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-separate border-spacing-y-0">
            <thead className="bg-slate-50/50">
              <tr className="text-slate-400">
                <th className="py-5 pl-8 text-[10px] font-black uppercase tracking-widest">No.</th>
                <th className="py-5 text-[10px] font-black uppercase tracking-widest">Club Details</th>
                <th className="py-5 text-[10px] font-black uppercase tracking-widest">Status</th>
                <th className="py-5 text-[10px] font-black uppercase tracking-widest">Fee</th>
                <th className="py-5 text-[10px] font-black uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {clubs.map((club, index) => (
                <motion.tr 
                  key={club._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="pl-8 font-bold text-slate-400 text-sm">{index + 1}</td>
                  <td className="py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800 text-sm group-hover:text-[#007a99] transition-colors">
                        {club.clubName}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5 font-medium">
                        <FaEnvelope className="text-[10px]" /> {club.managerEmail}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border
                      ${club.status === "aproved" ? "bg-emerald-50 text-emerald-500 border-emerald-100" : 
                        club.status === "rejected" ? "bg-red-50 text-red-500 border-red-100" : 
                        "bg-amber-50 text-amber-500 border-amber-100"}`}>
                      {club.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2 text-slate-600 font-bold text-sm">
                      <FaMoneyBillWave className="text-[#007a99]" />
                      {club.membershipFee ? `$${club.membershipFee}` : "Free"}
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex justify-center gap-2">
                      {club.status === "pending" && (
                        <>
                          <button
                            onClick={() => updateClubStatus(club, "aproved")}
                            className="p-2.5 bg-emerald-50 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                            title="Approve"
                          >
                            <FaCheck size={14} />
                          </button>
                          <button
                            onClick={() => updateClubStatus(club, "rejected")}
                            className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                            title="Reject"
                          >
                            <FaTimes size={14} />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleviewstat(club)}
                        className="p-2.5 bg-blue-50 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all shadow-sm flex items-center gap-2 px-4 text-xs font-black uppercase tracking-widest"
                      >
                        <FaChartBar size={14} /> Stats
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modern Modal */}
      <dialog id="club_stats_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white rounded-[2.5rem] p-8 max-w-md border-none shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl"><FaChartBar size={24} /></div>
            <h3 className="font-black text-2xl text-slate-800 tracking-tight">Club Analytics</h3>
          </div>

          <AnimatePresence>
            {loadingStats ? (
              <div className="flex justify-center py-10"><Loadingspinner /></div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Target Club</p>
                  <p className="text-lg font-black text-slate-800">{selectedClub?.clubName}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 bg-indigo-50/50 rounded-3xl border border-indigo-100">
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Members</p>
                    <p className="text-2xl font-black text-indigo-600">{clubStats?.totalMembers || 0}</p>
                  </div>
                  <div className="p-5 bg-[#007a99]/5 rounded-3xl border border-[#007a99]/10">
                    <p className="text-[10px] font-black text-[#007a99] uppercase tracking-widest mb-1">Events</p>
                    <p className="text-2xl font-black text-[#007a99]">{clubStats?.totalEvents || 0}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="modal-action mt-8">
            <form method="dialog" className="w-full">
              <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-lg hover:bg-slate-800 transition-all">
                Dismiss Analytics
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageClub;