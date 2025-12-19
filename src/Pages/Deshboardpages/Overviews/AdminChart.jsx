import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loadingspinner from "../../../Components/Shared/Loadingspinner";

const AdminChart = () => {
  const axiosSecure = useAxiosSecure();

  const { data: chartData = [], isLoading } = useQuery({
    queryKey: ['paymentchart'],
    queryFn: async () => {
      const res = await axiosSecure.get('/payments');
      return res.data;
    }
  });

  if (isLoading) return <div className="h-[400px] flex items-center justify-center"><Loadingspinner /></div>;

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100  shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Revenue Overview</h2>

      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="clubName"
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <YAxis
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="price"
              name="Revenue (BDT)"
              stroke="#007a99"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminChart;