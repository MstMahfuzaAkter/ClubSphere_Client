import React from "react";
import { Link } from "react-router";
import { FiCalendar, FiMapPin, FiDollarSign, FiUsers } from "react-icons/fi";

const EventCard = ({ event }) => {
  const {
    _id,
    title,
    description,
    eventDate,
    location,
    isPaid,
    eventFee,
    maxAttendees,
    createdAt,
  } = event || {};

  const formattedEventDate = eventDate
    ? new Date(eventDate).toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "TBD";

  const formattedCreatedAt = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <Link
      to={`/events/${_id}`}
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
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          {title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {description}
        </p>
        <span className="text-sm text-gray-500 dark:text-gray-300">
          Date: {formattedEventDate}
        </span>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-300 mt-2">
        <span className="flex items-center gap-1">
          <FiDollarSign /> {isPaid ? `$${eventFee}` : "Free"}
        </span>
        <span className="flex items-center gap-1">
          <FiMapPin /> {location || "Unknown"}
        </span>
      </div>

      <div className="flex justify-between items-center text-xs text-gray-400 dark:text-gray-500 mt-1">
        {maxAttendees && <span>Max: {maxAttendees}</span>}
        {formattedCreatedAt && <span>Created: {formattedCreatedAt}</span>}
      </div>
    </Link>
  );
};

export default EventCard;
