import React from "react";
import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Loadingspinner from "../../Components/Shared/Loadingspinner";
import { FiMapPin, FiTag, FiCreditCard, FiCheckCircle, FiInfo, FiArrowLeft, FiUsers, FiShield } from "react-icons/fi";

const ClubDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: club = {}, isLoading } = useQuery({
    queryKey: ["club", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loadingspinner />;

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20 font-sans tracking-tight">
      {/* 1. PREMIUM HERO SECTION */}
      <div className="relative h-[45vh] md:h-[60vh] w-full overflow-hidden bg-slate-900">
        <motion.img
          initial={{ scale: 1.1, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 2 }}
          src={club.bannerImage}
          alt={club.clubName}
          className="w-full h-full object-cover"
        />
        
        {/* Top Navigation Overlay */}
        <div className="absolute top-0 left-0 w-full p-6 z-20">
          <div className="max-w-7xl mx-auto">
            <Link to="/clubs" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-xs font-bold uppercase tracking-widest transition-all group">
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Explorations
            </Link>
          </div>
        </div>

        {/* Hero Text */}
        <div className="absolute inset-0 flex flex-col justify-center px-6 max-w-7xl mx-auto w-full z-10">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-4">
               <span className="px-3 py-1 bg-[#0092b8] text-white text-[10px] font-black rounded shadow-lg uppercase tracking-widest">
                {club.category}
              </span>
              <span className="flex items-center gap-1 text-white/60 text-[10px] font-bold uppercase tracking-widest">
                <FiUsers /> 500+ Active Members
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
              {club.clubName}
            </h1>
            <div className="flex items-center gap-6 text-white/80">
                <div className="flex items-center gap-2 text-sm font-medium">
                    <FiMapPin className="text-[#0092b8]" /> {club.location}
                </div>
                <div className="flex items-center gap-2 text-sm font-medium">
                    <FiShield className="text-[#0092b8]" /> Verified Community
                </div>
            </div>
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 to-transparent opacity-60"></div>
      </div>

      {/* 2. CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT: INFO PANELS */}
          <div className="lg:col-span-8 space-y-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-slate-50 rounded-xl text-[#0092b8]">
                  <FiInfo className="text-xl" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Spherical Overview</h3>
              </div>
              
              <p className="text-slate-600 text-lg leading-relaxed mb-10 first-letter:text-4xl first-letter:font-black first-letter:text-slate-900 first-letter:mr-1">
                {club.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-y border-slate-100">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Status</p>
                  <p className="text-slate-900 font-bold">Public Community</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Foundation</p>
                  <p className="text-slate-900 font-bold">Est. 2024</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Activity Level</p>
                  <p className="text-[#0092b8] font-bold">High Frequency</p>
                </div>
              </div>
            </motion.div>

            {/* Perks Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <FiCheckCircle className="text-green-500" /> Exclusive Privileges
                  </h4>
                  <ul className="text-sm text-slate-500 space-y-3">
                    <li>• VIP access to all upcoming events</li>
                    <li>• Monthly networking workshops</li>
                    <li>• Official community merchandise</li>
                  </ul>
               </div>
               <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <FiCheckCircle className="text-green-500" /> Member Support
                  </h4>
                  <ul className="text-sm text-slate-500 space-y-3">
                    <li>• 24/7 dedicated community chat</li>
                    <li>• Direct mentorship opportunities</li>
                    <li>• Early bird registration for tours</li>
                  </ul>
               </div>
            </div>
          </div>

          {/* RIGHT: FLOATING ACTION CARD */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="sticky top-28"
            >
              <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                {/* Abstract Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#0092b8]/20 blur-3xl rounded-full -mr-16 -mt-16"></div>
                
                <div className="relative z-10">
                  <p className="text-[#0092b8] text-[10px] font-black uppercase tracking-[0.2em] mb-2">Membership Tier</p>
                  <h3 className="text-2xl font-bold mb-8">Professional Access</h3>

                  <div className="mb-10 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-1">One-time Entrance Fee</p>
                    <h4 className="text-5xl font-black text-white">
                      {club.membershipFee === 0 ? "FREE" : `$${club.membershipFee}`}
                    </h4>
                  </div>

                  {club?.alreadyMember ? (
                    <div className="w-full py-5 bg-green-500/10 text-green-400 font-bold rounded-xl flex items-center justify-center gap-3 border border-green-500/20">
                      <FiCheckCircle className="text-xl" /> ACTIVE MEMBER
                    </div>
                  ) : (
                    <Link to={`/clubs/${club._id}/membership`}>
                      <motion.button
                        whileHover={{ scale: 1.02, backgroundColor: "#007a99" }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-5 bg-[#0092b8] text-white font-black rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        JOIN THIS SPHERE <FiCreditCard />
                      </motion.button>
                    </Link>
                  )}
                  
                  <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
                    <p className="text-[10px] text-white/40 leading-relaxed text-center font-medium">
                      By joining, you agree to the Sphere's Code of Conduct and Community Guidelines.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-6 bg-[#0092b8]/5 rounded-2xl border border-[#0092b8]/10 flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-[#0092b8] flex items-center justify-center text-white shrink-0">
                    <FiShield size={20} />
                 </div>
                 <p className="text-[11px] text-slate-600 font-medium">
                    Your payment is secured with industry-standard encryption.
                 </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ClubDetails;