import React from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import Loadingspinner from "../../Components/Shared/Loadingspinner";
import useAuth from "../../Hook/useAuth";
import { toast } from "react-toastify";

const EventDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { user } = useAuth();

   
  const {
    data: event,
    isLoading,
    refetch: refetchEvent,
  } = useQuery({
    queryKey: ["eventdetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/events/${id}`);
      return res.data;
    },
  });

   
  const { data: registration, refetch: refetchRegistration } = useQuery({
    queryKey: ["userEventRegistration", id, user?.email],
    enabled: !!id && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/eventRegistrations/evnetid?evnetid=${id}&useremail=${user.email}`
      );
      return res.data;
    },
  });

  
  
  const handleRegister = async () => {
    const now = new Date();
    const bdTime = now.toLocaleString("en-US", { timeZone: "Asia/Dhaka" });

    const regData = {
      evnetid: id,
      useremail: user.email,
      clubId: event.clubId,
      status: "registered",
      paymentID: event?.paymentID || "free",
      regeesteredat: bdTime,
      eventWoner: event.createdBy,
    };

    try {
      const res = await axiosSecure.post("/eventRegistrations", regData);

      if (res.data?.success) {
        toast.success(res.data.message);
        refetchRegistration();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to register");
    }
  };

   
  const handleCancel = async () => {
    try {
      const res = await axiosSecure.patch(
        `/eventRegistrations/cancel?evnetid=${id}&useremail=${user.email}`
      );

      if (res.data?.success) {
        toast.success(res.data.message);
        refetchRegistration();  
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel");
    }
  };

  
  if (isLoading) return <Loadingspinner />;
  if (!event) return <p>No event found...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shadow-2xl shadow-amber-200">
        <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow">
          <p className="text-gray-700 leading-7 mb-5">{event.description}</p>

          <div className="space-y-3">
            <p>
              <b>📍 Location:</b> {event.location}
            </p>
            <p>
              <b>📅 Date:</b> {event.eventDate}
            </p>
            <p>
              <b>💰 Fee:</b> {event.isPaid ? `BDT ${event.eventFee}` : "Free"}
            </p>
            <p>
              <b>👤 Created By:</b> {event.createdBy}
            </p>
            <p>
              <b>⏰ Created At:</b> {new Date(event.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-bold mb-3">Join This Event</h3>
          <p className="text-gray-600 mb-4">Register now to join!</p>

          {registration ? (
            <button
              onClick={handleCancel}
              className="btn bg-orange-600 text-white w-full"
            >
              Cancel Registration
            </button>
          ) : (
            <button
              onClick={handleRegister}
              className="btn bg-[#0092b8]  text-white w-full"
            >
              Register Event
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;