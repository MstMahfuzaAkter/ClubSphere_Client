import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FiUpload, FiMapPin, FiTag, FiDollarSign, FiEdit3, FiInfo } from "react-icons/fi";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const CreateClubForm = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const imageFile = data.bannerImage[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      // Upload image to imgbb
      const imgUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_HOST_KEY}`;
      const imgRes = await axios.post(imgUrl, formData);
      const imageUrl = imgRes.data.data.url;

      const clubInfo = {
        clubName: data.clubName,
        description: data.description,
        category: data.category,
        location: data.location,
        bannerImage: imageUrl,
        membershipFee: Number(data.membershipFee),
        status: "pending",
        managerEmail: user?.email,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const res = await axiosSecure.post('/club', clubInfo);
      
      if (res.data.insertedId) {
        toast.success("Club created successfully! Waiting for admin approval.");
        reset();
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl mx-auto "
    >
      {/* --- Form Header --- */}
      <div className="text-center mb-10">
        <h2 className="text-3xl lg:text-4xl font-black text-slate-800 tracking-tight">
          Launch Your <span className="text-[#007a99]">Club</span>
        </h2>
        <p className="text-slate-400 font-medium mt-2">Fill in the details to start your community journey</p>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 lg:p-12 relative overflow-hidden">
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#007a99]/5 rounded-bl-[5rem] -z-0"></div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Club Name */}
            <div className="form-control">
              <label className="label text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
                <span className="flex items-center gap-2"><FiEdit3 /> Club Name</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Mountain Hikers"
                className={`w-full px-6 py-4 bg-slate-50 border-2 rounded-2xl outline-none transition-all focus:bg-white focus:ring-4 focus:ring-[#007a99]/10 ${errors.clubName ? 'border-red-200 focus:border-red-400' : 'border-slate-50 focus:border-[#007a99]'}`}
                {...register("clubName", { required: "Club Name is required" })}
              />
              {errors.clubName && <p className="text-red-500 text-[10px] font-bold mt-2 uppercase tracking-tight">{errors.clubName.message}</p>}
            </div>

            {/* Category */}
            <div className="form-control">
              <label className="label text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
                <span className="flex items-center gap-2"><FiTag /> Category</span>
              </label>
              <select
                className={`select w-full h-[60px] bg-slate-50 border-2 rounded-2xl outline-none transition-all focus:bg-white focus:ring-4 focus:ring-[#007a99]/10 ${errors.category ? 'border-red-200' : 'border-slate-50 focus:border-[#007a99]'}`}
                {...register("category", { required: "Category is required" })}
              >
                <option value="">Select Category</option>
                <option value="Photography">Photography</option>
                <option value="Sports">Sports</option>
                <option value="Tech">Tech</option>
                <option value="Hiking">Hiking</option>
                <option value="Music">Music</option>
                <option value="Gaming">Gaming</option>
              </select>
              {errors.category && <p className="text-red-500 text-[10px] font-bold mt-2 uppercase tracking-tight">{errors.category.message}</p>}
            </div>

            {/* Location */}
            <div className="form-control">
              <label className="label text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
                <span className="flex items-center gap-2"><FiMapPin /> Location</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Dhaka, Bangladesh"
                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl outline-none transition-all focus:bg-white focus:border-[#007a99] focus:ring-4 focus:ring-[#007a99]/10"
                {...register("location", { required: "Location is required" })}
              />
              {errors.location && <p className="text-red-500 text-[10px] font-bold mt-2 uppercase tracking-tight">{errors.location.message}</p>}
            </div>

            {/* Membership Fee */}
            <div className="form-control">
              <label className="label text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
                <span className="flex items-center gap-2"><FiDollarSign /> Membership Fee</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={0}
                  placeholder="0 = Free"
                  className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl outline-none transition-all focus:bg-white focus:border-[#007a99] focus:ring-4 focus:ring-[#007a99]/10"
                  {...register("membershipFee", { required: "Membership fee required" })}
                />
              </div>
              {errors.membershipFee && <p className="text-red-500 text-[10px] font-bold mt-2 uppercase tracking-tight">{errors.membershipFee.message}</p>}
            </div>
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
              <span className="flex items-center gap-2"><FiInfo /> Description</span>
            </label>
            <textarea
              rows={4}
              placeholder="Tell people what your club is about..."
              className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl outline-none transition-all focus:bg-white focus:border-[#007a99] focus:ring-4 focus:ring-[#007a99]/10 resize-none"
              {...register("description", { required: "Description is required" })}
            ></textarea>
            {errors.description && <p className="text-red-500 text-[10px] font-bold mt-2 uppercase tracking-tight">{errors.description.message}</p>}
          </div>

          {/* Banner Image Upload */}
          <div className="form-control">
            <label className="label text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
              <span className="flex items-center gap-2"><FiUpload /> Club Banner</span>
            </label>
            <div className="relative group">
              <input
                type="file"
                accept="image/*"
                className="file-input w-full h-16 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer transition-all hover:bg-slate-100 group-hover:border-[#007a99]"
                {...register("bannerImage", { required: "Banner image is required" })}
              />
            </div>
            {errors.bannerImage && <p className="text-red-500 text-[10px] font-bold mt-2 uppercase tracking-tight">{errors.bannerImage.message}</p>}
          </div>

          {/* Submit Button */}
          <button 
            disabled={loading}
            className={`w-full py-5 rounded-2xl font-black uppercase text-sm tracking-[0.2em] transition-all shadow-lg 
              ${loading ? 'bg-slate-200 text-slate-400' : 'bg-[#007a99] text-white hover:bg-[#005f78] hover:scale-[1.01] active:scale-[0.99] shadow-cyan-900/20'}`}
          >
            {loading ? "Processing..." : "Create Club Now"}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default CreateClubForm;