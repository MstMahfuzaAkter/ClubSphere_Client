import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FiMapPin, FiSearch, FiCalendar, FiArrowRight, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router";
import Loadingspinner from "../../Components/Shared/Loadingspinner";
import { motion, AnimatePresence } from "framer-motion";

const Events = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchText);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchText]);

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events", searchQuery],
    queryFn: async () => {
      const endpoint = searchQuery.trim() ? "/event/search" : "/Events";
      const params = searchQuery.trim() ? { params: { search: searchQuery.trim() } } : {};
      const res = await axiosSecure.get(endpoint, params);
      return res.data;
    },
  });

  if (isLoading) return <Loadingspinner />;

  return (
    <div className="min-h-screen bg-[#fcfdff] pb-24 ">
      <div className="bg-[#007a99] pt-28 pb-24 px-6 rounded-b-[3.5rem] md:rounded-b-[5rem] shadow-xl relative overflow-hidden text-center">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-20 -mt-20 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-black/5 rounded-full -mr-20 -mb-20 blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-white">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight"
          >
            Campus <span className="text-cyan-300">Events</span>
          </motion.h1>
          <p className="text-cyan-50/80 max-w-2xl mx-auto text-base md:text-lg font-medium tracking-wide leading-relaxed">
            Discover upcoming workshops, seminars, and fests. Reserve your spot in the most happening campus activities.
          </p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-20">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-3 rounded-2xl md:rounded-full shadow-2xl border border-slate-100 flex items-center gap-3"
        >
          <div className="relative flex-1">
            <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
            <input
              type="text"
              placeholder="Search by event title, location or keywords..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full h-12 md:h-14 pl-14 pr-6 rounded-full bg-slate-50 border-none focus:ring-2 focus:ring-[#007a99] transition-all font-medium placeholder:text-slate-400 text-slate-700"
            />
          </div>
        </motion.div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-20">
        <AnimatePresence mode="popLayout">
          {events.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-200"
            >
              <FiCalendar size={50} className="mx-auto mb-4 text-slate-200" />
              <h3 className="text-xl font-bold text-slate-700">No events found</h3>
              <p className="text-slate-400 font-medium">Try adjusting your search keywords.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <motion.div
                  key={event._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8 }}
                  className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,122,153,0.12)] transition-all duration-500"
                >
                  <div className="p-8 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6 font-semibold">
                      <div className="px-4 py-2 bg-slate-50 rounded-2xl text-[#007a99] text-[10px] uppercase tracking-[0.1em] border border-slate-100">
                        {new Date(event.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <div className={`px-4 py-2 rounded-2xl text-[10px] uppercase tracking-[0.1em] ${event.isPaid ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>
                        {event.isPaid ? `$${event.eventFee}` : "Free Entry"}
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-[#007a99] transition-colors leading-tight line-clamp-2">
                      {event.title}
                    </h2>

                    <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 line-clamp-3">
                      {event.description}
                    </p>

                    <div className="mt-auto pt-6 border-t border-slate-50 space-y-3">
                      <div className="flex items-center gap-3 text-slate-600 font-bold text-[11px] uppercase tracking-wider">
                        <FiMapPin className="text-[#007a99] text-base" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-3 text-slate-400 font-semibold text-[10px] uppercase tracking-widest">
                        <FiUser className="text-[#007a99]" />
                        By: <span className="text-slate-600">{event.createdBy}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate(`/events/${event._id}`)}
                      className="mt-8 w-full py-4 bg-[#007a99] hover:bg-slate-900 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md"
                    >
                      View Details <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Events;