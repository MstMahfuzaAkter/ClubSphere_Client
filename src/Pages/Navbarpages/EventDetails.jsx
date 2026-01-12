import React from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import Loadingspinner from "../../Components/Shared/Loadingspinner";
import useAuth from "../../Hook/useAuth";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FiMapPin, FiCalendar, FiDollarSign, FiUser, FiClock, FiCheckCircle, FiXCircle, FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router";

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
        toast.success("Successfully registered for the event!");
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
  if (!event) return <div className="text-center py-20  text-slate-500">Event not found...</div>;

  return (
    <div className="min-h-screen bg-[#fcfdff] pb-20 ">
      <div className="h-[350px] md:h-[450px] relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-r from-[#007a99] to-cyan-600 opacity-90"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 max-w-7xl mx-auto w-full">
          <Link to="/events" className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-all group">
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Events
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight max-w-4xl"
          >
            {event.title}
          </motion.h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100"
        >
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-8 h-1 bg-[#007a99] rounded-full"></span> About Event
          </h3>
          <p className="text-slate-600 leading-relaxed text-lg mb-10">
            {event.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-slate-50">
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Location</p>
              <div className="flex items-center gap-3 text-slate-700 font-bold">
                <FiMapPin className="text-[#007a99]" /> {event.location}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Date & Time</p>
              <div className="flex items-center gap-3 text-slate-700 font-bold">
                <FiCalendar className="text-[#007a99]" /> {new Date(event.eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Pricing</p>
              <div className="flex items-center gap-3 text-slate-700 font-bold">
                <FiDollarSign className="text-[#007a99]" /> {event.isPaid ? `BDT ${event.eventFee}` : "Free Admission"}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Organizer</p>
              <div className="flex items-center gap-3 text-slate-700 font-bold">
                <FiUser className="text-[#007a99]" /> {event.createdBy}
              </div>
            </div>
          </div>
        </motion.div>
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 sticky top-24"
          >
            <h3 className="text-2xl font-black text-slate-800 mb-4">Registration</h3>
            <p className="text-slate-500 font-medium text-sm mb-8 leading-relaxed">
              Join this event to network with peers and learn from experts. Limited spots available!
            </p>

            {registration && (
              <div className="mb-6 p-4 bg-green-50 rounded-2xl border border-green-100 flex items-center gap-3 text-green-700 text-sm font-bold">
                <FiCheckCircle size={20} /> You are registered!
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={registration ? handleCancel : handleRegister}
              className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${registration
                  ? "bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-600"
                  : " text-white bg-[#007a99] shadow-slate-200"
                }`}
            >
              {registration ? (
                <><FiXCircle /> Cancel Booking</>
              ) : (
                <><FiCheckCircle /> Confirm Registration</>
              )}
            </motion.button>

            <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
              <FiClock /> Registered on: {new Date(event.createdAt).toLocaleDateString()}
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default EventDetails;