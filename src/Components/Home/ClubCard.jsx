import React from "react";
import { Link } from "react-router";
import { FiUsers, FiMapPin } from "react-icons/fi";

const ClubCard = ({ c }) => {
  const {
    _id,
    clubName,
    category,
    location,
    bannerImage,
    membershipFee,
    status,
  } = c || {};

  return (
    <Link
      to={`/club/${_id}`}
      className="
        col-span-1 cursor-pointer group 
        bg-white dark:bg-gray-900 
        border border-gray-200 dark:border-gray-700 
        rounded-xl shadow-sm dark:shadow-lg 
        hover:shadow-lg dark:hover:shadow-2xl
        transition-all duration-300 p-3
        flex flex-col gap-3
      "
    >
      {/* Banner Image */}
      <div className="relative w-full aspect-square overflow-hidden rounded-xl">
        <img
          src={bannerImage || "https://via.placeholder.com/300"}
          alt={`${clubName} Banner`}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ease-in-out"
        />
      </div>

      {/* Club Info */}
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          {clubName}
        </h2>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Category: {category || "General"}
        </span>
      </div>

      {/* Membership Fee & Location */}
      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-300 mt-2">
        <span className="flex items-center gap-1">
          <FiUsers /> {membershipFee === 0 ? "Free" : `$${membershipFee}`}
        </span>
        <span className="flex items-center gap-1">
          <FiMapPin /> {location || "Unknown"}
        </span>
      </div>

      {/* Status */}
      {status && status !== "approved" && (
        <div className="mt-2 text-xs text-red-500 font-semibold">
          {status.toUpperCase()}
        </div>
      )}
    </Link>
  );
};

export default ClubCard;
