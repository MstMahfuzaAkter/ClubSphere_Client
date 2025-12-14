import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";
import { toast } from "react-toastify";

const CreateEvent = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [selectedClub, setSelectedClub] = useState("Choose a club");

  
  const { data: clubs = [] } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/clubs/approved-by-email");
      return res.data;
    },
  });

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        isPaid: data.isPaid || false,
        eventFee: data.isPaid ? Number(data.eventFee) : 0,
        maxAttendees: data.maxAttendees ? Number(data.maxAttendees) : null,
        createdAt: new Date(),
        createdBy: user?.email,
      };

      const res = await axiosSecure.post("/events", payload);

      if (res.data) {
        toast.success("Event created successfully!");
        reset();
        setSelectedClub("Choose a club");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to create event");
    }
  };

  return (
    <div className="w-full max-w-md lg:max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-6 space-y-6">
      <h2 className="text-xl lg:text-3xl font-bold text-center">Create New Event</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Event Title */}
        <div className="form-control">
          <label className="label font-semibold">Event Title</label>
          <input
            className="input input-bordered w-full"
            {...register("title", { required: "Event title is required" })}
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>

        {/* Event Date */}
        <div className="form-control">
          <label className="label font-semibold">Event Date</label>
          <input
            type="date"
            className="input input-bordered w-full"
            {...register("eventDate", { required: "Event date is required" })}
          />
        </div>

        {/* Club Dropdown */}
        <div>
          <details className="dropdown">
            <summary className="btn w-full text-left">{selectedClub}</summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box w-52 p-2 shadow-lg">
              {clubs.map((club) => (
                <li key={club._id}>
                  <a
                    onClick={() => {
                      setSelectedClub(club.clubName);
                      setValue("clubId", club._id); // store club id
                      setValue("clubName", club.clubName); // optional: store club name
                    }}
                  >
                    {club.clubName}
                  </a>
                </li>
              ))}
            </ul>
          </details>

          {/* Hidden fields for form submission */}
          <input type="hidden" {...register("clubId", { required: true })} />
          <input type="hidden" {...register("clubName")} />

          {errors.clubId && <p className="text-red-500 text-sm">Please select a club</p>}
        </div>

        {/* Location */}
        <div className="form-control">
          <label className="label font-semibold">Location</label>
          <input
            className="input input-bordered w-full"
            {...register("location", { required: "Location is required" })}
          />
        </div>

        {/* Paid toggle */}
        <div className="form-control">
          <label className="label cursor-pointer gap-3">
            <span className="font-semibold">Is this a paid event?</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              {...register("isPaid")}
            />
          </label>
        </div>

        {/* Event Fee */}
        <div className="form-control">
          <label className="label font-semibold">Event Fee</label>
          <input
            type="number"
            className="input input-bordered w-full"
            placeholder="Enter fee (if free insert = 0)"
            {...register("eventFee")}
          />
        </div>

        {/* Description */}
        <div className="form-control">
          <label className="label font-semibold">Description</label>
          <textarea
            rows={3}
            className="textarea textarea-bordered w-full"
            {...register("description", { required: "Description is required" })}
          />
        </div>

        <button className="btn bg-orange-600 text-white font-semibold w-full">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;