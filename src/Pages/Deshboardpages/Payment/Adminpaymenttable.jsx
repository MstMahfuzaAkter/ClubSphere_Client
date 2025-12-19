import React from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { FaGlobe, FaSearchDollar, FaHashtag, FaEnvelope } from "react-icons/fa";
import Loadingspinner from "../../../Components/Shared/Loadingspinner";
import { motion } from "framer-motion";

const Adminpaymenttable = () => {
  const axiosSecure = useAxiosSecure();

  const { data: transaction = [], isLoading } = useQuery({
    queryKey: ["transaction"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  if (isLoading) return <Loadingspinner />;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
    >
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Financial Ledger</h1>
          <p className="text-sm text-slate-400 font-medium">Monitoring all club membership transactions</p>
        </div>
        <div className="flex items-center gap-3">
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-2">
                <FaSearchDollar className="text-[#007a99]" />
                <span className="text-sm font-black text-slate-700">
                    Total: ${transaction.reduce((sum, t) => sum + (t.price || 0), 0)}
                </span>
            </div>
        </div>
      </div>

      {/* --- Table Section --- */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-separate border-spacing-y-0">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400">
                <th className="py-6 pl-8 text-[10px] font-black uppercase tracking-widest"><FaHashtag /></th>
                <th className="py-6 text-[10px] font-black uppercase tracking-widest">User / Email</th>
                <th className="py-6 text-[10px] font-black uppercase tracking-widest">Club Association</th>
                <th className="py-6 text-[10px] font-black uppercase tracking-widest">Type</th>
                <th className="py-6 text-[10px] font-black uppercase tracking-widest text-center">Amount</th>
                <th className="py-6 pr-8 text-[10px] font-black uppercase tracking-widest text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {transaction.map((t, index) => (
                <tr key={t._id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="pl-8 font-bold text-slate-300 text-xs">{index + 1}</td>
                  <td className="py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#007a99] font-bold text-[10px]">
                        {t.userEmail?.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800 tracking-tight leading-none mb-1 lowercase">
                          {t.userEmail.split('@')[0]}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1 uppercase tracking-tighter">
                          <FaEnvelope className="text-[8px]" /> {t.userEmail}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                      <span className="text-sm font-semibold text-slate-600">{t.clubName}</span>
                    </div>
                  </td>
                  <td>
                    <span className="px-2 py-1 bg-slate-100 text-slate-500 rounded-md text-[10px] font-black uppercase tracking-widest">
                      Membership
                    </span>
                  </td>
                  <td className="text-center">
                    <span className="text-sm font-black text-[#007a99] bg-[#007a99]/5 px-3 py-1.5 rounded-xl border border-[#007a99]/10">
                      ${t.price}
                    </span>
                  </td>
                  <td className="pr-8 text-right">
                    <div className="flex flex-col">
                        <span className="text-xs font-black text-slate-700">
                          {dayjs(t.createdAt).format("DD MMM, YYYY")}
                        </span>
                        <span className="text-[10px] text-slate-300 font-bold uppercase tracking-tighter">
                          {dayjs(t.createdAt).format("hh:mm A")}
                        </span>
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

export default Adminpaymenttable;