import React from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FiDollarSign, FiMapPin, FiTag } from "react-icons/fi";

const Clubs = () => {
  const axiosSecure = useAxiosSecure();
  const { data: clubs = [] } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/clubs/approved");
      return res.data;
    },
  });

  return (
    <div>
      <div>
        <div className="flex items-center gap-3 mb-4">
          <FiTag className="text-2xl text-primary" />
          <h2 className="text-2xl font-bold">Club List</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-6">
        {clubs.map((club) => (
          <div className="card border-2 border-black bg-white shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-200">
            <figure className="h-48 w-full overflow-hidden">
              <img
                src={club.bannerImage}
                alt={club.clubName}
                className="w-full h-full object-cover"
              />
            </figure>

            <div className="card-body space-y-2">
              <h2 className="card-title text-xl font-bold">{club.clubName}</h2>

              <p className="text-gray-600 text-sm">
                {club.description?.slice(0, 90)}...
              </p>

              <div className="flex justify-between items-center text-sm mt-3">
                <span className="flex items-center gap-1 text-gray-700">
                  <FiMapPin className="text-blue-600" />
                  {club.location}
                </span>

                <span className="flex items-center gap-1 font-semibold">
                  <FiDollarSign className="text-green-600" />
                  {club.membershipFee === 0 ? "Free" : `$${club.membershipFee}`}
                </span>
              </div>

              <div className="mt-3">
                <span className="badge bg-orange-600 font-bold px-4 py-3 text-xs">
                  {club.category}
                </span>
              </div>

              <div className="card-actions justify-end mt-3">
                <button className="btn btn-outline btn-primary btn-sm">
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
