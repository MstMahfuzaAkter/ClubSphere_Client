import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { FaUsers, FaBuilding, FaCalendarAlt, FaDollarSign } from "react-icons/fa";
import Loadingspinner from "../../../Components/Shared/Loadingspinner";
import AdminChart from "./AdminChart"; // You can reuse the chart component

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

const Clubmangeroverviews = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["manager-summary"],
    queryFn: async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error("User not logged in");

      const token = await user.getIdToken(true);

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/manager/summary`,
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
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manager Overview</h1>
        <p className="text-sm text-gray-500">
          Summary of your clubs, members, events, and payments
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Your Clubs"
          value={data?.clubs || 0}
          icon={FaBuilding}
          iconColor="text-purple-600"
        />
        <StatCard
          title="Total Members"
          value={data?.members || 0}
          icon={FaUsers}
          iconColor="text-[#0092b8]"
        />
        <StatCard
          title="Your Events"
          value={data?.events || 0}
          icon={FaCalendarAlt}
          iconColor="text-indigo-600"
        />
        <StatCard
          title="Total Revenue"
          value={`$${data?.revenue || 0}`}
          icon={FaDollarSign}
          iconColor="text-orange-600"
        />
      </div>

      {/* Membership Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm lg:col-span-2 flex flex-col">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Membership Growth
          </h2>
          <div className="flex-1 h-64 sm:h-80 md:h-96">
            <AdminChart />
          </div>
        </div>

        {/* Optional Recent Activity */}
        {/* <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Activity
          </h2>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>✔ New member joined</li>
            <li>💳 Payment received</li>
            <li>📅 New event created</li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default Clubmangeroverviews;