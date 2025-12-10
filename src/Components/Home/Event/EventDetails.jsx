import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FiCalendar, FiMapPin, FiDollarSign, FiUsers } from "react-icons/fi";

const EventDetails = () => {
  const { id } = useParams();

  const { data: event, isLoading, error } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const res = await axios(`${import.meta.env.VITE_API_URL}/events/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading event details...</p>;
  if (error) return <p>Failed to load event details.</p>;
  if (!event) return <p>Event not found.</p>;

  const {
    title,
    description,
    eventDate,
    location,
    isPaid,
    eventFee,
    maxAttendees,
    createdAt,
    clubId,
  } = event;

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
    <div className="max-w-4xl mx-auto p-6 lg:p-10 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">{title}</h1>

      <div className="space-y-4 text-gray-700 dark:text-gray-300">
        <p>{description}</p>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <span className="flex items-center gap-1">
            <FiCalendar /> {formattedEventDate}
          </span>
          <span className="flex items-center gap-1">
            <FiMapPin /> {location || "Unknown"}
          </span>
          <span className="flex items-center gap-1">
            <FiDollarSign /> {isPaid ? `$${eventFee}` : "Free"}
          </span>
          {maxAttendees && (
            <span className="flex items-center gap-1">
              <FiUsers /> Max: {maxAttendees}
            </span>
          )}
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Created on: {formattedCreatedAt}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Club ID: {clubId}
        </p>
      </div>
    </div>
  );
};

export default EventDetails;
