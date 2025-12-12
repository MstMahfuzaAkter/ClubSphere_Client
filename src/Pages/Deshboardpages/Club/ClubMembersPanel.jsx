import React from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loadingspinner from "../../../Components/Shared/Loadingspinner";
import { toast } from "react-toastify";

const ClubMembersPanel = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: memberships = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["clubmembers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/membership");
      return res.data;
    },
  });

  const handleExpire = async (id) => {
    await axiosSecure.patch(`/membership/${id}/expire`).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        toast.success("Membership expired!");
      }
    });
  };

  if (isLoading) return <Loadingspinner />;

  return (
    <div className="p-4 md:p-6 bg-base-200 rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Club Members Panel</h2>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto rounded-xl">
        <table className="table table-zebra w-full">
          <thead className="bg-base-300 text-base">
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {memberships.map((m, idx) => (
              <tr key={m._id} className="hover:bg-base-100 transition">
                <th>{idx + 1}</th>

                <td className="break-words max-w-[220px]">{m.userEmail}</td>

                <td>
                  <span
                    className={`badge badge-md ${
                      m.status === "active"
                        ? "badge-success"
                        : "badge-error"
                    } text-white`}
                  >
                    {m.status}
                  </span>
                </td>

                <td>{m.createdAt}</td>

                <td>
                  <button
                    disabled={m.status === "expired"}
                    onClick={() => handleExpire(m._id)}
                    className={`btn btn-sm text-white ${
                      m.status === "active"
                        ? "bg-green-600 hover:bg-orange-600"
                        : "bg-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {m.status === "active" ? "Set Expired" : "Expired"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Responsive Card View */}
      <div className="md:hidden space-y-4 mt-4">
        {memberships.map((m, idx) => (
          <div
            key={m._id}
            className="bg-base-100 shadow-md rounded-xl p-4 border border-base-300"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg">Member #{idx + 1}</h3>
              <span
                className={`badge badge-sm ${
                  m.status === "active"
                    ? "badge-success"
                    : "badge-error"
                } text-white`}
              >
                {m.status}
              </span>
            </div>

            <p className="text-sm">
              <span className="font-semibold">Email:</span> {m.userEmail}
            </p>

            <p className="text-sm mt-1">
              <span className="font-semibold">Joined:</span> {m.createdAt}
            </p>

            <button
              disabled={m.status !== "active"}
              onClick={() => handleExpire(m._id)}
              className={`btn btn-sm mt-3 w-full text-white ${
                m.status === "active"
                  ? "bg-green-600 hover:bg-orange-600"
                  : "bg-gray-500 cursor-not-allowed"
              }`}
            >
              {m.status === "active" ? "Set Expired" : "Expired"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubMembersPanel;
