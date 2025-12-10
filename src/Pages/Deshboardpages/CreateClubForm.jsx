import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FiUpload, FiMapPin, FiTag, FiDollarSign } from "react-icons/fi";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";
import { toast } from "react-toastify";

const CreateClubForm = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const imageFile = data.bannerImage[0];

      // Upload image to imgbb
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgUrl = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMG_HOST_KEY
      }`;

      const imgRes = await axios.post(imgUrl, formData);
      const imageUrl = imgRes.data.data.url;

      console.log(imageUrl);

      // Create club data
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



      axiosSecure.post('/club', clubInfo)
      .then(res => {
        if(res.data.insertedId){
            console.log("club created in database");
        }
      })

      
      
      toast.success("your club create sucessfull !!");

      reset();

    } catch (err) {
      console.error(err);
      toast.error("smothing went wrong !!");
    }
  };

  return (
    <div
      className="
        w-full 
        max-w-md 
        lg:max-w-3xl 
        mx-auto 
        bg-white 
        shadow-xl 
        rounded-xl 
        p-6 
        lg:p-10 
        space-y-6
      "
    >
      <h2 className="text-xl lg:text-3xl font-bold text-center">
        Create a New Club
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 lg:space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">

          {/* Club Name */}
          <div className="form-control">
            <label className="label font-semibold">Club Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="e.g. Mountain Hikers"
              {...register("clubName", { required: "Club Name is required" })}
            />
            {errors.clubName && (
              <p className="text-red-500 text-sm">{errors.clubName.message}</p>
            )}
          </div>

          {/* Category */}
          <div className="form-control">
            <label className="label font-semibold flex items-center gap-2">
              <FiTag /> Category
            </label>
            <select
              className="select select-bordered w-full"
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
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          {/* Location */}
          <div className="form-control">
            <label className="label font-semibold flex items-center gap-2">
              <FiMapPin /> Location
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="e.g. New York, USA"
              {...register("location", { required: "Location is required" })}
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location.message}</p>
            )}
          </div>

          {/* Membership Fee */}
          <div className="form-control">
            <label className="label font-semibold flex items-center gap-2">
              <FiDollarSign /> Membership Fee
            </label>
            <input
              type="number"
              min={0}
              className="input input-bordered w-full"
              placeholder="0 = Free"
              {...register("membershipFee", { required: "Membership fee required" })}
            />
            {errors.membershipFee && (
              <p className="text-red-500 text-sm">{errors.membershipFee.message}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="form-control">
          <label className="label font-semibold">Description</label>
          <textarea
            rows={3}
            className="textarea textarea-bordered w-full"
            placeholder="Write a short description about your club..."
            {...register("description", { required: "Description is required" })}
          ></textarea>

          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Banner Image */}
        <div className="form-control">
          <label className="label font-semibold flex items-center gap-2">
            <FiUpload /> Banner Image
          </label>

          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            {...register("bannerImage", { required: "Image is required" })}
          />

          {errors.bannerImage && (
            <p className="text-red-500 text-sm">{errors.bannerImage.message}</p>
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
