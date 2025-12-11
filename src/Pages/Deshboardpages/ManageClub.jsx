import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { toast } from "react-toastify";

const ManageClub = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: clubs = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["Approve", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/clubs");
      return res.data;
    },
  });

  const handleclubaprove = async (club) => {
    const updatestatus = { status: "aproved" };
    await axiosSecure.patch(`/clubs/${club._id}/status`, updatestatus)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          toast.success("Club approved successfully!");
        }
      });
  };

  const handleclubreject = async (club) => {
    const updatestatus = { status: "rejected" };
    await axiosSecure.patch(`/clubs/${club._id}/status`, updatestatus)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          toast.success("Club rejected successfully!");
        }
      });
  };

  return (
    <div className="w-full">
      {/* For Desktop/Tablets */}
      <div className="hidden md:block overflow-x-auto rounded-lg ">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th>#</th>
              <th>Club Name</th>
              <th>Manager Email</th>
              <th>Status</th>
              <th>Membership Fee</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {clubs.map((club, index) => (
              <tr key={club._id}>
                <th>{index + 1}</th>
                <td>{club.clubName}</td>
                <td>{club.managerEmail}</td>
                <td className="capitalize font-semibold">{club.status}</td>
                <td>Free</td>

                <td className="flex flex-wrap gap-2">
                  {(club.status === "aproved" || club.status === "rejected") ? (
                    <button className="btn btn-sm btn-info">View Stats</button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleclubaprove(club)}
                        className="btn btn-sm btn-success"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => handleclubreject(club)}
                        className="btn btn-sm btn-error"
                      >
                        Reject
                      </button>

                      <button className="btn btn-sm btn-info">View Stats</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* For Mobile View: Card Layout */}
      <div className="md:hidden space-y-4 mt-4">
        {clubs.map((club, index) => (
          <div
            key={club._id}
            className="bg-white shadow-md rounded-lg p-4 border"
          >
            <h3 className="font-bold text-lg">{club.clubName}</h3>
            <p className="text-sm text-gray-600">
              Manager: {club.managerEmail}
            </p>
            <p className="text-sm mt-1">
              Status: <span className="font-semibold capitalize">{club.status}</span>
            </p>
            <p className="text-sm">Fee: Free</p>

            <div className="flex flex-col gap-2 mt-3">
              {(club.status === "aproved" || club.status === "rejected") ? (
                <button className="btn btn-sm btn-info">View Stats</button>
              ) : (
                <>
                  <button
                    onClick={() => handleclubaprove(club)}
                    className="btn btn-sm btn-success w-full"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleclubreject(club)}
                    className="btn btn-sm btn-error w-full"
                  >
                    Reject
                  </button>

                  <button className="btn btn-sm btn-info w-full">View Stats</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageClub;
