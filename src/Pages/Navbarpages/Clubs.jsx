import React from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FiDollarSign, FiMapPin, FiTag } from "react-icons/fi";
import { useNavigate } from "react-router";
import Loadingspinner from "../../Components/Shared/Loadingspinner";

const Clubs = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/clubs/approved");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loadingspinner></Loadingspinner>;
  }

  return (
    <div>

      
      <div className="flex items-center gap-3 mb-4">
        <FiTag className="text-2xl text-primary" />
        <h2 className="text-2xl font-bold">Club List</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-6">
        {clubs.map((club) => (
          <div
            key={club._id}
            className="card  bg-white shadow-xl rounded-xl overflow-hidden"
          >
            <figure className="h-48 w-full">
              <img
                src={club.bannerImage}
                alt={club.clubName}
                className="w-full h-full object-cover"
              />
            </figure>

            <div className="card-body space-y-2">
              <h2 className="card-title">{club.clubName}</h2>

              <p className="text-sm text-gray-600">
                {club.description?.slice(0, 90)}...
              </p>

              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-1">
                  <FiMapPin />
                  {club.location}
                </span>

                <span className="flex items-center gap-1 font-semibold">
                  <FiDollarSign />
                  {club.membershipFee === 0
                    ? "Free"
                    : `$${club.membershipFee}`}
                </span>
              </div>

              <div>
                <span className="badge bg-[#0092b8] p-2 text-white">
                  {club.category}
                </span>
              </div>

              <div className="card-actions justify-end">
                <button
                  onClick={() => navigate(`/club/${club._id}`)}
                  className="btn btn-outline btn-primary btn-sm"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clubs;