import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router";
import Loadingspinner from "../Shared/Loadingspinner";

const ClubDetails = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false); // if you want to use a modal later

  const { data: club = {}, isLoading } = useQuery({
    queryKey: ["club", id],
    queryFn: async () => {
      const res = await axios(`${import.meta.env.VITE_API_URL}/clubs/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loadingspinner/>;

  const {
    bannerImage,
    clubName,
    description,
    category,
    location,
    membershipFee,
    status,
  } = club;

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col lg:flex-row gap-8">
      {/* Banner */}
      <div className="flex-1">
        <img
          src={bannerImage || "https://via.placeholder.com/600x400"}
          alt={clubName}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      {/* Club Info */}
      <div className="flex-1 flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          {clubName}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
        <p className="text-gray-500 dark:text-gray-400">Category: {category}</p>
        <p className="text-gray-500 dark:text-gray-400">
          Location: {location || "Unknown"}
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          Membership Fee: {membershipFee === 0 ? "Free" : `$${membershipFee}`}
        </p>
        {status && status !== "approved" && (
          <p className="text-red-500 font-semibold">Status: {status.toUpperCase()}</p>
        )}
      </div>
    </div>
  );
};

export default ClubDetails;
