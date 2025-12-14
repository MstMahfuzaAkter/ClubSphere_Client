import React from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loadingspinner from "../../../Components/Shared/Loadingspinner";
import {  useNavigate } from "react-router";

const MemberClubs = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const addOneYear = (dateInput) => {
    const date = new Date(dateInput);
    date.setFullYear(date.getFullYear() + 1);
    return date.toLocaleDateString();
  };

  const { data: clubmembers = [], isLoading } = useQuery({
    queryKey: ["clubmembers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/clubmembers");
      return res.data;
    },
  });

  console.log(clubmembers);

  if (isLoading) {
    return <Loadingspinner />;
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">
       My Clubs Activity Log
      </h3>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Location</th>
              <th>Membership Status</th>
              <th>Expiry Date</th>
              <th>Club Details</th>
            </tr>
          </thead>

          <tbody>
            {clubmembers.map((club, index) => (
              <tr key={club._id || index}>
                <th>{index + 1}</th>
                <td>{club.clubname}</td>
                <td>{club.location}</td>
                <td className="capitalize">{club.status}</td>
                <td>{club.createdAt ? addOneYear(club.createdAt) : "N/A"}</td>
               
                <th>
                    <button  onClick={() => Navigate(`/clubs/${club._id}`)} className="btn btn-md bg-orange-600 text-white">show detilas</button>
                </th>
              
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberClubs;