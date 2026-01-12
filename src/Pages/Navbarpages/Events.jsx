import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FiMapPin, FiSearch, FiCalendar, FiArrowRight, FiUser, FiFilter, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router";
import Loadingspinner from "../../Components/Shared/Loadingspinner";
import { motion, AnimatePresence } from "framer-motion";

const Events = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All"); // All, Free, Paid

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

  // Filtering Logic
  const filteredEvents = events.filter(event => {
    if (filter === "Free") return !event.isPaid;
    if (filter === "Paid") return event.isPaid;
    return true;
  });

  if (isLoading) return <Loadingspinner />;

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] text-slate-900">
      
      {/* 1. LEFT SIDEBAR (Consistent with Clubs Style) */}
      <aside className="w-72 border-r border-slate-200 hidden lg:block sticky top-0 h-screen bg-white pt-24 px-6">
        <div className="flex items-center gap-2 mb-8 px-2">
          <FiFilter className="text-[#007a99]" />
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">Filter Events</h3>
        </div>
        
        <nav className="space-y-1">
          {["All", "Free", "Paid"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between ${filter === type ? "bg-[#007a99]/10 text-[#007a99]" : "text-slate-600 hover:bg-slate-50"}`}
            >
              {type} Events {filter === type && <FiChevronRight />}
            </button>
          ))}
        </nav>

        <div className="mt-12 p-6 bg-slate-900 rounded-[2rem] text-white relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-2">Host an Event?</p>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">Organize your workshops or seminars with ease.</p>
            <button className="text-[10px] font-bold py-2 px-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all">Request Access</button>
          </div>
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-cyan-500/10 rounded-full blur-2xl"></div>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1">
        {/* REFINED HEADER */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 pt-20 pb-6 px-8">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 justify-between items-center">
            <div className="w-full lg:max-w-xl relative group">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#007a99]" />
              <input
                type="text"
                placeholder="Search by event title, location..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full bg-slate-100 border border-transparent h-12 pl-12 pr-4 rounded-xl focus:bg-white focus:border-[#007a99]/30 focus:ring-4 focus:ring-[#007a99]/5 transition-all outline-none text-sm font-medium"
              />
            </div>
            
            <div className="flex items-center gap-4">
               <div className="px-4 py-2 bg-slate-100 rounded-lg text-[10px] font-black text-slate-500 uppercase">
                 {filteredEvents.length} Events Found
               </div>
            </div>
          </div>
        </header>

        {/* CONTENT GRID */}
        <section className="p-8 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="popLayout">
            {filteredEvents.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-32 text-slate-300"
              >
                <FiCalendar size={64} strokeWidth={1} className="mb-4" />
                <h3 className="text-lg font-bold text-slate-400">No Events Scheduled</h3>
                <p className="text-sm">Try different keywords or check back later.</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredEvents.map((event) => (
                  <motion.div
                    key={event._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5 }}
                    className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-400 group flex flex-col h-full"
                  >
                    {/* Event Date Badge (Visual) */}
                    <div className="p-8 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-3">
                           <div className="w-12 h-12 bg-[#007a99]/10 rounded-2xl flex flex-col items-center justify-center text-[#007a99]">
                              <span className="text-xs font-black uppercase">
                                {new Date(event.eventDate).toLocaleDateString('en-US', { month: 'short' })}
                              </span>
                              <span className="text-sm font-black -mt-1">
                                {new Date(event.eventDate).toLocaleDateString('en-US', { day: '2-digit' })}
                              </span>
                           </div>
                           <div className="space-y-0.5">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Entry Fee</p>
                              <p className={`text-xs font-bold ${event.isPaid ? 'text-orange-600' : 'text-green-600'}`}>
                                {event.isPaid ? `$${event.eventFee}` : "Complimentary"}
                              </p>
                           </div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:text-[#007a99] transition-colors">
                           <FiArrowRight />
                        </div>
                      </div>

                      <h2 className="text-xl font-bold text-slate-900 group-hover:text-[#007a99] transition-colors mb-3 line-clamp-2 leading-tight">
                        {event.title}
                      </h2>

                      <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3">
                        {event.description}
                      </p>

                      <div className="mt-auto space-y-4 pt-6 border-t border-slate-50">
                        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-tight">
                          <div className="flex items-center gap-2 text-slate-400">
                            <FiMapPin className="text-[#007a99]" /> {event.location}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
                          <FiUser className="text-[#007a99]" /> 
                          By <span className="text-slate-700">{event.createdBy}</span>
                        </div>

                        <button
                          onClick={() => navigate(`/events/${event._id}`)}
                          className="w-full py-4 bg-[#007a99] text-white rounded-xl text-[11px] font-black uppercase tracking-widest transition-all shadow-sm flex items-center justify-center gap-2"
                        >
                          Discover More <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
};

export default Events;