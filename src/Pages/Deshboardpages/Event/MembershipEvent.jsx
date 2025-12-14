
import React from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loadingspinner from "../../../Components/Shared/Loadingspinner";

const MembershipEvent = () => {
  const axiosSecure = useAxiosSecure();

  const { data: eventmembers = [], isLoading } = useQuery({
    queryKey: ["eventmembers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/membersevent");
      console.log("Fetched eventmembers:", res.data); // debug
      return res.data;
    },
  });

  if (isLoading) {
    return <Loadingspinner />;
  }

  if (eventmembers.length === 0) {
    return <p className="text-center mt-4">You have no event activity yet.</p>;
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">My Event Activity Log</h3>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Event Title</th>
              <th>Club</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {eventmembers.map((event, index) => (
              <tr key={event._id || index}>
                <th>{index + 1}</th>
                <td>{event.eventtitle || "N/A"}</td>
                <td>{event.clubname || "N/A"}</td>
                <td>
                  {event.eventDate
                    ? new Date(event.eventDate).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="capitalize">{event.status || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MembershipEvent;
