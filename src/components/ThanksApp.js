/** @format */

import React from "react";
import { Link } from "react-router-dom";
import DynamicHelmet from "./Helmet/DynamicHelmet";

const ThanksApp = () => {
  return (
    <div className="Thanks_Container">
      <DynamicHelmet />
      <p className="title">Congratulations🎉</p>
      <p className="desc" style={{ textTransform: "none" }}>
        Thank you for becoming a member. <br /> We are looking forward to
        provide you the best experience!
      </p>
      <Link
        to="/"
        style={{ cursor: "pointer", marginTop: "20px" }}
        
      >
        <button>RETURN TO HOMEPAGE</button>
      </Link>
    </div>
  );
};

export default ThanksApp;
