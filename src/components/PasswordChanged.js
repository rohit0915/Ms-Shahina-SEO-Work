/** @format */

import React from "react";
import { Link } from "react-router-dom";
import DynamicHelmet from "./Helmet/DynamicHelmet";

const PasswordChanged = () => {
  const btnStyle = {
    display: "block",
    margin: "auto",
    marginTop: "20px",
  };
  return (
    <div className="forget-password">
      <DynamicHelmet />
      <p className="title">Your password has been changed succesfully!</p>
      <Link to="/login" style={{ cursor: "pointer" }}>
        <button style={btnStyle}>Return to Login</button>
      </Link>
    </div>
  );
};

export default PasswordChanged;
