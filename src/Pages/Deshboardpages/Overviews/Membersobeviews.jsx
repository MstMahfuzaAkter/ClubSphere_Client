import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { motion } from "framer-motion";
import { FaUsers, FaCalendarAlt, FaRocket, FaMapMarkerAlt, FaTicketAlt } from "react-icons/fa";
import Loadingspinner from "../../../Components/Shared/Loadingspinner";
import dayjs from "dayjs";
const MemberStatCard = ({ title, value, icon: Icon, iconColor, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="bg-white rounded-3xl p-6 shadow-sm border border-slate-50 flex items-center gap-5"
  >
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-slate-50 ${iconColor}`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
      <h3 className="text-2xl font-black text-slate-800 tracking-tight">{value}</h3>
    </div>
  </motion.div>
);

const Membersobeviews = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["member-summary"],
    queryFn: async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error("User not logged in");
      const token = await user.getIdToken(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/member/summary`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });

  if (isLoading) return <Loadingspinner />;
  if (isError) return <div className="p-10 text-red-500  font-bold">Error: {error.message}</div>;

  const userName = data?.userEmail.split("@")[0] || "Member";

  return (
    <div className="">
      <div className="mb-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 mb-2"
        >
          <span className="px-3 py-1 bg-[#007a99] text-white text-[10px] font-black uppercase tracking-widest rounded-full">
            Member Portal
          </span>
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight capitalize">
          Welcome back, <span className="text-[#007a99]">{userName}!</span>
        </h1>
        <p className="text-slate-400 font-medium mt-1 text-lg">
          You have <span className="text-slate-700 font-bold">{data?.upcomingEvents?.length || 0}</span> upcoming activities this month.
        </p>
      </div>

      {/*  Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <MemberStatCard
          index={1}
          title="Clubs Joined"
          value={data?.totalClubsJoined || 0}
          icon={FaUsers}
          iconColor="text-[#007a99]"
        />
        <MemberStatCard
          index={2}
          title="Events Registered"
          value={data?.totalEventsRegistered || 0}
          icon={FaCalendarAlt}
          iconColor="text-indigo-600"
        />
      </div>

      {/*  Upcoming Events Section */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-50 overflow-hidden relative">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <FaRocket className="text-orange-400" /> Upcoming Events
          </h2>
          <button className="text-xs font-bold text-[#007a99] hover:underline uppercase tracking-widest">
            View All
          </button>
        </div>

        {data?.upcomingEvents?.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-slate-400 font-medium">No upcoming events found. Why not join a new club?</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {data.upcomingEvents.map((event, i) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col md:flex-row md:items-center justify-between p-5 rounded-3xl bg-slate-50 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all border border-transparent hover:border-slate-100"
              >
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-white flex flex-col items-center justify-center border border-slate-100 shadow-sm">
                    <span className="text-[10px] font-black text-[#007a99] uppercase leading-none">
                      {dayjs(event.eventDate).format("MMM")}
                    </span>
                    <span className="text-xl font-black text-slate-800 mt-1">
                      {dayjs(event.eventDate).format("DD")}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 group-hover:text-[#007a99] transition-colors">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-1">
                      <p className="text-xs font-medium text-slate-400 flex items-center gap-1">
                        <FaMapMarkerAlt size={10} /> {event.location}
                      </p>
                      <span className={`text-[10px] px-2 py-0.5 rounded-md font-black uppercase tracking-tighter ${event.isPaid ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'}`}>
                        {event.isPaid ? "Paid" : "Free Entry"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 md:mt-0 flex items-center gap-3">
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-white text-slate-600 rounded-xl text-xs font-bold border border-slate-200 hover:bg-slate-50 transition-all shadow-sm">
                    <FaTicketAlt /> Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Membersobeviews;