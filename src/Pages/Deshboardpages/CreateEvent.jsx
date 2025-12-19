import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FiCalendar, FiMapPin, FiAward, FiDollarSign, FiAlignLeft, FiChevronDown, FiPlusCircle } from "react-icons/fi";

const CreateEvent = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [selectedClub, setSelectedClub] = useState("Choose a club");
  const [loading, setLoading] = useState(false);

  // 🔹 dropdown ref
  const dropdownRef = useRef(null);

  const { data: clubs = [] } = useQuery({
    queryKey: ["clubs-by-email"],
    queryFn: async () => {
      const res = await axiosSecure.get("/clubs/approved-by-email");
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const isPaidEvent = watch("isPaid");

  // 🔹 outside click → close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        dropdownRef.current.removeAttribute("open");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        ...data,
        isPaid: data.isPaid || false,
        eventFee: data.isPaid ? Number(data.eventFee) : 0,
        maxAttendees: data.maxAttendees ? Number(data.maxAttendees) : null,
        createdAt: new Date(),
        createdBy: user?.email,
      };

      const res = await axiosSecure.post("/events", payload);

      if (res.data) {
        toast.success("Event created successfully! 🎊");
        reset();
        setSelectedClub("Choose a club");
      }
    } catch (err) {
      toast.error("Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto  px-4 pb-10"
    >
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl lg:text-4xl font-black text-slate-800 tracking-tight">
          Create <span className="text-[#007a99]">New Event</span>
        </h2>
        <p className="text-slate-400 font-medium mt-2 tracking-wide">Plan and publish your next club activity</p>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 lg:p-12 relative overflow-hidden">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Event Title */}
            <div className="form-control">
              <label className="label text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
                <span className="flex items-center gap-2"><FiAward /> Event Title</span>
              </label>
              <input
                placeholder="e.g. Annual Photography Workshop"
                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl outline-none transition-all focus:bg-white focus:border-[#007a99] focus:ring-4 focus:ring-[#007a99]/10"
                {...register("title", { required: "Event title is required" })}
              />
              {errors.title && <p className="text-red-500 text-[10px] font-bold mt-2 uppercase">{errors.title.message}</p>}
            </div>

            {/* Event Date */}
            <div className="form-control">
              <label className="label text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
                <span className="flex items-center gap-2"><FiCalendar /> Event Date</span>
              </label>
              <input
                type="date"
                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl outline-none transition-all focus:bg-white focus:border-[#007a99] focus:ring-4 focus:ring-[#007a99]/10"
                {...register("eventDate", { required: "Event date is required" })}
              />
              {errors.eventDate && <p className="text-red-500 text-[10px] font-bold mt-2 uppercase">{errors.eventDate.message}</p>}
            </div>

            {/* Club Dropdown */}
            <div className="form-control">
              <label className="label text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Select Hosting Club</label>
              <details ref={dropdownRef} className="dropdown w-full">
                <summary className="w-full flex items-center justify-between px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl cursor-pointer text-slate-600 font-semibold list-none hover:bg-slate-100 transition-all">
                  {selectedClub}
                  <FiChevronDown />
                </summary>
                <ul className="dropdown-content mt-2 menu bg-white border border-slate-100 rounded-2xl w-full p-2 shadow-xl z-50">
                  {clubs.length > 0 ? clubs.map((club) => (
                    <li key={club._id}>
                      <button
                        type="button"
                        className="rounded-xl py-3 hover:bg-[#007a99]/5 hover:text-[#007a99] font-bold"
                        onClick={() => {
                          setSelectedClub(club.clubName);
                          setValue("clubId", club._id);
                          setValue("clubName", club.clubName);
                          dropdownRef.current.removeAttribute("open");
                        }}
                      >
                        {club.clubName}
                      </button>
                    </li>
                  )) : <li className="p-3 text-xs text-slate-400">No approved clubs found</li>}
                </ul>
              </details>
              <input type="hidden" {...register("clubId", { required: "Please select a club" })} />
              {errors.clubId && <p className="text-red-500 text-[10px] font-bold mt-2 uppercase tracking-tight">{errors.clubId.message}</p>}
            </div>

            {/* Location */}
            <div className="form-control">
              <label className="label text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
                <span className="flex items-center gap-2"><FiMapPin /> Event Location</span>
              </label>
              <input
                placeholder="e.g. Science Lab 402 or Online"
                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl outline-none transition-all focus:bg-white focus:border-[#007a99] focus:ring-4 focus:ring-[#007a99]/10"
                {...register("location", { required: "Location is required" })}
              />
            </div>
          </div>

          {/* Paid toggle & Fee */}
          <div className="p-6 bg-slate-50 rounded-[2rem] grid grid-cols-1 md:grid-cols-2 gap-6 items-center border border-slate-100/50">
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-4">
                <input
                  type="checkbox"
                  className="toggle toggle-primary toggle-md"
                  {...register("isPaid")}
                />
                <span className="text-sm font-black text-slate-700 uppercase tracking-widest">
                  Paid Event?
                </span>
              </label>
            </div>

            {isPaidEvent && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                <div className="relative">
                   <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                   <input
                    type="number"
                    placeholder="Entry Fee"
                    className="w-full pl-10 pr-6 py-3 bg-white border-2 border-slate-200 rounded-xl outline-none focus:border-[#007a99] transition-all"
                    {...register("eventFee")}
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
              <span className="flex items-center gap-2"><FiAlignLeft /> Event Details</span>
            </label>
            <textarea
              rows={4}
              placeholder="What will happen at this event?"
              className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl outline-none transition-all focus:bg-white focus:border-[#007a99] focus:ring-4 focus:ring-[#007a99]/10 resize-none"
              {...register("description", { required: "Description is required" })}
            ></textarea>
          </div>

          <button 
            disabled={loading}
            className={`w-full py-5 rounded-2xl font-black uppercase text-sm tracking-[0.2em] transition-all shadow-lg flex items-center justify-center gap-3
              ${loading ? 'bg-slate-200 text-slate-400' : 'bg-[#007a99] text-white hover:bg-[#005f78] hover:scale-[1.01] shadow-cyan-900/20'}`}
          >
            {loading ? "Creating..." : <><FiPlusCircle size={20}/> Publish Event</>}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default CreateEvent;