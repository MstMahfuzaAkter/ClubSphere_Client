import React from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import Loadingspinner from "../../../Components/Shared/Loadingspinner";
import { toast } from "react-toastify";

const EventManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedEvent, setSelectedEvent] = React.useState(null);

  const { register, handleSubmit, setValue, reset } = useForm();

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

  // Autofill form when event selected
  React.useEffect(() => {
    if (selectedEvent) {
      setValue("title", selectedEvent.title);
      setValue("location", selectedEvent.location);
      setValue("description", selectedEvent.description);
      setValue("eventDate", selectedEvent.eventDate);
    }
  }, [selectedEvent, setValue]);

  if (isLoading) return <Loadingspinner />;

  // PATCH update event
  const onSubmit = async (data) => {
    const res = await axiosSecure.patch(`/events/${selectedEvent._id}`, data);

    if (res.data.matchedCount) {
      toast.success("Event updated successfully");
      refetch();
    }
    reset();
    setSelectedEvent(null);
  };

  // Delete event
  const handleDelete = async (id) => {
    const res = await axiosSecure.delete(`/events/${id}`);
    if (res.data.deletedCount) {
      toast.success("Event deleted!");
      refetch();
    }
  };

  return (
    <div className="px-3 md:px-0">
      <h2 className="text-2xl font-bold mb-4 text-base-content">Event Management</h2>

      <Link to="/deshboard/manager/create-event">
        <button className="btn bg-orange-600 text-white my-4">Create Event</button>
      </Link>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table table-zebra bg-base-100 text-base-content">
          <thead>
            <tr className="text-base-content font-semibold">
              <th>#</th>
              <th>Title</th>
              <th>Location</th>
              <th>Description</th>
              <th>Created At</th>
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
                <td>{e.createdAt}</td>
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

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {events.map((e, index) => (
          <div
            key={e._id}
            className="p-4 shadow rounded-lg bg-base-100 border border-base-300 flex flex-col gap-2"
          >
            <p className="font-bold text-lg text-base-content">
              {index + 1}. {e.title}
            </p>

            <p className="text-sm text-base-content/90">
              <span className="font-semibold">Location:</span> {e.location}
            </p>

            <p className="text-sm text-base-content/80 line-clamp-3">
              <span className="font-semibold">Description:</span> {e.description}
            </p>

            <p className="text-sm text-base-content/80">
              <span className="font-semibold">Created:</span> {e.createdAt}
            </p>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setSelectedEvent(e)}
                className="btn btn-sm flex-1 bg-green-600 text-white"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(e._id)}
                className="btn btn-sm flex-1 bg-orange-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedEvent && (
        <dialog open className="modal">
          <div className="modal-box w-11/12 max-w-lg bg-base-100 text-base-content">
            <h3 className="font-bold text-lg mb-4">Edit Event</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <input
                {...register("title")}
                className="input input-bordered w-full bg-base-100"
                placeholder="Event Title"
              />

              <input
                {...register("location")}
                className="input input-bordered w-full bg-base-100"
                placeholder="Location"
              />

              <input
                {...register("eventDate")}
                type="date"
                className="input input-bordered w-full bg-base-100"
              />

              <textarea
                {...register("description")}
                className="textarea textarea-bordered w-full bg-base-100"
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
