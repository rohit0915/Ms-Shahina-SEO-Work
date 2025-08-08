/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getApi } from "../Repository/Api";
import DynamicHelmet from "./Helmet/DynamicHelmet";
import { ImageLazyLoading } from "../utils/helpingComponent";
import endPoints from "../Repository/apiConfig";

const Appointment = () => {
  const navigate = useNavigate();
  const [metaResponse, setMetaResponse] = useState(null);

  const fetchMetaTags = () => {
    getApi({
      url: endPoints.metaTags.appointmentPage,
      setResponse: setMetaResponse,
    });
  };

  useEffect(() => {
    fetchMetaTags();
  }, []);

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
      <div className="Backward_Heading">
        <ImageLazyLoading
          img={"/Image/1.png"}
          onClick={() => BackNavigation()}
          alt={"Go Back"}
        />

        <p>Please Select an Option Below</p>
      </div>

      <div className="Appointment_Selection">
        <div className="boxes">
          <div className="options" onClick={() => navigate("/returningMember")}>
            <ImageLazyLoading img={"/Image/2.png"} alt={"Returning Member"} />
            <p>
              Returning <br /> Client/Member{" "}
            </p>
          </div>
          <div className="options" onClick={() => navigate("/indiAppointment")}>
            <ImageLazyLoading
              img={"/Image/3.png"}
              alt={"indivisual Appointment"}
            />
            <p>Individual Appointment </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointment;
