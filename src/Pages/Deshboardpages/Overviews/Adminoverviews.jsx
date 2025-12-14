import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { MdCardMembership } from "react-icons/md";
import { FcCheckmark } from "react-icons/fc";
import { MdPendingActions } from "react-icons/md";
import { FcCancel } from "react-icons/fc";
import {
  FaUsers,
  FaBuilding,
  FaCalendarAlt,
  FaDollarSign,
} from "react-icons/fa";
import Loadingspinner from "../../../Components/Shared/Loadingspinner";
import AdminChart from "./AdminChart";

/* ---------- Small Reusable Card ---------- */
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

const Adminoverviews = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin-summary"],
    queryFn: async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error("User not logged in");
      }

      // ✅ Firebase ID Token
      const token = await user.getIdToken(true);

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/summary`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    },
  });

  if (isLoading) {
    return <Loadingspinner></Loadingspinner>;
  }

  if (isError) {
    return (
      <p className="p-6 text-red-500">
        Failed to load summary: {error.message}
      </p>
    );
  }

  console.log(data);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-6 rounded-2xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Overview</h1>
        <p className="text-sm text-gray-500">
          System-wide statistics and recent activity
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={data?.users || 0}
          icon={FaUsers}
          iconColor="text-[#0092b8]"
        />
        <StatCard
          title="Total Clubs"
          value={data?.clubs?.total || 0}
          icon={FaBuilding}
          iconColor="text-purple-600"
        />
        <StatCard
          title="Total Events"
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
        <StatCard
          title="Total Membership"
          value={`$${data?.memberships || 0}`}
          icon={MdCardMembership}
          iconColor="text-orange-600"
        />
      </div>

      {/* Club Status Breakdown */}
      <div className="mt-6 bg-white p-4 rounded-2xl shadow-sm text-sm flex flex-wrap justify-start gap-4 sm:gap-6">
        <span className="flex flex-1 min-w-[200px] justify-center items-center text-xl sm:text-2xl gap-2">
          <FcCheckmark size={34} /> Approved Clubs: {data?.clubs?.approved || 0}
        </span>
        <span className="flex flex-1 min-w-[200px] justify-center items-center text-xl sm:text-2xl gap-2">
          <MdPendingActions size={34} /> Pending Clubs:{" "}
          {data?.clubs?.pending || 0}
        </span>
        <span className="flex flex-1 min-w-[200px] justify-center items-center text-xl sm:text-2xl gap-2">
          <FcCancel size={34} /> Rejected Clubs: {data?.clubs?.rejected || 0}
        </span>
      </div>

      {/* Analytics & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Chart Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm lg:col-span-2 flex flex-col">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Membership Growth
          </h2>
          <div className="flex-1 h-64 sm:h-80 md:h-96">
            <AdminChart />
          </div>
        </div>

        {/* Recent Activity */}
       {/*  <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Activity
          </h2>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>✔ New club approved</li>
            <li>💳 Payment received</li>
            <li>👤 New user registered</li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default Adminoverviews;