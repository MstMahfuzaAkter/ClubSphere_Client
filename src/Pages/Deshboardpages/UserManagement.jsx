import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Loadingspinner from "../../Components/Shared/Loadingspinner";
import { toast } from "react-toastify";
import { FaUserShield, FaUsers, FaUserTie } from "react-icons/fa";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  if (isLoading) return <Loadingspinner />;

  const confirmRoleChange = (user, role) => {
    toast.info(
      ({ closeToast }) => (
        <div>
          <p className="mb-2 font-semibold">
            Make <span className="text-orange-500">{user.name}</span> a{" "}
            <span className="text-teal-500">{role}</span>?
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                handleRoleChange(user, role);
                closeToast();
              }}
              className="btn btn-xs btn-success"
            >
              Yes
            </button>

            <button onClick={closeToast} className="btn btn-xs btn-error">
              Cancel
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  const handleRoleChange = async (user, role) => {
    if (user.role === role) return;

    try {
      const res = await axiosSecure.patch(`/users/${user._id}`, { role });

      if (res.data.modifiedCount > 0) {
        toast.success(`Role updated to ${role}`);
        refetch();
      }
    } catch (err) {
      toast.error("Failed to update role");
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">
        Total Users: {users.length}
      </h3>

      {/* ---------- DESKTOP VIEW ---------- */}
      <div className="hidden md:block overflow-x-auto rounded-xl ">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, i) => (
              <tr key={user._id}>
                <th>{i + 1}</th>
                <td>{user.name}</td>
                <td className="break-all">{user.email}</td>
                <td className="capitalize">{user.role}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>

                <td className="flex gap-2">
                  <button
                    disabled={user.role === "admin"}
                    onClick={() => confirmRoleChange(user, "admin")}
                    className="btn btn-xs btn-error"
                  >
                    <FaUserShield />
                  </button>

                  <button
                    disabled={user.role === "clubManager"}
                    onClick={() => confirmRoleChange(user, "clubManager")}
                    className="btn btn-xs btn-warning"
                  >
                    <FaUserTie />
                  </button>

                  <button
                    disabled={user.role === "member"}
                    onClick={() => confirmRoleChange(user, "member")}
                    className="btn btn-xs btn-info"
                  >
                    <FaUsers />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------- MOBILE VIEW ---------- */}
      <div className="md:hidden space-y-4 mt-4">
        {users.map((user, i) => (
          <div
            key={user._id}
            className="bg-base-100 border rounded-xl p-4 shadow"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg">{user.name}</h3>
              <span className="text-sm opacity-70">#{i + 1}</span>
            </div>

            <p className="text-sm break-all">📧 {user.email}</p>
            <p className="text-sm mt-1">🎖 Role: {user.role}</p>
            <p className="text-sm">
              📅 Joined: {new Date(user.createdAt).toLocaleDateString()}
            </p>

            <div className="grid grid-cols-3 gap-2 mt-3">
              <button
                disabled={user.role === "admin"} 
                onClick={() => confirmRoleChange(user, "admin")}
                className="btn btn-xs w-full btn-error "
              >
                <FaUserShield />
              </button>

              <button
                disabled={user.role === "clubManager"}
                onClick={() => confirmRoleChange(user, "clubManager")}
                className="btn btn-xs w-full btn-warning"
              >
                <FaUserTie />
              </button>

              <button
                disabled={user.role === "member"}
                onClick={() => confirmRoleChange(user, "member")}
                className="btn btn-xs w-full btn-info"
              >
                <FaUsers />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
