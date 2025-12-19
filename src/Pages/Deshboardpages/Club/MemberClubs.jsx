import React from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loadingspinner from "../../../Components/Shared/Loadingspinner";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiCalendar,
  FiArrowRight,
  FiShield,
  FiClock,
} from "react-icons/fi";
import dayjs from "dayjs";

const MemberClubs = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const getExpiryDate = (dateInput) => {
    if (!dateInput) return "N/A";
    return dayjs(dateInput).add(1, "year").format("DD MMM, YYYY");
  };

  const { data: clubmembers = [], isLoading } = useQuery({
    queryKey: ["clubmembers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/clubmembers");
      return res.data;
    },
  });

  if (isLoading) return <Loadingspinner />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="pb-10"
    >
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">
          Joined Clubs
        </h2>
        <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-widest">
          Manage your active memberships & renewals
        </p>
      </div>

      {/* Empty State */}
      {clubmembers.length === 0 ? (
        <div className="rounded-[2.5rem] p-20 text-center border border-slate-100 shadow-sm bg-white">
          <FiShield size={48} className="mx-auto text-slate-200 mb-4" />
          <p className="text-slate-400 font-medium">
            You haven't joined any clubs yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clubmembers.map((club, index) => (
            <motion.div
              key={club._id || index}
              whileHover={{ y: -6 }}
              className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-cyan-900/5 transition-all duration-300 overflow-hidden group"
            >
              {/* Accent Bar */}
              <div className="h-2 w-full bg-[#007a99]/10 group-hover:bg-[#007a99] transition-colors" />

              <div className="p-8">
                {/* Status */}
                <span
                  className={`inline-block mb-6 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                    club.status === "active"
                      ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                      : "bg-rose-50 text-rose-600 border-rose-100"
                  }`}
                >
                  {club.status}
                </span>

                {/* Club Info */}
                <h3 className="text-xl font-black text-slate-800 mb-2 group-hover:text-[#007a99] transition-colors">
                  {club.clubname}
                </h3>

                <p className="text-xs text-slate-400 font-bold flex items-center gap-1.5 mb-6 uppercase">
                  <FiMapPin className="text-[#007a99]" /> {club.location}
                </p>

                {/* Expiry */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-8">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1 mb-1">
                    <FiClock size={12} /> Membership Ends
                  </span>
                  <div className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <FiCalendar className="text-orange-500" />
                    {getExpiryDate(club.createdAt)}
                  </div>
                </div>

                {/* Button */}
                <button
                  onClick={() => navigate(`/club/${club.clubId}`)}
                  className="w-full py-4 bg-[#007a99] hover:bg-[#005f78] text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-cyan-500/20"
                >
                  View Club Portal <FiArrowRight />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default MemberClubs;
