/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createApi } from "../Repository/Api";
import { FaEye } from "react-icons/fa6";
import { PiEyeClosedBold } from "react-icons/pi";
import FullScreenLoader from "./Loader/FullScreenLoader";
import DynamicHelmet from "./Helmet/DynamicHelmet";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const payload = { newPassword, confirmPassword };

  const userId = localStorage.getItem("changeId");

  const handleSubmit = (e) => {
    e.preventDefault();
    const additionalFunctions = [() => navigate("/password-changed")];
    createApi({
      url: `api/v1/user/changePassword/${userId}`,
      payload,
      additionalFunctions,
      setLoading,
    });
  };

  return (
    <>
      <DynamicHelmet />
      {loading && <FullScreenLoader />}
      <div className="Backward_Heading step_Heading">
        <p>Change Password</p>
      </div>

      <div className="forget-password">
        <p className="title">
          Please Enter the details to Change your Password{" "}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mt-5">
            <p>New Password</p>

            <div className="input-div">
              <input
                type={show ? "text" : "password"}
                required
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {show ? (
                <FaEye onClick={() => setShow(false)} />
              ) : (
                <PiEyeClosedBold onClick={() => setShow(true)} />
              )}
            </div>
          </div>

          <div className="mt-5">
            <p>Re-Enter Password</p>

            <div className="input-div">
              <input
                type={show1 ? "text" : "password"}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {show1 ? (
                <FaEye onClick={() => setShow1(false)} />
              ) : (
                <PiEyeClosedBold onClick={() => setShow1(true)} />
              )}
            </div>
          </div>

          <button className="verify" type="submit">
            SAVE PASSWORD
          </button>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
