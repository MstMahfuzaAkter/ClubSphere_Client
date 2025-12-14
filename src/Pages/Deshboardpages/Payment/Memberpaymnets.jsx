import React from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Loadingspinner from "../../../Components/Shared/Loadingspinner";

const MemberPayments = () => {
  const axiosSecure = useAxiosSecure();

  const { data: memberpayments = [], isLoading, isError, error } = useQuery({
    queryKey: ["memberpayments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/memberpayments");
      return res.data;
    },
  });

  if (isLoading) return <Loadingspinner />;
  if (isError)
    return (
      <p className="p-6 text-red-500">
        Failed to load payments: {error.message}
      </p>
    );

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-blue-50 to-purple-50 rounded-2xl">
      <h2 className="text-2xl font-bold mb-6">Payment History</h2>

      {memberpayments.length === 0 ? (
        <p className="text-gray-500">No payments found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-sm">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Club Name</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {memberpayments.map((t, index) => (
                <tr key={t._id}>
                  <th>{index + 1}</th>
                  <td className="flex items-center gap-2">
                    {t.status === "paid" ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaTimesCircle className="text-red-500" />
                    )}
                    <span className="capitalize">{t.status}</span>
                  </td>
                  <td>${t.price}</td>
                  <td>Membership</td>
                  <td>{t.clubName}</td>
                  <td>{dayjs(t.createdAt).format("DD MMM, YYYY")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MemberPayments;