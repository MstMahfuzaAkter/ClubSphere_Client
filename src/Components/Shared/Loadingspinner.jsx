import React from "react";
import { BounceLoader } from "react-spinners";

const Loadingspinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <BounceLoader color="#f94e0f" />
    </div>
  );
};

export default Loadingspinner;
