import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import useAuth from "../../../Hook/useAuth";

const MemberEvents = () => {
  const { user } = useAuth();

  // Fetch all upcoming events
  const { data: events = [], refetch } = useQuery(["events"], async () => {
    const res = await axios.get("/events"); 
    return res.data;
  });

  // Handle registration
  const handleRegister = async (eventId) => {
    try {
      const res = await axios.post("/events/register", {
        eventId,
        userEmail: user?.email,
      });

      if (res.data.success) {
        toast.success("Registered successfully ✅");
        refetch(); // refresh events if needed
      } else {
        toast.error(res.data.message || "Failed to register ❌");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error during registration ❌");
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold text-center mb-4">Upcoming Events</h2>

      {events.length === 0 && <p className="text-center">No upcoming events.</p>}

      {events.map((event) => (
        <div
          key={event._id}
          className="border p-4 rounded shadow flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
        >
          <div>
            <h3 className="font-bold text-lg">{event.title}</h3>
            <p>{event.description}</p>
            <p>Date: {new Date(event.eventDate).toLocaleString()}</p>
            <p>Location: {event.location}</p>
            <p>{event.isPaid ? `$${event.eventFee}` : "Free"}</p>
            {event.maxAttendees && <p>Max Attendees: {event.maxAttendees}</p>}
          </div>

          <button
            className="btn btn-primary btn-sm mt-2 lg:mt-0"
            onClick={() => handleRegister(event._id)}
          >
            Register
          </button>
        </div>
      ))}
    </div>
  );
};

export default MemberEvents;
