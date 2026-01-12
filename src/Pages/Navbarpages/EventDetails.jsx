import React from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router";
import Loadingspinner from "../../Components/Shared/Loadingspinner";
import useAuth from "../../Hook/useAuth";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FiMapPin, FiCalendar, FiDollarSign, FiUser, FiClock, FiCheckCircle, FiXCircle, FiArrowLeft } from "react-icons/fi";

const EventDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { user } = useAuth();

  const { data: event, isLoading } = useQuery({
    queryKey: ["eventdetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/events/${id}`);
      return res.data;
    },
  });

  const { data: registration, refetch: refetchRegistration } = useQuery({
    queryKey: ["userEventRegistration", id, user?.email],
    enabled: !!id && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/eventRegistrations/evnetid?evnetid=${id}&useremail=${user.email}`
      );
      return res.data;
    },
  });

  const handleRegister = async () => {
    if (!user) return toast.warn("Please login to register");

    const now = new Date();
    const bdTime = now.toLocaleString("en-US", { timeZone: "Asia/Dhaka" });

    const regData = {
      evnetid: id,
      useremail: user.email,
      clubId: event.clubId,
      status: "registered",
      paymentID: event?.paymentID || "free",
      regeesteredat: bdTime,
      eventWoner: event.createdBy,
      eventtitle: event.title,
      clubname: event.clubName,
      eventDate: event.eventDate,
    };

    try {
      const res = await axiosSecure.post("/eventRegistrations", regData);
      if (res.data?.success) {
        toast.success("Successfully registered! ✨");
        refetchRegistration();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  const handleCancel = async () => {
    try {
      const res = await axiosSecure.patch(
        `/eventRegistrations/cancel?evnetid=${id}&useremail=${user.email}`
      );
      if (res.data?.success) {
        toast.success("Registration cancelled");
        refetchRegistration();
      }
    } catch (err) {
      toast.error("Failed to cancel");
    }
  };

  if (isLoading) return <Loadingspinner />;
  if (!event) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-slate-500">
      <p className="text-xl font-medium">Event not found...</p>
      <Link to="/events" className="text-[#007a99] font-bold hover:underline">Return to Events</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fbff] pb-20">
      {/* Hero Section */}
      <div className="relative min-h-[40vh] md:h-[500px] flex items-center bg-slate-900 overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#007a99] via-[#0092b8] to-cyan-800 opacity-90"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-400/10 rounded-full -ml-36 -mb-36 blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 w-full">
          <Link 
            to="/events" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-all group font-bold text-sm uppercase tracking-widest"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Events
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-black uppercase tracking-[0.2em] mb-4 inline-block">
              {event.clubName || "Featured Event"}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight max-w-4xl">
              {event.title}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-white rounded-[2rem] sm:rounded-[3rem] p-8 md:p-14 shadow-xl shadow-blue-900/5 border border-slate-100"
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="w-12 h-1.5 bg-[#007a99] rounded-full"></span>
            <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Event Overview</h3>
          </div>

          <p className="text-slate-600 leading-relaxed text-lg mb-12 whitespace-pre-line">
            {event.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-8 pt-10 border-t border-slate-100">
            <InfoBlock 
              label="Location" 
              value={event.location} 
              icon={<FiMapPin className="text-[#007a99]" />} 
            />
            <InfoBlock 
              label="Date & Time" 
              value={new Date(event.eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} 
              icon={<FiCalendar className="text-[#007a99]" />} 
            />
            <InfoBlock 
              label="Admission Fee" 
              value={event.isPaid ? `BDT ${event.eventFee}` : "Free Admission"} 
              icon={<FiDollarSign className="text-[#007a99]" />} 
            />
            <InfoBlock 
              label="Hosted By" 
              value={event.createdBy} 
              icon={<FiUser className="text-[#007a99]" />} 
            />
          </div>
        </motion.div>

        {/* Sidebar: Registration Card */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-xl shadow-blue-900/5 border border-slate-100 sticky top-28"
          >
            <h3 className="text-2xl font-black text-slate-800 mb-4">Secure Your Spot</h3>
            <p className="text-slate-500 font-medium text-sm mb-8 leading-relaxed">
              Don't miss out on this opportunity. Register now to receive event updates and entry details.
            </p>

            {registration && (
              <motion.div 
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="mb-6 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-3 text-emerald-700 text-sm font-bold"
              >
                <FiCheckCircle size={20} className="shrink-0" />
                <span>You're on the guest list!</span>
              </motion.div>
            )}

            <button
              onClick={registration ? handleCancel : handleRegister}
              className={`w-full py-4 rounded-2xl font-black uppercase tracking-[0.1em] text-[11px] sm:text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                registration
                  ? "bg-slate-100 text-slate-500 hover:bg-rose-50 hover:text-rose-600 border border-transparent hover:border-rose-100"
                  : "bg-[#007a99] text-white shadow-lg shadow-cyan-500/30 hover:bg-[#006680]"
              }`}
            >
              {registration ? (
                <><FiXCircle className="text-lg" /> Cancel My Booking</>
              ) : (
                <><FiCheckCircle className="text-lg" /> Register for Event</>
              )}
            </button>

            <div className="mt-8 pt-8 border-t border-slate-50 flex flex-col items-center gap-3">
              <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <FiClock className="text-[#007a99]" />
                Last Updated: {event.createdAt ? new Date(event.createdAt).toLocaleDateString() : 'Recently'}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Reusable Helper Component for Info Grid
const InfoBlock = ({ label, value, icon }) => (
  <div className="space-y-2 group">
    <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.15em] ml-1">{label}</p>
    <div className="flex items-center gap-3 text-slate-700 font-bold bg-slate-50 p-4 rounded-2xl group-hover:bg-white group-hover:shadow-md transition-all duration-300 border border-transparent group-hover:border-slate-100">
      <span className="text-xl">{icon}</span>
      <span className="text-sm sm:text-base line-clamp-1">{value}</span>
    </div>
  </div>
);

export default EventDetails;