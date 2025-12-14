import React from "react";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
const AdminChart = () => {
 const axiosSecure = useAxiosSecure();
 const {data, isLoading} = useQuery({
    queryKey: ['paymentchart'],
    queryFn: async() => {
        const res = await axiosSecure.get('/payments')
        return res.data;
    }
 })

console.log(data);
  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="clubName" />
          //club name
          <YAxis />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#8884d8" />
          //price
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminChart;