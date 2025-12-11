import React from "react";
import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Loadingspinner from "../../Components/Shared/Loadingspinner";
// import JoinClubSection from "../deshboardpages/JoinClubSection";

const ClubDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: club = {}, isLoading } = useQuery({
    queryKey: ["club", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loadingspinner></Loadingspinner>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* ✅ Banner */}
      <div className="relative h-56 sm:h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
        <img
          src={club.bannerImage}
          alt={club.clubName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white p-6">
            {club.clubName}
          </h2>
        </div>
      </div>

      {/* ✅ Info + Join Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* ✅ Club Info */}
        <div className="lg:col-span-2 bg-base-100 rounded-2xl shadow-md p-6 md:p-8">
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            {club.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="flex items-center gap-2">
              <span className="font-semibold">📍 Location:</span>
              <span>{club.location}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold">📂 Category:</span>
              <span className="badge badge-outline">{club.category}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold">💳 Membership Fee:</span>
              <span className="text-primary font-bold">
                {club.membershipFee === 0 ? "Free" : `$${club.membershipFee}`}
              </span>
            </div>
          </div>
        </div>

        {/* ✅ Join Club Section */}
        <div className="bg-base-100 rounded-2xl shadow-md p-6 h-fit sticky top-24">
          <h3 className="text-xl font-bold mb-2">Join This Club</h3>
          <p className="text-sm text-gray-500 mb-4">
            Become a member and join exclusive events & activities.
          </p>

          <Link to={`/clubs/${club._id}/membership`}>
            <button className="btn bg-[#0092b8] text-white w-full">Join Membership</button>
          </Link>

          {club?.alreadyMember && (
            <p className="text-success text-sm mt-3 font-medium">
              ✅ You are already a member
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;