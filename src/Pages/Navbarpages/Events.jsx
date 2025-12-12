import React from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FiMapPin, FiDollarSign } from "react-icons/fi";
import { useNavigate } from "react-router";
import Loadingspinner from "../../Components/Shared/Loadingspinner";

const Events = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axiosSecure.get("/Events"); // added await
      return res.data;
    },
  });

  if (isLoading) return <Loadingspinner></Loadingspinner>;

  return (
    <div className="grid grid-cols-1 my-5 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((event) => (
        <div
          key={event._id}
          className="card border-2 border-gray-200 bg-white shadow-2xl rounded-2xl overflow-hidden hover:shadow-orange-300 transition-shadow duration-300"
        >
         {/*  <figure className="h-60 w-full overflow-hidden">
            <img
              src={event.eventImage || "https://via.placeholder.com/400x300"}
              alt={event.title}
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
            />
          </figure> */}

          <div className="card-body space-y-4 p-6">
            <h2 className="card-title text-xl lg:text-2xl font-bold">
              {event.title}
            </h2>

            <p className="text-sm text-gray-600">
              {event.description?.slice(0, 120)}...
            </p>

            <div className="flex justify-between text-sm font-medium">
              <span className="flex items-center gap-1 text-gray-700">
                <FiMapPin className="text-orange-500" />
                {event.location}
              </span>

              <span className="flex items-center gap-1 text-gray-700">
                <FiDollarSign className="text-orange-500" />
                {event.isPaid ? `$${event.eventFee}` : "Free"}
              </span>
            </div>

            {/* New Info: Event Date and Created By */}
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>
                <strong>Date:</strong>{" "}
                {new Date(event.eventDate).toLocaleDateString()}
              </span>
              <span> 
                <strong className="pl-2.5">By:</strong> {event.createdBy}
              </span>
            </div>

            <div className="card-actions justify-end mt-4">
              <button
                onClick={() => navigate(`/events/${event._id}`)}
                className="btn bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg w-full"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Events;