import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { FiMapPin, FiDollarSign, FiTag, FiUpload, FiEdit, FiTrash2, FiPlus, FiImage } from "react-icons/fi";
import Loadingspinner from "../../../Components/Shared/Loadingspinner";
import { motion } from "framer-motion";

const MyClubs = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedClub, setSelectedClub] = useState(null);

  const { data: myclubs = [], refetch, isLoading } = useQuery({
    queryKey: ["myclubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/myclubs");
      return res.data;
    },
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  useEffect(() => {
    if (selectedClub) {
      reset({
        clubName: selectedClub.clubName,
        category: selectedClub.category,
        location: selectedClub.location,
        membershipFee: selectedClub.membershipFee,
        description: selectedClub.description,
      });
    }
  }, [selectedClub, reset]);

  const handleedit = async (data) => {
    try {
      let imageUrl = selectedClub.bannerImage;

      if (data.bannerImage && data.bannerImage[0]) {
        const formData = new FormData();
        formData.append("image", data.bannerImage[0]);
        const imgRes = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_HOST_KEY}`, {
          method: "POST",
          body: formData,
        });
        const imgData = await imgRes.json();
        imageUrl = imgData.data.url;
      }

      const updateClubInfo = {
        ...data,
        membershipFee: Number(data.membershipFee),
        bannerImage: imageUrl,
        updatedAt: new Date(),
      };

      const res = await axiosSecure.patch(`/clubs/${selectedClub._id}`, updateClubInfo);

      if (res.data.modifiedCount > 0) {
        Swal.fire({ title: "Updated!", text: "Club details have been refreshed.", icon: "success", customClass: { confirmButton: 'bg-[#007a99] text-white' } });
        refetch();
        document.getElementById("my_modal_5").close();
        setSelectedClub(null);
      }
    } catch (error) {
      Swal.fire("Error", "Update failed", "error");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
      borderRadius: "20px"
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/clubs/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Your club has been removed.", "success");
          refetch();
        }
      } catch (error) {
        Swal.fire("Error", "Deletion failed", "error");
      }
    }
  };

  if (isLoading) return <Loadingspinner />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className=" pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">My Managed Clubs</h2>
          <p className="text-slate-400 font-medium">Overview of all clubs you have created</p>
        </div>
        <Link to="/deshboard/manager/create-club">
          <button className="flex items-center gap-2 bg-[#007a99] hover:bg-[#005f78] text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-cyan-900/20 active:scale-95">
            <FiPlus /> Create New Club
          </button>
        </Link>
      </div>
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-separate border-spacing-y-0">
            <thead className="bg-slate-50/50">
              <tr className="text-slate-400">
                <th className="py-6 pl-8 text-[10px] font-black uppercase tracking-widest text-center">#</th>
                <th className="py-6 text-[10px] font-black uppercase tracking-widest">Club Info</th>
                <th className="py-6 text-[10px] font-black uppercase tracking-widest">Details</th>
                <th className="py-6 text-[10px] font-black uppercase tracking-widest text-center">Fee</th>
                <th className="py-6 pr-8 text-[10px] font-black uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {myclubs.map((club, index) => (
                <tr key={club._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="text-center font-bold text-slate-300 text-xs pl-8">{index + 1}</td>
                  <td className="py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-10 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                        {club.bannerImage ? (
                          <img src={club.bannerImage} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300"><FiImage /></div>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800 tracking-tight">{club.clubName}</span>
                        <span className="text-[10px] font-bold text-[#007a99] uppercase tracking-tighter flex items-center gap-1">
                          <FiTag size={10} /> {club.category}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col max-w-[200px]">
                      <span className="text-[11px] text-slate-500 line-clamp-1">{club.description}</span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium italic">
                        <FiMapPin size={10} /> {club.location}
                      </span>
                    </div>
                  </td>
                  <td className="text-center">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${club.membershipFee === 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-700'}`}>
                      {club.membershipFee === 0 ? "Free" : `$${club.membershipFee}`}
                    </span>
                  </td>
                  <td className="pr-8">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => { setSelectedClub(club); document.getElementById("my_modal_5").showModal(); }}
                        className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                      >
                        <FiEdit size={14} />
                      </button>
                      <button 
                        onClick={() => handleDelete(club._id)}
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
      </div>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
        <div className="modal-box max-w-2xl bg-white rounded-[2rem] p-8 lg:p-10 scrollbar-hide">
          <div className="flex items-center gap-4 mb-6">
             <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <FiEdit size={24} />
             </div>
             <div>
                <h3 className="font-black text-2xl text-slate-800 tracking-tight">Edit Club Info</h3>
                <p className="text-xs text-slate-400 font-medium tracking-wide lowercase italic">Updating: {selectedClub?.clubName}</p>
             </div>
          </div>

          <form onSubmit={handleSubmit(handleedit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="form-control">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2">Club Name</label>
                <input className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-[#007a99] transition-all font-semibold text-slate-700" {...register("clubName", { required: true })} />
              </div>
              <div className="form-control">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2">Category</label>
                <select className="select select-bordered w-full rounded-xl bg-slate-50 border-slate-100 font-semibold" {...register("category")}>
                  <option value="Photography">Photography</option>
                  <option value="Sports">Sports</option>
                  <option value="Tech">Tech</option>
                  <option value="Hiking">Hiking</option>
                </select>
              </div>
              <div className="form-control">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2">Location</label>
                <input className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-[#007a99] font-semibold text-slate-700" {...register("location")} />
              </div>
              <div className="form-control">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2">Membership Fee ($)</label>
                <input type="number" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-[#007a99] font-semibold text-slate-700" {...register("membershipFee")} />
              </div>
            </div>

            <div className="form-control">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2">Description</label>
                <textarea rows={3} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-[#007a99] font-semibold text-slate-700 resize-none" {...register("description")}></textarea>
            </div>

            <div className="form-control">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2">Banner Update (Optional)</label>
                <input type="file" className="file-input file-input-bordered w-full rounded-xl bg-slate-50 border-slate-100" {...register("bannerImage")} />
            </div>

            <div className="flex gap-3 mt-8">
              <button type="submit" className="flex-1 py-4 bg-[#007a99] text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-lg shadow-cyan-900/20 hover:bg-[#005f78] transition-all">Update Club</button>
              <button type="button" onClick={() => document.getElementById("my_modal_5").close()} className="px-8 py-4 bg-slate-100 text-slate-500 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-slate-200 transition-all">Cancel</button>
            </div>
          </form>
        </div>
      </dialog>
    </motion.div>
  );
};

export default MyClubs;