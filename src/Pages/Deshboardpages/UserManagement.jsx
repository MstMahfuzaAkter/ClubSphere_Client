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

            <button
              onClick={closeToast}
              className="btn btn-xs btn-error"
            >
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
    <div>
      <h3 className="text-lg font-semibold mb-4">
        Total Users: {users.length}
      </h3>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>

              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>


                <td>{new Date(user.createdAt).toLocaleDateString()}</td>

                <td className="flex gap-2">
                  {/* Admin */}
                  <button
                    disabled={user.role === "admin"}
                    onClick={() => confirmRoleChange(user, "admin")}
                    className="btn btn-xs btn-error"
                    title="Make Admin"
                  >
                    <FaUserShield size={18} />
                  </button>

                  {/* Club Manager */}
                  <button
                    disabled={user.role === "clubManager"}
                    onClick={() =>
                      confirmRoleChange(user, "clubManager")
                    }
                    className="btn btn-xs btn-warning"
                    title="Make Club Manager"
                  >
                    <FaUserTie size={18} />
                  </button>

                  {/* Member */}
                  <button
                    disabled={user.role === "member"}
                    onClick={() => confirmRoleChange(user, "member")}
                    className="btn btn-xs btn-info"
                    title="Make Member"
                  >
                    <FaUsers size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
