import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import Loadingspinner from "../../../Components/Shared/Loadingspinner";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const EventManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedEvent, setSelectedEvent] = useState(null);

  const { register, handleSubmit, setValue, reset } = useForm();

  // ================= FETCH EVENTS =================
  const {
    data: events = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axiosSecure.get("/event/by-wonermail");
      return res.data;
    },
  });

  // ================= AUTOFILL EDIT FORM =================
  useEffect(() => {
    if (selectedEvent) {
      setValue("title", selectedEvent.title);
      setValue("location", selectedEvent.location);
      setValue("description", selectedEvent.description);
      setValue("eventDate", selectedEvent.eventDate);
    }
  }, [selectedEvent, setValue]);

  if (isLoading) return <Loadingspinner />;

  // ================= UPDATE EVENT =================
  const onSubmit = async (data) => {
    const res = await axiosSecure.patch(
      `/events/${selectedEvent._id}`,
      data
    );

    if (res.data.modifiedCount) {
      toast.success("Event updated successfully");
      refetch();
      reset();
      setSelectedEvent(null);
    }
  };

  // ================= DELETE EVENT =================
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const res = await axiosSecure.delete(`/events/${id}`);
      if (res.data.deletedCount) {
        Swal.fire("Deleted!", "Event has been deleted.", "success");
        refetch();
      }
    }
  };

  // ================= JSX =================
  return (
    <div className="px-3 sm:px-4 md:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">
          Event Management
        </h2>

        <Link to="/deshboard/manager/create-event">
          <button className="btn bg-[#0092b8] text-white w-full sm:w-auto">
            Create Event
          </button>
        </Link>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="table table-zebra bg-base-100">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Location</th>
              <th>Description</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {events.map((e, index) => (
              <tr key={e._id}>
                <td>{index + 1}</td>
                <td>{e.title}</td>
                <td>{e.location}</td>
                <td className="max-w-xs truncate">{e.description}</td>
                <td>
                  {new Date(e.createdAt).toLocaleDateString()}
                </td>
                <td className="flex gap-2">
                  <button
                    onClick={() => setSelectedEvent(e)}
                    className="btn btn-xs bg-green-600 text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(e._id)}
                    className="btn btn-xs bg-orange-600 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE + TABLET CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4">
        {events.map((e, index) => (
          <div
            key={e._id}
            className="p-4 rounded-xl shadow-sm border bg-base-100 flex flex-col gap-2"
          >
            <p className="font-bold text-lg">
              {index + 1}. {e.title}
            </p>

            <p className="text-sm">
              <span className="font-semibold">Location:</span>{" "}
              {e.location}
            </p>

            <p className="text-sm line-clamp-3">
              <span className="font-semibold">Description:</span>{" "}
              {e.description}
            </p>

            <p className="text-xs opacity-70">
              Created:{" "}
              {new Date(e.createdAt).toLocaleDateString()}
            </p>

            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <button
                onClick={() => setSelectedEvent(e)}
                className="btn btn-sm bg-green-600 text-white flex-1"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(e._id)}
                className="btn btn-sm bg-[#0092b8] text-white flex-1"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= EDIT MODAL ================= */}
      {selectedEvent && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box w-full sm:max-w-lg">
            <h3 className="font-bold text-lg mb-4">Edit Event</h3>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-3"
            >
              <input
                {...register("title")}
                className="input input-bordered w-full"
                placeholder="Event Title"
              />

              <input
                {...register("location")}
                className="input input-bordered w-full"
                placeholder="Location"
              />

              <input
                type="date"
                {...register("eventDate")}
                className="input input-bordered w-full"
              />

              <textarea
                {...register("description")}
                className="textarea textarea-bordered w-full"
                placeholder="Description"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedEvent(null)}
                  className="btn"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default EventManagement;
