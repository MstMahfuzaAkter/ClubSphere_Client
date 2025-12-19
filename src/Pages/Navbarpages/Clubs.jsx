import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FiDollarSign, FiMapPin, FiTag, FiSearch, FiLayers, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router";
import Loadingspinner from "../../Components/Shared/Loadingspinner";
import { motion, AnimatePresence } from "framer-motion";

const Clubs = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortOption, setSortOption] = useState("newest");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  const { data: initialClubs = [], isLoading } = useQuery({
    queryKey: ["clubs", "initial"],
    queryFn: async () => {
      const res = await axiosSecure.get("/clubs/approved");
      return res.data;
    },
  });

  const { data: filteredClubs = [], isFetching } = useQuery({
    queryKey: ["filterclubs", debouncedSearch, category, sortOption],
    queryFn: async () => {
      const res = await axiosSecure.get("/club/search", {
        params: { search: debouncedSearch, category, sort: sortOption },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const clubsToDisplay = filteredClubs.length > 0 ? filteredClubs : initialClubs;

  if (isLoading) return <Loadingspinner />;

  return (
    <div className="min-h-screen bg-[#f8fbff] pb-20 overflow-x-hidden">
      {/* 📱 RESPONSIVE HERO HEADER */}
      <div className="bg-gradient-to-br from-[#007a99] to-[#0092b8] pt-24 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 rounded-b-[2.5rem] md:rounded-b-[4.5rem] shadow-2xl relative overflow-hidden">
        {/* Background shapes hidden on very small screens to save space */}
        <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 md:w-40 md:h-40 bg-black/10 rounded-full -ml-8 -mb-8 blur-2xl"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4 leading-tight"
          >
            Discover Your <span className="text-cyan-200">Universe</span>
          </motion.h1>
          <p className="text-cyan-50 max-w-2xl mx-auto text-base md:text-lg font-medium opacity-90 px-2">
            Explore {clubsToDisplay.length} elite campus communities. Filter, search, and find your next passion project.
          </p>
        </div>
      </div>

      {/* 🔍 RESPONSIVE FLOATING FILTER BAR */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 md:-mt-12 relative z-20">
        <div className="bg-white p-3 md:p-4 rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl border border-white flex flex-col gap-3 lg:flex-row lg:items-center">
          
          {/* Search Field */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0092b8] text-lg" />
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border-none h-12 md:h-14 pl-12 pr-4 rounded-full focus:ring-2 focus:ring-[#0092b8] transition-all font-medium text-sm md:text-base"
            />
          </div>

          {/* Selects Container */}
          <div className="flex flex-row gap-2 w-full lg:w-auto">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-slate-50 border-none h-12 md:h-14 px-4 md:px-6 rounded-full focus:ring-2 focus:ring-[#0092b8] font-bold text-slate-700 cursor-pointer flex-1 text-xs md:text-sm lg:w-44"
            >
              <option value="">Categories</option>
              <option value="Photography">Photography</option>
              <option value="Sports">Sports</option>
              <option value="Tech">Tech</option>
            </select>

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-slate-50 border-none h-12 md:h-14 px-4 md:px-6 rounded-full focus:ring-2 focus:ring-[#0092b8] font-bold text-slate-700 cursor-pointer flex-1 text-xs md:text-sm lg:w-44"
            >
              <option value="newest">Latest</option>
              <option value="highestFee">Price: High</option>
              <option value="lowestFee">Price: Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 md:mt-20">
        {isFetching && (
          <div className="flex justify-center mb-10">
            <span className="loading loading-dots loading-md text-[#0092b8]"></span>
          </div>
        )}

        {/* 📦 ADAPTIVE GRID */}
        <AnimatePresence mode="popLayout">
          {clubsToDisplay.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <FiLayers className="text-5xl text-slate-200 mx-auto mb-4" />
              <p className="text-lg text-slate-500 font-bold">No cosmic matches found.</p>
            </motion.div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10"
            >
              {clubsToDisplay.map((club) => (
                <motion.div
                  layout
                  key={club._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -8 }}
                  className="group bg-white rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300"
                >
                  {/* Image Section */}
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <img
                      src={club.bannerImage}
                      alt={club.clubName}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[#007a99] font-black text-[10px] rounded-full shadow-md uppercase tracking-widest">
                        {club.category}
                      </span>
                    </div>
                  </div>

                  {/* Body Section */}
                  <div className="p-5 md:p-8">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-2 line-clamp-1">
                      {club.clubName}
                    </h2>
                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6 line-clamp-2">
                      {club.description}
                    </p>

                    <div className="flex items-center justify-between py-3 border-t border-slate-50 mb-6">
                      <div className="flex items-center gap-1.5 text-slate-600 font-semibold text-[10px] md:text-xs">
                        <FiMapPin className="text-[#0092b8]" />
                        {club.location}
                      </div>
                      <div className="text-sm md:text-lg font-black text-[#007a99]">
                        {club.membershipFee === 0 ? "FREE" : `$${club.membershipFee}`}
                      </div>
                    </div>

                    <button
                      onClick={() => navigate(`/club/${club._id}`)}
                      className="w-full py-3 md:py-4 bg-[#0092b8] hover:bg-[#007a99] text-white font-bold rounded-xl md:rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md shadow-[#0092b8]/10"
                    >
                      More Details <FiArrowRight />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Clubs;