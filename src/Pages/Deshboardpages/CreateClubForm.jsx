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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const imageFile = data.bannerImage[0];

      // Upload image to imgbb
      const formData = new FormData();
      formData.append("image", imageFile);

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

      await mutateAsync(clubInfo);
      reset();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create club!");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow-xl rounded-xl p-6 lg:p-10 space-y-6">
      <h2 className="text-2xl lg:text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6">
        Create a New Club
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Club Name */}
          <div className="form-control">
            <label className="label font-semibold text-gray-700 dark:text-gray-200">
              Club Name
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              placeholder="e.g. Mountain Hikers"
              {...register("clubName", { required: "Club Name is required" })}
            />
            {errors.clubName && (
              <p className="text-red-500 text-sm mt-1 dark:text-red-400">
                {errors.clubName.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="form-control">
            <label className="label font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
              <FiTag /> Category
            </label>
            <select
              className="select select-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
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
            {errors.category && (
              <p className="text-red-500 text-sm mt-1 dark:text-red-400">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Location */}
          <div className="form-control">
            <label className="label font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
              <FiMapPin /> Location
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              placeholder="e.g. New York, USA"
              {...register("location", { required: "Location is required" })}
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1 dark:text-red-400">
                {errors.location.message}
              </p>
            )}
          </div>

          {/* Membership Fee */}
          <div className="form-control">
            <label className="label font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
              <FiDollarSign /> Membership Fee
            </label>
            <input
              type="number"
              min={0}
              className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              placeholder="0 = Free"
              {...register("membershipFee", { required: "Membership fee required" })}
            />
            {errors.membershipFee && (
              <p className="text-red-500 text-sm mt-1 dark:text-red-400">
                {errors.membershipFee.message}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="form-control">
          <label className="label font-semibold text-gray-700 dark:text-gray-200">
            Description
          </label>
          <textarea
            rows={3}
            className="textarea textarea-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
            placeholder="Write a short description about your club..."
            {...register("description", { required: "Description is required" })}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1 dark:text-red-400">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Banner Image */}
        <div className="form-control">
          <label className="label font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
            <FiUpload /> Banner Image
          </label>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
            {...register("bannerImage", { required: "Image is required" })}
          />
          {errors.bannerImage && (
            <p className="text-red-500 text-sm mt-1 dark:text-red-400">
              {errors.bannerImage.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button className="btn btn-primary w-full mt-2 text-lg lg:text-xl py-2 lg:py-3">
          Create Club
        </button>
      </form>
    </div>
  );
};

export default CreateClubForm;
