import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FiSearch, FiLayers, FiMapPin, FiChevronRight, FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router";

const CategoriesList = [
  "Photography", "Sports", "Tech", "Hiking", "Music", "Gaming", 
  "University Club", "Art & Design", "Coding & Programming", 
  "Science & Research", "Fitness & Health", "Travel & Adventure", 
  "Cooking & Food", "Volunteering", "Book Club", "Debate & Public Speaking"
];

const Clubs = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Debounce logic for search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  // 1. Initial Clubs (When no search/filter)
  const { data: initialClubs = [], isLoading: isInitialLoading } = useQuery({
    queryKey: ["clubs", "approved"],
    queryFn: async () => {
      const res = await axiosSecure.get("/clubs/approved");
      return res.data;
    },
  });

  // 2. Filtered Clubs
  const { data: filteredClubs = [], isFetching: isFilterFetching } = useQuery({
    queryKey: ["filterclubs", debouncedSearch, category, sortOption],
    queryFn: async () => {
      const res = await axiosSecure.get("/club/search", {
        params: { search: debouncedSearch, category, sort: sortOption },
      });
      return res.data;
    },
    enabled: !!(debouncedSearch || category || sortOption !== "newest"), // Only run if filtering
    placeholderData: (previousData) => previousData,
  });

  // Logic to determine which data to show
  const isFiltering = !!(debouncedSearch || category || sortOption !== "newest");
  const clubsToDisplay = isFiltering ? filteredClubs : initialClubs;
  const isLoading = isInitialLoading || (isFiltering && isFilterFetching);

  const handleCategorySelect = (cat) => {
    setCategory(cat);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800">
      
      {/* --- SIDEBAR (Desktop) --- */}
      <aside className="w-72 border-r border-slate-200 hidden lg:block sticky top-0 h-screen pt-24 pb-10 px-4 bg-white overflow-y-auto">
        <h3 className="text-xs font-bold text-slate-400 mb-6 px-2 uppercase tracking-widest">Categories</h3>
        <nav className="space-y-1">
          <button 
            onClick={() => handleCategorySelect("")}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between transition-all ${category === "" ? "bg-[#0092b8] text-white shadow-lg shadow-cyan-100" : "hover:bg-slate-50 text-slate-600"}`}
          >
            All Communities <FiChevronRight className={category === "" ? "opacity-100" : "opacity-30"} />
          </button>
          {CategoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between transition-all ${category === cat ? "bg-[#0092b8] text-white shadow-lg shadow-cyan-100" : "hover:bg-slate-50 text-slate-600"}`}
            >
              {cat} <FiChevronRight className={category === cat ? "opacity-100" : "opacity-30"} />
            </button>
          ))}
        </nav>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 min-w-0 bg-white lg:bg-slate-50/30">
        
        {/* Header Section */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 pt-20 pb-4 px-4 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center">
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-3 bg-slate-100 rounded-lg text-slate-600"
            >
              <FiMenu size={20} />
            </button>

            {/* Search Bar */}
            <div className="relative flex-1 group w-full">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0092b8] transition-colors" />
              <input
                type="text"
                placeholder="Search for clubs, hobbies, or interests..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-100 border-2 border-transparent h-12 pl-12 pr-4 rounded-xl focus:bg-white focus:border-[#0092b8]/20 focus:ring-4 focus:ring-[#0092b8]/5 transition-all outline-none text-sm"
              />
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full md:w-48 bg-slate-100 border-none h-12 px-4 rounded-xl text-sm font-bold text-slate-600 outline-none cursor-pointer hover:bg-slate-200 transition-colors"
            >
              <option value="newest">Newest First</option>
              <option value="highestFee">Price: High to Low</option>
              <option value="lowestFee">Price: Low to High</option>
            </select>
          </div>
        </header>

        {/* Clubs Grid */}
        <section className="p-4 lg:p-8 max-w-7xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
               {[1,2,3,4,5,6,7,8].map(n => (
                 <div key={n} className="h-[380px] bg-slate-100 animate-pulse rounded-2xl" />
               ))}
            </div>
          ) : clubsToDisplay.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-100">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiLayers className="text-4xl text-slate-200" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">No clubs found</h3>
              <p className="text-slate-400 mt-2 max-w-xs mx-auto">We couldn't find any clubs matching your current filters. Try different keywords.</p>
              <button 
                onClick={() => {setSearch(""); setCategory(""); setSortOption("newest");}}
                className="mt-6 px-6 py-2 bg-[#0092b8] text-white rounded-full font-bold text-sm hover:shadow-lg transition-all"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {clubsToDisplay.map((club) => (
                <div 
                  key={club._id}
                  className="bg-white border border-slate-100 rounded-2xl hover:shadow-[0_20px_50px_rgba(0,146,184,0.1)] hover:border-[#0092b8]/20 transition-all duration-500 flex flex-col group overflow-hidden"
                >
                  {/* Thumbnail */}
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={club.bannerImage}
                      alt={club.clubName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black text-[#0092b8] shadow-sm uppercase tracking-tighter">
                      {club.category}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5 flex flex-col flex-grow text-center">
                    <h2 className="text-base font-black text-slate-800 mb-2 line-clamp-1 group-hover:text-[#0092b8] transition-colors">
                      {club.clubName}
                    </h2>
                    <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 font-semibold mb-4">
                      <FiMapPin className="text-[#0092b8]" size={14} /> {club.location}
                    </div>
                    
                    <div className="mt-auto pt-4 border-t border-slate-50">
                      <div className="text-lg font-black text-slate-900 mb-4">
                        {club.membershipFee === 0 ? (
                          <span className="text-emerald-500">Free</span>
                        ) : (
                          <span>${club.membershipFee}</span>
                        )}
                      </div>
                      
                      <button
                        onClick={() => navigate(`/club/${club._id}`)}
                        className="w-full py-3 bg-slate-50 text-slate-600 group-hover:bg-[#0092b8] group-hover:text-white rounded-xl text-xs font-black uppercase tracking-[0.1em] transition-all duration-300"
                      >
                        Explore Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* --- MOBILE SIDEBAR DRAWER --- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <motion.aside 
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            className="absolute top-0 left-0 w-80 h-full bg-white shadow-2xl p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-black text-xl text-[#0092b8]">Categories</h2>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-slate-100 rounded-full"><FiX /></button>
            </div>
            <nav className="space-y-2">
              <button 
                onClick={() => handleCategorySelect("")}
                className={`w-full text-left px-5 py-4 rounded-2xl font-bold ${category === "" ? "bg-[#0092b8] text-white" : "bg-slate-50"}`}
              >
                All Communities
              </button>
              {CategoriesList.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`w-full text-left px-5 py-4 rounded-2xl font-bold ${category === cat ? "bg-[#0092b8] text-white" : "bg-slate-50"}`}
                >
                  {cat}
                </button>
              ))}
            </nav>
          </motion.aside>
        </div>
      )}
    </div>
  );
};

export default Clubs;