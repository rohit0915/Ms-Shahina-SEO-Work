/** @format */

import React from "react";
import { Link } from "react-router-dom";
import DynamicHelmet from "./Helmet/DynamicHelmet";

const Confirmation = () => {
  return (
    <div className="Thanks_Container">
      <DynamicHelmet />
      <p className="title">You are all set</p>
      <p className="desc" style={{ textTransform: "none" }}>
        Thank you for saving your card details. We look forward to seeing you
        soon!
      </p>
      <Link to="/" style={{ cursor: "pointer" }}>
        <button>RETURN TO HOMEPAGE</button>
      </Link>
    </div>
  );
};

export default Confirmation;
