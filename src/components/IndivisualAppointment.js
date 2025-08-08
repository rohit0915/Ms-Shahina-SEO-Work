/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createApi, getApi, getTerms, showMsg } from "../Repository/Api";
import PhoneInput from "react-phone-input-2";
import { FaEye } from "react-icons/fa6";
import { PiEyeClosedBold } from "react-icons/pi";
import FullScreenLoader from "./Loader/FullScreenLoader";
import { DateOfBirthFormat } from "../utils/utilsFunc";
import DynamicHelmet from "./Helmet/DynamicHelmet";
import { ImageLazyLoading } from "../utils/helpingComponent";
import endPoints from "../Repository/apiConfig";

const IndivisualAppointment = () => {
  const [show, setShow] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [show2, setShow2] = useState(false);
  const [response, setResponse] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [metaResponse, setMetaResponse] = useState(null);
  const navigate = useNavigate();

  const fetchMetaTags = () => {
    getApi({
      url: endPoints.metaTags.indivisualAppointmentPage,
      setResponse: setMetaResponse,
    });
  };

  useEffect(() => {
    getTerms(setResponse);
    fetchMetaTags();
  }, []);

  const payload = {
    firstName,
    lastName,
    email,
    phone,
    gender,
    password,
    dob,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const additionalFunctions = [() => navigate("/login")];
    if (password !== confirmPassword) {
      showMsg(
        "",
        "Passwords do not match. Please make sure your password and confirm password entries are identical.",
        "info"
      );
    } else {
      createApi({
        url: "api/v1/user/registration",
        payload,
        additionalFunctions,
        setLoading,
      });
    }
  };

  function BackNavigation() {
    navigate(-1);
  }
  return (
    <>
      {metaResponse && (
        <DynamicHelmet
          title={metaResponse?.data?.title}
          description={metaResponse?.data?.description}
        />
      )}
      {loading && <FullScreenLoader />}
      <div className="Backward_Heading">
        <ImageLazyLoading
          img={"/Image/1.png"}
          alt={"Go Back"}
          className={"text-[10px]"}
          onClick={() => BackNavigation()}
        />
        <p>Individual Appointment</p>
      </div>

      <div className="Indivisual-Appointment">
        <p className="title">
          Please enter your details to continue with individual appointment{" "}
        </p>

        <form onSubmit={submitHandler}>
          <div>
            <p className="required">First Name</p>
            <input
              type="text"
              placeholder="Enter Your First Name"
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div>
            <p className="required">Last Name</p>
            <input
              type="text"
              placeholder="Enter Your Last Name"
              required
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div>
            <p className="required">Email</p>
            <input
              type="email"
              name="email"
              placeholder="Enter your Email ID"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <p className="required">Contact Number</p>
            <PhoneInput country={"us"} onChange={setPhone} />
          </div>

          <div>
            <p className="required">Date Of Birth</p>
            <input
              type="text"
              pattern="\d{2}/\d{2}/\d{4}"
              value={dob}
              required
              placeholder="MM/DD/YYYY"
              onChange={(e) => DateOfBirthFormat(e, setDob)}
            />
          </div>

          <div>
            <p className="required"> New Password</p>
            <div className="input-div">
              <input
                type={show ? "text" : "password"}
                required
                placeholder="Enter Your New Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {show ? (
                <FaEye onClick={() => setShow(false)} />
              ) : (
                <PiEyeClosedBold onClick={() => setShow(true)} />
              )}
            </div>
          </div>
          <div>
            <p className="required"> Confirm Password</p>
            <div className="input-div">
              <input
                type={show2 ? "text" : "password"}
                required
                placeholder=""
                name="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {show2 ? (
                <FaEye onClick={() => setShow2(false)} />
              ) : (
                <PiEyeClosedBold onClick={() => setShow2(true)} />
              )}
            </div>
          </div>

          <div>
            <p>Select your Gender</p>
            <div className="gender_selection" style={{ marginTop: "0" }}>
              <button
                type="button"
                className={gender === "Male" ? "active" : ""}
                onClick={() => setGender("Male")}
              >
                <div>
                  <ImageLazyLoading
                    img={"/Image/male.png"}
                    alt={"Male"}
                    className={"active text-[10px]"}
                  />
                </div>
                <p>Male</p>
              </button>
              <button
                type="button"
                className={gender === "Female" ? "active" : ""}
                onClick={() => setGender("Female")}
              >
                <div>
                  <ImageLazyLoading
                    img={"/Image/female.png"}
                    alt={"Female"}
                    className={"text-[10px]"}
                  />
                </div>
                <p>Female</p>
              </button>
              <button
                type="button"
                className={gender === "Other" ? "active" : ""}
                onClick={() => setGender("Other")}
              >
                <div>
                  <ImageLazyLoading
                    img={"/Image/other.png"}
                    alt={"Other"}
                    className={"text-[10px]"}
                  />
                </div>
                <p>Other</p>
              </button>
            </div>
          </div>

          <div style={{ marginTop: "60px" }}>
            {" "}
            <a
              href={response?.[0]?.pdf}
              target="_blank"
              style={{
                textDecoration: "underline",
                fontSize: "18px",
                color: "#e5d896",
              }}
            >
              {`  View Terms and Conditions`}
            </a>
          </div>
          <div className="check" style={{ marginTop: "40px" }}>
            <input type="checkbox" required />
            <div>
              <span className="title">
                <span> I Agree to the Terms & Conditions</span>
              </span>
            </div>
          </div>

          <button type="submit">CONTINUE</button>
        </form>
      </div>
    </>
  );
};

export default IndivisualAppointment;
