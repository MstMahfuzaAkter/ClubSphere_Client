import React from "react";
import useRole from "../../router/useRole";
import Adminoverviews from "./Overviews/Adminoverviews";
import Clubmangeroverviews from "./Overviews/Clubmangeroverviews";
import Membersobeviews from "./Overviews/Membersobeviews";

const Deshboardmain = () => {

  const {role} = useRole();
  if(role === 'admin'){
    return <Adminoverviews></Adminoverviews>
  }

  if(role === 'manager'){
    return <Clubmangeroverviews></Clubmangeroverviews>
  }

  return (
    <Membersobeviews></Membersobeviews>
  );
};

export default Deshboardmain;