import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FiSearch, FiLayers, FiMapPin, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router";

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

  const categories = ["Photography", "Sports", "Tech", "Arts", "Music"];

  return (
    <div className="flex min-h-screen bg-white text-slate-800">
      
      {/* 1. CHALDAL STYLE SIDEBAR (Fixed Left) */}
      <aside className="w-64 border-r border-slate-100 hidden lg:block sticky top-0 h-screen pt-24 px-4 bg-[#f9f9f9]">
        <h3 className="text-sm font-bold text-slate-400 mb-6 px-2 uppercase tracking-widest">Categories</h3>
        <nav className="space-y-1">
          <button 
            onClick={() => setCategory("")}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold flex items-center justify-between transition-all ${category === "" ? "bg-[#0092b8] text-white shadow-md" : "hover:bg-white text-slate-600"}`}
          >
            All Communities <FiChevronRight />
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold flex items-center justify-between transition-all ${category === cat ? "bg-[#0092b8] text-white shadow-md" : "hover:bg-white text-slate-600"}`}
            >
              {cat} <FiChevronRight />
            </button>
          ))}
        </nav>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1">
        {/* Top Search & Filter Bar */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-100 pt-20 pb-4 px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 group w-full">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0092b8]" />
              <input
                type="text"
                placeholder="Search for clubs (e.g. Photography...)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-100 border-none h-12 pl-12 pr-4 rounded-md focus:ring-2 focus:ring-[#0092b8]/20 transition-all outline-none text-sm"
              />
            </div>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-slate-100 border-none h-12 px-4 rounded-md text-sm font-bold text-slate-600 outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="highestFee">Price: High to Low</option>
              <option value="lowestFee">Price: Low to High</option>
            </select>
          </div>
        </header>

        {/* Product/Club Grid */}
        <section className="p-6">
          {isLoading || isFetching ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
               {[1,2,3,4,5,6,7,8].map(n => (
                 <div key={n} className="h-80 bg-slate-50 animate-pulse rounded-lg border border-slate-100" />
               ))}
            </div>
          ) : clubsToDisplay.length === 0 ? (
            <div className="text-center py-20">
              <FiLayers className="text-4xl text-slate-200 mx-auto mb-4" />
              <p className="text-slate-400 font-medium">No clubs found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {clubsToDisplay.map((club) => (
                <div 
                  key={club._id}
                  className="bg-white border border-slate-100 rounded-xl hover:shadow-xl hover:border-[#0092b8]/30 transition-all duration-300 flex flex-col group overflow-hidden"
                >
                  {/* Image like Chaldal Product Image */}
                  <div className="relative h-44 bg-slate-50 flex items-center justify-center p-2">
                    <img
                      src={club.bannerImage}
                      alt={club.clubName}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-[10px] font-bold text-[#0092b8] shadow-sm border border-slate-100 uppercase">
                      {club.category}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4 flex flex-col flex-grow text-center">
                    <h2 className="text-sm font-bold text-slate-800 mb-1 line-clamp-1 group-hover:text-[#0092b8] transition-colors">
                      {club.clubName}
                    </h2>
                    <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 font-medium mb-3">
                      <FiMapPin size={12} /> {club.location}
                    </div>
                    
                    <div className="mt-auto">
                      <div className="text-md font-black text-slate-900 mb-3">
                        {club.membershipFee === 0 ? "Free" : `$${club.membershipFee}`}
                      </div>
                      
                      <button
                        onClick={() => navigate(`/club/${club._id}`)}
                        className="w-full py-2.5 border-2 border-[#0092b8] text-[#0092b8] hover:bg-[#0092b8] hover:text-white rounded-lg text-xs font-black uppercase tracking-wider transition-all"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Clubs;