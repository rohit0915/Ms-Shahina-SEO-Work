/** @format */

import React from "react";
import { Link } from "react-router-dom";
import DynamicHelmet from "./Helmet/DynamicHelmet";

const GuestFailed = () => {
  return (
    <div className="Thanks_Container">
      <DynamicHelmet />
      <p className="title">Failed !</p>
      <p className="desc" style={{ textTransform: "none" }}>
        Order failed due to technical issue
      </p>
      <Link to="/" style={{ cursor: "pointer" }}>
        <button>RETURN TO HOMEPAGE</button>
      </Link>
    </div>
  );
};

export default GuestFailed;
