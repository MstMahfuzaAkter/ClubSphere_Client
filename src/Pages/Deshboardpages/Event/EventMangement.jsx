import React from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import Loadingspinner from "../../../Components/Shared/Loadingspinner";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FiEdit, FiTrash2, FiPlus, FiMapPin, FiCalendar, FiAlignLeft, FiCalendar as FiDateIcon } from "react-icons/fi";
import dayjs from "dayjs";

const EventManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedEvent, setSelectedEvent] = React.useState(null);

  const { register, handleSubmit, setValue, reset } = useForm();

  const {
    data: events = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["events-manager"],
    queryFn: async () => {
      const res = await axiosSecure.get("/event/by-wonermail");
      return res.data;
    },
  });

  React.useEffect(() => {
    if (selectedEvent) {
      setValue("title", selectedEvent.title);
      setValue("location", selectedEvent.location);
      setValue("description", selectedEvent.description);
      setValue("eventDate", selectedEvent.eventDate);
    }
  }, [selectedEvent, setValue]);

  if (isLoading) return <Loadingspinner />;

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.patch(`/events/${selectedEvent._id}`, data);
      if (res.data.matchedCount) {
        toast.success("Event updated successfully! ✨");
        refetch();
        setSelectedEvent(null);
        reset();
      }
    } catch (err) {
      toast.error("Failed to update event");
    }
  };

  const handleeventdelete = async (id) => {
    Swal.fire({
      title: "Delete Event?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
      borderRadius: "20px"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/events/${id}`);
        if (res.data.deletedCount) {
          Swal.fire("Deleted!", "Event has been removed.", "success");
          refetch();
        }
      }
    });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className=" pb-10">
      
      {/* --- Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Event Management</h2>
          <p className="text-slate-400 font-medium">Schedule and manage your club activities</p>
        </div>
        <Link to="/deshboard/manager/create-event">
          <button className="flex items-center gap-2 bg-[#007a99] hover:bg-[#005f78] text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-cyan-900/20 active:scale-95 w-full sm:w-auto">
            <FiPlus /> Create New Event
          </button>
        </Link>
      </div>

      {/* --- Desktop Table --- */}
      <div className="hidden md:block bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <table className="table w-full border-separate border-spacing-y-0">
          <thead>
            <tr className="bg-slate-50/50 text-slate-400">
              <th className="py-6 pl-8 text-[10px] font-black uppercase tracking-widest text-center">#</th>
              <th className="py-6 text-[10px] font-black uppercase tracking-widest">Event Info</th>
              <th className="py-6 text-[10px] font-black uppercase tracking-widest text-center">Date</th>
              <th className="py-6 pr-8 text-[10px] font-black uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {events.map((e, index) => (
              <tr key={e._id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="text-center font-bold text-slate-300 text-xs pl-8">{index + 1}</td>
                <td className="py-5">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-800 tracking-tight group-hover:text-[#007a99] transition-colors">{e.title}</span>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase">
                        <FiMapPin size={10} /> {e.location}
                      </span>
                      <span className="text-[10px] font-medium text-slate-300 line-clamp-1 max-w-[200px]">
                        {e.description}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="text-center">
                   <div className="inline-flex flex-col bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-black text-slate-700">{dayjs(e.eventDate).format("DD MMM YYYY")}</span>
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Created: {dayjs(e.createdAt).format("DD/MM/YY")}</span>
                   </div>
                </td>
                <td className="pr-8 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => setSelectedEvent(e)}
                      className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                    >
                      <FiEdit size={14} />
                    </button>
                    <button 
                      onClick={() => handleeventdelete(e._id)}
                      className="p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Mobile Cards --- */}
      <div className="md:hidden space-y-4">
        {events.map((e, index) => (
          <div key={e._id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Event #{index + 1}</span>
              <div className="flex gap-2">
                 <button onClick={() => setSelectedEvent(e)} className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><FiEdit size={14}/></button>
                 <button onClick={() => handleeventdelete(e._id)} className="p-2 bg-rose-50 text-rose-600 rounded-lg"><FiTrash2 size={14}/></button>
              </div>
            </div>
            <div>
              <h3 className="font-black text-slate-800 text-lg leading-tight mb-1">{e.title}</h3>
              <p className="text-xs text-slate-400 flex items-center gap-1 font-bold italic uppercase tracking-tighter"><FiMapPin /> {e.location}</p>
            </div>
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100/50">{e.description}</p>
            <div className="flex items-center gap-2 text-[#007a99]">
               <FiCalendar size={14} />
               <span className="text-[10px] font-black uppercase tracking-widest">{dayjs(e.eventDate).format("MMMM DD, YYYY")}</span>
            </div>
          </div>
        ))}
      </div>

      {/* --- Modern Edit Modal --- */}
      {selectedEvent && (
        <dialog open className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
          <div className="modal-box max-w-xl bg-white rounded-[2.5rem] p-8 lg:p-10 border border-slate-100 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-12 rounded-2xl bg-[#007a99]/10 flex items-center justify-center text-[#007a99]">
                  <FiEdit size={24} />
               </div>
               <div>
                  <h3 className="font-black text-2xl text-slate-800 tracking-tight">Edit Event</h3>
                  <p className="text-xs text-slate-400 font-medium tracking-wide">Refining: {selectedEvent.title}</p>
               </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="form-control">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2">Event Title</label>
                <input {...register("title")} className="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-50 rounded-xl outline-none focus:bg-white focus:border-[#007a99] transition-all font-bold text-slate-700 placeholder:text-slate-300" placeholder="Enter title" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2 flex items-center gap-2"><FiMapPin /> Location</label>
                  <input {...register("location")} className="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-50 rounded-xl outline-none focus:bg-white focus:border-[#007a99] transition-all font-bold text-slate-700" />
                </div>
                <div className="form-control">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2 flex items-center gap-2"><FiDateIcon /> Event Date</label>
                  <input type="date" {...register("eventDate")} className="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-50 rounded-xl outline-none focus:bg-white focus:border-[#007a99] transition-all font-bold text-slate-700" />
                </div>
              </div>

              <div className="form-control">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2 flex items-center gap-2"><FiAlignLeft /> Description</label>
                <textarea rows={3} {...register("description")} className="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-50 rounded-xl outline-none focus:bg-white focus:border-[#007a99] transition-all font-bold text-slate-700 resize-none" placeholder="Details about the event..." />
              </div>

              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 py-4 bg-[#007a99] text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-lg shadow-cyan-900/20 hover:bg-[#005f78] transition-all">Update Details</button>
                <button type="button" onClick={() => setSelectedEvent(null)} className="px-8 py-4 bg-slate-100 text-slate-500 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-slate-200 transition-all">Cancel</button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </motion.div>
  );
};

export default EventManagement;