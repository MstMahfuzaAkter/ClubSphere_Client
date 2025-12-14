import React from "react";
import useAuth from "../Hook/useAuth";
import useRole from "./useRole";
import Loadingspinner from "../Components/Shared/Loadingspinner";

const ClubManagerRouter = ({children}) => {
  const { loading } = useAuth();
  const { role, isLoading } = useRole();

  if (loading || isLoading) {
    return <Loadingspinner></Loadingspinner>;
  }
  if (role !== "admin") {
    return <div>Access is forbidden.........</div>;
  }

  return children;
   
};

export default ClubManagerRouter;