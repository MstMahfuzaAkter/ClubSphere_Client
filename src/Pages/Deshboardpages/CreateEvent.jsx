import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const CreateEvent = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [selectedClub, setSelectedClub] = useState("Choose a Club");

  const { data: clubs = [] } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/clubs/approved-by-email");
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const isPaid = watch("isPaid");

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.post("/events", {
        ...data,
        isPaid: isPaid || false,
        eventFee: isPaid ? Number(data.eventFee) : 0,
        maxAttendees: data.maxAttendees ? Number(data.maxAttendees) : null,
        createdAt: new Date(),
        createdBy: user?.email,
      });

      if (res.data) {
        toast.success("Event created successfully!");
        reset();
        setSelectedClub("Choose a Club");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to create event");
    }
  };

  return (
    <div className="w-full max-w-md md:max-w-xl lg:max-w-3xl mx-auto bg-base-100 shadow-xl rounded-xl p-6 md:p-8 space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
        Create New Event
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Title */}
        <div>
          <label className="label font-semibold">Event Title</label>
          <input
            className="input input-bordered w-full"
            {...register("title", { required: "Event title is required" })}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Date */}
        <div>
          <label className="label font-semibold">Event Date</label>
          <input
            type="date"
            className="input input-bordered w-full"
            {...register("eventDate", { required: "Event date is required" })}
          />
        </div>

        {/* Club Dropdown */}
        <div>
          <label className="label font-semibold">Select Club</label>
          <details className="dropdown">
            <summary className="btn w-full text-left">{selectedClub}</summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box w-52 p-2 shadow-lg z-50">
              {clubs.map((club) => (
                <li key={club._id}>
                  <a
                    onClick={() => {
                      setSelectedClub(club.clubName);
                      setValue("clubId", club._id);
                    }}
                  >
                    {club.clubName}
                  </a>
                </li>
              ))}
            </ul>
          </details>

          {/* Hidden input */}
          <input type="hidden" {...register("clubId", { required: true })} />
          {errors.clubId && <p className="text-red-500 text-sm">Please select a club</p>}
        </div>

        {/* Location */}
        <div>
          <label className="label font-semibold">Location</label>
          <input
            className="input input-bordered w-full"
            {...register("location", { required: "Location is required" })}
          />
        </div>

        {/* Toggle Paid */}
        <div className="form-control">
          <label className="label cursor-pointer gap-3">
            <span className="font-semibold">Is this a paid event?</span>
            <input type="checkbox" className="toggle toggle-primary" {...register("isPaid")} />
          </label>
        </div>

        {/* Fee (show only if paid) */}
        {isPaid && (
          <div>
            <label className="label font-semibold">Event Fee</label>
            <input
              type="number"
              className="input input-bordered w-full"
              placeholder="Enter event fee"
              {...register("eventFee", { required: isPaid ? "Fee is required" : false })}
            />
            {errors.eventFee && <p className="text-red-500 text-sm">{errors.eventFee.message}</p>}
          </div>
        )}

        {/* Description */}
        <div>
          <label className="label font-semibold">Description</label>
          <textarea
            rows={4}
            className="textarea textarea-bordered w-full"
            {...register("description", { required: "Description is required" })}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        {/* Button */}
        <button className="btn btn-primary w-full text-lg">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
