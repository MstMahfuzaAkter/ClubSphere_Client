import React from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { FaCheckCircle, FaTimesCircle, FaReceipt, FaHistory } from "react-icons/fa";
import Loadingspinner from "../../../Components/Shared/Loadingspinner";
import { motion } from "framer-motion";

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
  if (isError) return <div className="p-10 text-red-500  font-bold uppercase tracking-widest">Error: {error.message}</div>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className=""
    >
      {/* 💳 Header Section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
             Payment History
          </h1>
          <p className="text-sm text-slate-400 font-medium mt-1">Keep track of your club subscriptions and transactions</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl shadow-sm border border-slate-100">
           <FaHistory className="text-[#007a99]" />
           <span className="text-xs font-black text-slate-600 uppercase tracking-widest">
             {memberpayments.length} Transactions
           </span>
        </div>
      </div>

      {/* 🧾 Table Area */}
      {memberpayments.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] p-20 text-center border border-dashed border-slate-200">
           <FaReceipt className="mx-auto text-slate-200 mb-4" size={50} />
           <p className="text-slate-400 font-medium">No payment records found yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full border-separate border-spacing-y-0">
              <thead className="bg-slate-50/50">
                <tr className="text-slate-400">
                  <th className="py-6 pl-8 text-[10px] font-black uppercase tracking-[0.2em]">Transaction</th>
                  <th className="py-6 text-[10px] font-black uppercase tracking-[0.2em]">Club Name</th>
                  <th className="py-6 text-[10px] font-black uppercase tracking-[0.2em]">Amount</th>
                  <th className="py-6 text-[10px] font-black uppercase tracking-[0.2em]">Status</th>
                  <th className="py-6 pr-8 text-[10px] font-black uppercase tracking-[0.2em] text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {memberpayments.map((t, index) => (
                  <tr key={t._id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="py-5 pl-8">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#007a99]/5 flex items-center justify-center text-[#007a99]">
                           <FaReceipt size={16} />
                        </div>
                        <div className="flex flex-col">
                           <span className="text-sm font-bold text-slate-800 tracking-tight">Membership Fee</span>
                           <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">ID: {t._id.slice(-8)}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="text-sm font-semibold text-slate-600">{t.clubName}</span>
                    </td>
                    <td>
                      <span className="text-sm font-black text-slate-800">
                        ${t.price}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        {t.status === "paid" ? (
                          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                             <FaCheckCircle size={12} />
                             <span className="text-[10px] font-black uppercase tracking-widest">Success</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 rounded-full border border-red-100">
                             <FaTimesCircle size={12} />
                             <span className="text-[10px] font-black uppercase tracking-widest">Failed</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="text-right pr-8">
                      <span className="text-xs font-bold text-slate-500 uppercase">
                        {dayjs(t.createdAt).format("DD MMM, YYYY")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MemberPayments;