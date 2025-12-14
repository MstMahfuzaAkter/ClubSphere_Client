import React from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Adminpaymenttable = () => {
  const axiosSecure = useAxiosSecure();

  const { data: transaction = [], isLoading } = useQuery({
    queryKey: ["transaction"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  return (
    <div>
      <h4> payment history</h4>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>userEmail</th>
              <th>amount</th>
              <th>type</th>
              <th>clubName</th>
            
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            {transaction.map((t, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{t.userEmail}</td>
                <td>{t.price}</td>
                <td>membership</td>
                <td>{t.clubName}</td>
                <td>{t.createdAt}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Adminpaymenttable;