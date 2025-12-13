import React from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loadingspinner from "../../../Components/Shared/Loadingspinner";

const EventRegistation = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: eventRegistrations = [],
    isLoading,
  } = useQuery({
    queryKey: ["eventRegistrations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/eventRegistrations");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loadingspinner />;
  }

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Event Registrations
      </h2>

      {/* Table for large screens */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table-auto w-full border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2 text-left">User Email</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Register Time</th>
            </tr>
          </thead>
          <tbody>
            {eventRegistrations.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No registrations found.
                </td>
              </tr>
            ) : (
              eventRegistrations.map((event, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{event.useremail}</td>
                  <td className="px-4 py-2 capitalize">{event.status}</td>
                  <td className="px-4 py-2">{event.regeesteredat}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Card layout for small screens */}
      <div className="md:hidden space-y-4">
        {eventRegistrations.length === 0 ? (
          <p className="text-center text-gray-500">No registrations found.</p>
        ) : (
          eventRegistrations.map((event, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-sm p-4 bg-white"
            >
              <p className="font-semibold text-gray-700">#{index + 1}</p>
              <p className="text-gray-800"><span className="font-semibold">Email:</span> {event.useremail}</p>
              <p className="text-gray-800"><span className="font-semibold">Status:</span> {event.status}</p>
              <p className="text-gray-800"><span className="font-semibold">Registered At:</span> {event.regeesteredat}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventRegistation;
