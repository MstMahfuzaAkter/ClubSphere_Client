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
    await axiosSecure
      .patch(`/clubs/${club._id}/status`, updatestatus)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          toast.success("this rider is aproved now !!");
        }
      });
    refetch();
  };

  const handleclubreject = async(club) => {
    const updatestatus = { status: "rejected" };
     await axiosSecure
      .patch(`/clubs/${club._id}/status`, updatestatus)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          toast.success("this rider is rejected now !!");
        }
      });
    refetch();

  }




  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Club Name</th>
            <th>Manager Email</th>
            <th>Status</th>
            <th>Membership Fee</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clubs.map((club, index) => (
            <tr>
              <th>{index + 1}</th>
              <td>{club.clubName}</td>
              <td>{club.managerEmail}</td>
              <td>{club.status}</td>
              <td>free</td>
              <td className="flex gap-2">
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
                      className="btn btn-sm btn-error">
                    Reject</button>
                    <button className="btn btn-sm btn-info">View Stats</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageClub;
