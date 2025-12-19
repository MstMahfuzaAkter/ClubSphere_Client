import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Loadingspinner from "../../Components/Shared/Loadingspinner";
import { toast } from "react-toastify";
import { FaUserShield, FaUsers, FaUserTie } from "react-icons/fa";
import { motion } from "framer-motion";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch, isLoading } = useQuery({
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
        <div className=" p-1">
          <p className="mb-3 text-sm font-medium">
            Change <span className="font-black text-[#007a99]">{user.name}</span>'s role to <span className="font-black capitalize">{role}</span>?
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => { handleRoleChange(user, role); closeToast(); }}
              className="px-3 py-1 bg-[#007a99] text-white text-xs font-bold rounded-lg"
            >
              Confirm
            </button>
            <button
              onClick={closeToast}
              className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { autoClose: false, icon: false }
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
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className=""
    >
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h3 className="text-2xl font-black text-slate-800 tracking-tight">User Management</h3>
          <p className="text-sm text-slate-400 font-medium">Control user permissions and roles</p>
        </div>
        <div className="px-5 py-2 bg-[#007a99]/10 text-[#007a99] rounded-2xl text-xs font-black uppercase tracking-widest border border-[#007a99]/20">
          Total: {users.length} Users
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-separate border-spacing-y-0">
            {/* Table Head */}
            <thead className="bg-slate-50/50">
              <tr className="text-slate-400 border-none">
                <th className="py-5 pl-8 text-[10px] font-black uppercase tracking-[0.1em]">No.</th>
                <th className="py-5 text-[10px] font-black uppercase tracking-[0.1em]">User Info</th>
                <th className="py-5 text-[10px] font-black uppercase tracking-[0.1em]">Current Role</th>
                <th className="py-5 text-[10px] font-black uppercase tracking-[0.1em]">Joined Date</th>
                <th className="py-5 text-[10px] font-black uppercase tracking-[0.1em] text-center">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-50">
              {users.map((user, index) => (
                <tr key={user._id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="pl-8 font-bold text-slate-400 text-sm">{index + 1}</td>
                  <td className="py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800 text-sm">{user.name}</span>
                      <span className="text-xs text-slate-400 font-medium">{user.email}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest
                      ${user.role === 'admin' ? 'bg-red-50 text-red-500 border border-red-100' : 
                        user.role === 'clubManager' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 
                        'bg-blue-50 text-blue-600 border border-blue-100'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="text-slate-500 text-xs font-semibold">
                    {new Date(user.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="py-4">
                    <div className="flex justify-center gap-2">
                      {/* Make Admin */}
                      <button
                        disabled={user.role === "admin"}
                        onClick={() => confirmRoleChange(user, "admin")}
                        className={`p-2.5 rounded-xl transition-all ${user.role === "admin" ? 'bg-slate-50 text-slate-300' : 'bg-red-50 text-red-500 hover:bg-red-500 hover:text-white shadow-sm hover:shadow-red-200'}`}
                        title="Make Admin"
                      >
                        <FaUserShield size={16} />
                      </button>

                      {/* Make Manager */}
                      <button
                        disabled={user.role === "clubManager"}
                        onClick={() => confirmRoleChange(user, "clubManager")}
                        className={`p-2.5 rounded-xl transition-all ${user.role === "clubManager" ? 'bg-slate-50 text-slate-300' : 'bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white shadow-sm hover:shadow-amber-200'}`}
                        title="Make Club Manager"
                      >
                        <FaUserTie size={16} />
                      </button>

                      {/* Make Member */}
                      <button
                        disabled={user.role === "member"}
                        onClick={() => confirmRoleChange(user, "member")}
                        className={`p-2.5 rounded-xl transition-all ${user.role === "member" ? 'bg-slate-50 text-slate-300' : 'bg-[#007a99]/10 text-[#007a99] hover:bg-[#007a99] hover:text-white shadow-sm hover:shadow-cyan-200'}`}
                        title="Make Member"
                      >
                        <FaUsers size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default UserManagement;