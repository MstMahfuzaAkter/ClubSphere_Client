import React, { useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { FiMapPin, FiDollarSign, FiTag, FiUpload } from "react-icons/fi";


const MyClubs = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedClub, setSelectedClub] = useState(null);

  const { data: myclubs = [], refetch } = useQuery({
    queryKey: ["myclubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/myclubs");

      return res.data;
    },
  });


  const handleedit = async (data) => {
  try {
    let imageUrl = selectedClub.bannerImage;

    
    if (data.bannerImage && data.bannerImage[0]) {
      const formData = new FormData();
      formData.append("image", data.bannerImage[0]);

      const imgRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_HOST_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const imgData = await imgRes.json();
      imageUrl = imgData.data.url;
    }

    // ✅ Updated data object
    const updateClubInfo = {
      clubName: data.clubName,
      description: data.description,
      category: data.category,
      location: data.location,
      membershipFee: Number(data.membershipFee),
      bannerImage: imageUrl,
      updatedAt: new Date(),
    };

    // ✅ PATCH request
    const res = await axiosSecure.patch(
      `/clubs/${selectedClub._id}`,
      updateClubInfo
    );

    if (res.data.modifiedCount > 0) {
      Swal.fire("Success", "Club updated successfully", "success");
      refetch();

      document.getElementById("my_modal_5").close();
      setSelectedClub(null);

    
    }
  } catch (error) {
    console.error(error);
    Swal.fire("Error", "Failed to update club", "error");
  }
};


/* handle delete here */

const handleDelete = async (id) => {
  const confirm = await Swal.fire({
    title: "Are you sure?",
    text: "This club will be deleted permanently!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });

  if (!confirm.isConfirmed) return;

  try {
    const res = await axiosSecure.delete(`/clubs/${id}`);

    if (res.data.deletedCount > 0) {
      Swal.fire("Deleted!", "Club has been deleted.", "success");

      
      refetch();
    }
  } catch (error) {
    console.error(error);
    Swal.fire("Error", "Failed to delete club", "error");
  }
};


  /* use react hook form */

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  // console.log(myclubs);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Clubs</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Location</th>
              <th>Membership Fee</th>
              <th>Category</th>
              <th>Banner</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {myclubs.map((club, index) => (
              <tr key={club._id}>
                <th>{index + 1}</th>
                <td>{club.clubName}</td>
                <td>{club.description || "N/A"}</td>
                <td>{club.location || "N/A"}</td>
                <td>
                  {club.membershipFee === 0 ? "Free" : `$${club.membershipFee}`}
                </td>
                <td>{club.category || "N/A"}</td>
                <td>
                  {club.bannerImage ? (
                    <img
                      src={club.bannerImage}
                      alt={club.clubName}
                      className="w-20 h-12 object-cover rounded"
                    />
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="flex gap-2">
                  <td className="flex gap-2">
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => {
                        setSelectedClub(club);
                        document.getElementById("my_modal_5").showModal();
                      }}
                    >
                      Edit
                    </button>

                    <button onClick={() => handleDelete(club._id)} className="btn btn-sm btn-error">Delete</button>
                  </td>

                  
                </td>
              </tr>
            ))}

            {myclubs.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  No clubs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Link to="/deshboard/manager/create-club">
        <div className="mt-4">
          <button className="btn bg-orange-600 text-white font-bold">
            Create New Club
          </button>
        </div>
      </Link>

      {/* club modal here */}

      {/* Open the modal using document.getElementById('ID').showModal() method */}
       <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-3">Edit Club</h3>

        {selectedClub ? (
          <form
           onSubmit={handleSubmit(handleedit)}
           
            className="space-y-4 lg:space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

              {/* Club Name */}
              <div className="form-control">
                <label className="label font-semibold">Club Name</label>
                <input
                  className="input input-bordered w-full"
                  {...register("clubName", { required: "Club Name is required" })}
                />
                {errors.clubName && (
                  <p className="text-red-500 text-sm">
                    {errors.clubName.message}
                  </p>
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
                  <p className="text-red-500 text-sm">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Location */}
              <div className="form-control">
                <label className="label font-semibold flex items-center gap-2">
                  <FiMapPin /> Location
                </label>
                <input
                  className="input input-bordered w-full"
                  {...register("location", { required: "Location is required" })}
                />
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
                  {...register("membershipFee", {
                    required: "Membership fee required",
                  })}
                />
              </div>
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label font-semibold">Description</label>
              <textarea
                rows={3}
                className="textarea textarea-bordered w-full"
                {...register("description", {
                  required: "Description is required",
                })}
              ></textarea>
            </div>

            {/* Banner Image (optional on edit) */}
            <div className="form-control">
              <label className="label font-semibold flex items-center gap-2">
                <FiUpload /> Change Banner (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full"
                {...register("bannerImage")}
              />
            </div>

            {/* Buttons */}
            <div className="modal-action">
              <button type="submit" className="btn btn-success">
                Update
              </button>
              <button
                type="button"
                className="btn"
                onClick={() =>
                  document.getElementById("my_modal_5").close()
                }
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <Loadingspinner></Loadingspinner>
        )}
      </div> 
    </dialog>

     
    </div>
  );
};

export default MyClubs;