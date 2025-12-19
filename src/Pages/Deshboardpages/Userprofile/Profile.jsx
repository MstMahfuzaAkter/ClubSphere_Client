import React from 'react';
import { FaEnvelope, FaUserTag, FaShieldAlt, FaCalendarCheck } from 'react-icons/fa';
import { MdOutlinePhotoCamera } from 'react-icons/md';
import { motion } from 'framer-motion';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loadingspinner from '../../../Components/Shared/Loadingspinner';

const Profile = () => {
  const axiosSecure = useAxiosSecure();

  const { data: profileinfo, isLoading, error } = useQuery({
    queryKey: ['profileinfo'],
    queryFn: async () => {
      const res = await axiosSecure.get('/userprofile');
      return res.data;
    }
  });

  const getRoleStyle = (role) => {
    switch (role) {
      case 'admin': return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'manager': return 'bg-cyan-50 text-cyan-600 border-cyan-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  if (isLoading) return <Loadingspinner />;
  if (error) return <div className="text-center mt-20 text-red-500 font-bold">Failed to load profile. Please try again.</div>;

  return (
    <div className=" pb-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >
        {/* --- Page Header --- */}
        <div className="mb-8">
          <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
            Account Settings
          </h2>
          <p className="text-sm text-slate-400 font-medium mt-1">Manage your public profile and account security</p>
        </div>

        {/* --- Profile Card --- */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden relative">
          {/* Decorative Background Element */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-[#007a99]/10 to-transparent"></div>

          <div className="relative z-10 p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
              
              {/* Left Section: Avatar */}
              <div className="relative group">
                <div className="w-40 h-40 rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl relative transition-transform duration-500 group-hover:scale-[1.02]">
                  <img
                    src={profileinfo?.photo || 'https://i.ibb.co/0n6N9Y4/user-placeholder.png'}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button 
                  className="absolute -bottom-2 -right-2 bg-white text-[#007a99] p-3 rounded-2xl shadow-xl hover:bg-[#007a99] hover:text-white transition-all duration-300 border border-slate-100 group-hover:rotate-12"
                  title="Update Photo"
                >
                  <MdOutlinePhotoCamera size={20} />
                </button>
              </div>

              {/* Right Section: Info */}
              <div className="flex-1 text-center md:text-left pt-2">
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4 justify-center md:justify-start">
                  <h3 className="text-4xl font-black text-slate-800 tracking-tighter">
                    {profileinfo?.name || 'User Name'}
                  </h3>
                  <span className={`inline-flex items-center gap-1.5 px-4 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest border ${getRoleStyle(profileinfo?.role)}`}>
                    <FaShieldAlt size={10} />
                    {profileinfo?.role || 'Member'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  {/* Email Box */}
                  <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-[#007a99]/30 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#007a99] shadow-sm">
                      <FaEnvelope size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</span>
                      <span className="text-sm font-bold text-slate-700 truncate max-w-[200px] md:max-w-none">
                        {profileinfo?.email || 'Not Available'}
                      </span>
                    </div>
                  </div>

                  {/* Role Box */}
                  <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-[#007a99]/30 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-orange-500 shadow-sm">
                      <FaUserTag size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Account Type</span>
                      <span className="text-sm font-bold text-slate-700 capitalize">
                        {profileinfo?.role || 'Standard Member'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Additional Stats/Info (Optional) */}
                <div className="mt-8 flex items-center gap-6 justify-center md:justify-start border-t border-slate-50 pt-8">
                  <div className="flex items-center gap-2 text-slate-500 italic">
                    <FaCalendarCheck className="text-[#007a99]" size={14} />
                    <span className="text-xs font-medium">Account Status: <span className="text-emerald-500 font-bold not-italic">Verified</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Pro Tip / Security Info --- */}
        <div className="mt-6 p-6 bg-cyan-900 rounded-[2rem] text-white flex flex-col md:flex-row items-center justify-between gap-4">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-cyan-800 flex items-center justify-center text-cyan-300">
                <FaShieldAlt />
              </div>
              <p className="text-sm font-medium">Keep your profile updated to get better event recommendations!</p>
           </div>
           <button className="px-6 py-2 bg-white text-cyan-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-cyan-50 transition-colors">
             Edit Profile
           </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;