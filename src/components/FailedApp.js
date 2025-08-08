/** @format */

import React from "react";
import { Link } from "react-router-dom";
import DynamicHelmet from "./Helmet/DynamicHelmet";

const FailedApp = () => {
  return (
    <div className="Thanks_Container">
      <DynamicHelmet />
      <p className="title">Failed !</p>
      <p className="desc">Membership Failed due to Technical issue</p>
      <Link
        to="/"
        style={{ cursor: "pointer", marginTop: "20px" }}

      >
        <button>RETURN TO HOMEPAGE</button>
      </Link>
    </div>
  );
};

export default FailedApp;
