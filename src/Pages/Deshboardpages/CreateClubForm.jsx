import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FiUpload, FiMapPin, FiTag, FiDollarSign } from "react-icons/fi";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

const CreateClubForm = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { mutateAsync, reset: mutationReset } = useMutation({
    mutationFn: async (payload) => axiosSecure.post("/club", payload),
    onSuccess: () => {
      toast.success("Your club was created successfully!");
      mutationReset();
    },
    onError: () => toast.error("Something went wrong!"),
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const imageFile = data.bannerImage[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_HOST_KEY}`;
      const imgRes = await axios.post(imgUrl, formData);
      const imageUrl = imgRes.data.data.url;

      const payload = {
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

      await mutateAsync(payload);
      reset();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create club!");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto shadow-xl rounded-xl p-6 lg:p-10 space-y-6
      bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700
    ">
      <h2 className="text-3xl lg:text-4xl font-bold text-center
        text-gray-800 dark:text-gray-100 mb-6
      ">
        Create a New Club
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Club Name */}
          <div>
            <label className="label font-semibold text-gray-700 dark:text-gray-200">
              Club Name
            </label>
            <input
              type="text"
              placeholder="e.g. Mountain Hikers"
              className="input input-bordered w-full
                bg-gray-50 dark:bg-gray-800
                text-gray-800 dark:text-gray-100
                placeholder-gray-400 dark:placeholder-gray-300
                border-gray-300 dark:border-gray-600
                focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
              "
              {...register("clubName", { required: "Club Name is required" })}
            />
            {errors.clubName && <p className="text-red-500 text-sm mt-1">{errors.clubName.message}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="label font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
              <FiTag /> Category
            </label>
            <select
              className="select select-bordered w-full
                bg-gray-50 dark:bg-gray-800
                text-gray-800 dark:text-gray-100
                placeholder-gray-400 dark:placeholder-gray-300
                border-gray-300 dark:border-gray-600
                focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
              "
              {...register("category", { required: "Category is required" })}
            >
              <option value="">Select Category</option>
              <option>Photography</option>
              <option>Sports</option>
              <option>Tech</option>
              <option>Hiking</option>
              <option>Music</option>
              <option>Gaming</option>
              <option>Book</option>
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
          </div>

          {/* Location */}
          <div>
            <label className="label font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
              <FiMapPin /> Location
            </label>
            <input
              type="text"
              placeholder="e.g. Dhaka, Bangladesh"
              className="input input-bordered w-full
                bg-gray-50 dark:bg-gray-800
                text-gray-800 dark:text-gray-100
                placeholder-gray-400 dark:placeholder-gray-300
                border-gray-300 dark:border-gray-600
                focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
              "
              {...register("location", { required: "Location is required" })}
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
          </div>

          {/* Membership Fee */}
          <div>
            <label className="label font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
              <FiDollarSign /> Membership Fee
            </label>
            <input
              type="number"
              min={0}
              placeholder="0 = Free"
              className="input input-bordered w-full
                bg-gray-50 dark:bg-gray-800
                text-gray-800 dark:text-gray-100
                placeholder-gray-400 dark:placeholder-gray-300
                border-gray-300 dark:border-gray-600
                focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
              "
              {...register("membershipFee", { required: "Membership fee is required" })}
            />
            {errors.membershipFee && <p className="text-red-500 text-sm mt-1">{errors.membershipFee.message}</p>}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="label font-semibold text-gray-700 dark:text-gray-200">Description</label>
          <textarea
            rows="3"
            placeholder="Write a short description about your club..."
            className="textarea textarea-bordered w-full
              bg-gray-50 dark:bg-gray-800
              text-gray-800 dark:text-gray-100
              placeholder-gray-400 dark:placeholder-gray-300
              border-gray-300 dark:border-gray-600
              focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
            "
            {...register("description", { required: "Description is required" })}
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>

        {/* Banner Image */}
        <div>
          <label className="label font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
            <FiUpload /> Banner Image
          </label>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full
              bg-gray-50 dark:bg-gray-800
              text-gray-800 dark:text-gray-100
              placeholder-gray-400 dark:placeholder-gray-300
              border-gray-300 dark:border-gray-600
              focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
            "
            {...register("bannerImage", { required: "Image is required" })}
          />
          {errors.bannerImage && <p className="text-red-500 text-sm mt-1">{errors.bannerImage.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn w-full py-3 text-lg font-semibold
            bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600
            focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
            transition-colors duration-200
          "
        >
          Create Club
        </button>
      </form>
    </div>
  );
};

export default CreateClubForm;
