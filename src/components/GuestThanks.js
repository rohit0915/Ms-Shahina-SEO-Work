/** @format */

import React from "react";
import { Link } from "react-router-dom";
import DynamicHelmet from "./Helmet/DynamicHelmet";

const GuestThanks = () => {
  return (
    <div className="Thanks_Container">
      <DynamicHelmet />
      <p className="title">Thank you!</p>

      <p className="desc" style={{ textTransform: "none" }}>
        Your order is confirmed. <br /> We are looking forward to provide you
        the best experience.
      </p>
      <Link to="/" style={{ cursor: "pointer" }}>
        <button>RETURN TO HOMEPAGE</button>
      </Link>
    </div>
  );
};

export default GuestThanks;
