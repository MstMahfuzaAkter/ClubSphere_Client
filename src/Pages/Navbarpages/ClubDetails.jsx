import React from "react";
import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Loadingspinner from "../../Components/Shared/Loadingspinner";
import { FiMapPin, FiTag, FiCreditCard, FiCheckCircle, FiInfo, FiArrowLeft } from "react-icons/fi";

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
    <div className="min-h-screen bg-[#fcfdff] pb-20">
      {/* 🔙 BACK BUTTON & HERO SECTION */}
      <div className="relative h-[40vh] md:h-[55vh] w-full overflow-hidden">
        <motion.img
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src={club.bannerImage}
          alt={club.clubName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001a2c] via-[#001a2c]/40 to-transparent"></div>
        
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-12 max-w-7xl mx-auto w-full">
          <Link to="/clubs" className="absolute top-28 left-6 text-white flex items-center gap-2 font-bold bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 hover:bg-[#0092b8] transition-all">
            <FiArrowLeft /> Back to Clubs
          </Link>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="space-y-4"
          >
            <span className="px-4 py-1 bg-[#0092b8] text-white text-xs font-black rounded-full uppercase tracking-widest">
              {club.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
              {club.clubName}
            </h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 📝 LEFT: CLUB DESCRIPTION */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-100 p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6 text-[#0092b8]">
                <FiInfo className="text-2xl" />
                <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">About the Sphere</h3>
              </div>
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                {club.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12 border-t border-slate-50 pt-10">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-[#0092b8] group-hover:bg-[#0092b8] group-hover:text-white transition-all">
                    <FiMapPin className="text-xl" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Location</p>
                    <p className="text-slate-800 font-bold">{club.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-[#0092b8] group-hover:bg-[#0092b8] group-hover:text-white transition-all">
                    <FiTag className="text-xl" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Category</p>
                    <p className="text-slate-800 font-bold">{club.category}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 💳 RIGHT: ACTION SIDEBAR */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,146,184,0.15)] border border-slate-100 p-8 sticky top-28 overflow-hidden">
              {/* Decorative Circle */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#0092b8]/5 rounded-full"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Membership</h3>
                  <div className="p-3 bg-slate-50 rounded-2xl text-[#0092b8]">
                    <FiCreditCard className="text-xl" />
                  </div>
                </div>

                <div className="mb-8">
                  <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Total Fee</p>
                  <h4 className="text-4xl font-black text-[#007a99]">
                    {club.membershipFee === 0 ? "FREE" : `$${club.membershipFee}`}
                  </h4>
                </div>

                <div className="space-y-4 mb-10">
                  <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                    <FiCheckCircle className="text-[#0092b8]" /> Exclusive Event Access
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                    <FiCheckCircle className="text-[#0092b8]" /> Community Discussion
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                    <FiCheckCircle className="text-[#0092b8]" /> Mentorship Programs
                  </div>
                </div>

                {club?.alreadyMember ? (
                  <div className="w-full py-5 bg-teal-50 text-teal-600 font-black rounded-2xl flex items-center justify-center gap-3 border border-teal-100">
                    <FiCheckCircle className="text-xl" /> ALREADY A MEMBER
                  </div>
                ) : (
                  <Link to={`/clubs/${club._id}/membership`}>
                    <motion.button
                      whileHover={{ scale: 1.02, backgroundColor: "#001a2c" }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-5 bg-[#0092b8] text-white font-black rounded-2xl flex items-center justify-center gap-3 shadow-[0_15px_30px_rgba(0,146,184,0.3)] transition-all"
                    >
                      SECURE MEMBERSHIP
                    </motion.button>
                  </Link>
                )}
                
                <p className="text-center text-slate-400 text-[10px] font-bold mt-6 uppercase tracking-widest leading-relaxed">
                  Join 500+ members in this <br /> growing community
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ClubDetails;