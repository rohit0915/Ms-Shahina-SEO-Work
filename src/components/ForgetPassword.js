/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createApi, verifyOtp } from "../Repository/Api";
import FullScreenLoader from "./Loader/FullScreenLoader";
import DynamicHelmet from "./Helmet/DynamicHelmet";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const payload = { email };

  const submitHandler = () => {
    if (email) {
      createApi({
        url: "api/v1/user/forgetPassword",
        payload,
        successMsg: "Please check your email",
        setLoading: setOtpLoading,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { email, otp };
    verifyOtp(payload, navigate, setLoading);
  };

  return (
    <>
      <DynamicHelmet />
      {otpLoading && <FullScreenLoader />}
      {loading && <FullScreenLoader />}
      <div className="Backward_Heading step_Heading">
        <p style={{ width: "100%" }}>Forgot Password?</p>
      </div>

      <div className="forget-password">
        <p className="title">Please enter the following details to verify</p>

        <form onSubmit={handleSubmit}>
          <div className="otp">
            <div>
              <p>Email Address</p>
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              className="sendOtp"
              type="button"
              onClick={() => submitHandler()}
            >
              SEND CODE
            </button>
          </div>

          <div className="mt-4">
            <p>Enter 4 Digit Code</p>
            <input
              type="tel"
              pattern="[0-9]{4}"
              required
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          <button className="verify" type="submit">
            VERIFY
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgetPassword;
