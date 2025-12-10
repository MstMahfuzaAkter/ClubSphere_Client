import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiCalendar, FiMapPin, FiDollarSign, FiUsers } from "react-icons/fi";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";
import { toast } from "react-toastify";

const CreateEvent = ({ clubId }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [isPaid, setIsPaid] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const eventInfo = {
        clubId,
        title: data.title,
        description: data.description,
        eventDate: data.eventDate,
        location: data.location,
        isPaid: isPaid,
        eventFee: isPaid ? Number(data.eventFee) : 0,
        maxAttendees: data.maxAttendees ? Number(data.maxAttendees) : null,
        createdAt: new Date(),
        createdBy: user?.email
      };

      const res = await axiosSecure.post("/events", eventInfo);

      if (res.data.insertedId) {
        toast.success("Event created successfully ✅");
        reset();
        setIsPaid(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to create event ❌");
    }
  };

  return (
    <div className="w-full max-w-md lg:max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-6 lg:p-10 space-y-6">
      <h2 className="text-xl lg:text-3xl font-bold text-center">
        Create New Event
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 lg:space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">

          {/* Event Title */}
          <div className="form-control">
            <label className="label font-semibold">Event Title</label>
            <input
              className="input input-bordered w-full"
              placeholder="Photography Workshop"
              {...register("title", { required: "Event title is required" })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Event Date */}
          <div className="form-control">
            <label className="label font-semibold flex items-center gap-2">
              <FiCalendar /> Event Date
            </label>
            <input
              type="date"
              className="input input-bordered w-full"
              {...register("eventDate", { required: "Event date is required" })}
            />
          </div>

          {/* Location */}
          <div className="form-control">
            <label className="label font-semibold flex items-center gap-2">
              <FiMapPin /> Location
            </label>
            <input
              className="input input-bordered w-full"
              placeholder="Dhaka, Bangladesh"
              {...register("location", { required: "Location required" })}
            />
          </div>

          {/* Max Attendees */}
          <div className="form-control">
            <label className="label font-semibold flex items-center gap-2">
              <FiUsers /> Max Attendees
            </label>
            <input
              type="number"
              min={1}
              className="input input-bordered w-full"
              placeholder="Optional"
              {...register("maxAttendees")}
            />
          </div>
        </div>

        {/* Paid Toggle */}
        <div className="form-control">
          <label className="label cursor-pointer gap-3">
            <span className="label-text font-semibold">Is this a paid event?</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              onChange={(e) => setIsPaid(e.target.checked)}
            />
          </label>
        </div>

        {/* Event Fee */}
        {isPaid && (
          <div className="form-control">
            <label className="label font-semibold flex items-center gap-2">
              <FiDollarSign /> Event Fee
            </label>
            <input
              type="number"
              min={0}
              className="input input-bordered w-full"
              placeholder="Enter event fee"
              {...register("eventFee", { required: "Event fee required" })}
            />
          </div>
        )}

        {/* Description */}
        <div className="form-control">
          <label className="label font-semibold">Description</label>
          <textarea
            rows={3}
            className="textarea textarea-bordered w-full"
            {...register("description", { required: "Description required" })}
          />
        </div>

        <button className="btn btn-primary w-full text-lg py-3">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
