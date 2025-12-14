import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { FaUsers, FaCalendarAlt } from "react-icons/fa";
import Loadingspinner from "../../../Components/Shared/Loadingspinner";
import dayjs from "dayjs";

const StatCard = ({ title, value, icon: Icon, iconColor }) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
    </div>
    <div
      className={`w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center ${iconColor}`}
    >
      <Icon size={22} />
    </div>
  </div>
);

const Membersobeviews = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["member-summary"],
    queryFn: async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error("User not logged in");

      const token = await user.getIdToken(true);

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/member/summary`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },
  });

  if (isLoading) return <Loadingspinner />;
  if (isError)
    return (
      <p className="p-6 text-red-500">
        Failed to load summary: {error.message}
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-6 rounded-2xl">
      {/* Welcome Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome, {data?.userEmail.split("@")[0]}!
        </h1>
        <p className="text-sm text-gray-500">Here’s a quick overview of your activity.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <StatCard
          title="Clubs Joined"
          value={data?.totalClubsJoined || 0}
          icon={FaUsers}
          iconColor="text-[#0092b8]"
        />
        <StatCard
          title="Events Registered"
          value={data?.totalEventsRegistered || 0}
          icon={FaCalendarAlt}
          iconColor="text-indigo-600"
        />
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Events</h2>
        {data?.upcomingEvents?.length === 0 ? (
          <p className="text-gray-500">No upcoming events from your clubs.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {data.upcomingEvents.map((event) => (
              <li key={event._id} className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">{event.title}</p>
                  <p className="text-sm text-gray-500">
                    {event.location} — {dayjs(event.eventDate).format("DD MMM, YYYY")}
                  </p>
                </div>
                <span className="text-sm text-gray-500">{event.isPaid ? "Paid" : "Free"}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Membersobeviews;