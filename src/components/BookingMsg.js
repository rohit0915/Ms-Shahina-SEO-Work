/** @format */

import React, { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getCorrectTime, getCorrectTime2 } from "../Helper/Herlper";
import DynamicHelmet from "./Helmet/DynamicHelmet";

const BookingMsg = () => {
  const { id } = useParams();
  const location = useLocation();

  function DOBfetcher(orgignalDate) {
    const original = getCorrectTime2(orgignalDate);
    const month = original.getMonth() + 1;
    const date = original.getDate();
    const year = original.getFullYear();
    const hasAll = month && year && date;
    return (
      hasAll &&
      `${month < 9 ? `0${month}` : month}-${
        date < 9 ? `0${date}` : date
      }-${year}`
    );
  }
  return (
    <>
      <DynamicHelmet />
      {id === "cancel" ? (
        <div className="Thanks_Container">
          <p className="desc" style={{ textTransform: "none" }}>
            Your appointment with Shahina Hoja Aesthetics has been cancelled
          </p>

          <Link to="/mycart" style={{ cursor: "pointer" }}>
            <button>RETURN TO CART</button>
          </Link>
        </div>
      ) : (
        <div className="Thanks_Container">
          <p className="title">Your appointment is rescheduled!</p>
          <p className="desc" style={{ textTransform: "none" }}>
            We are pleased to confirm your upcoming appointment with us on{" "}
            <span style={{ backgroundColor: "#e5d896" }}>
              {location?.search?.split("?")?.[1] &&
                DOBfetcher(location?.search?.split("?")?.[1])}
            </span>{" "}
            at{" "}
            <span style={{ backgroundColor: "#e5d896", textTransform: "none" }}>
              {location?.search?.split("?")?.[1] &&
                getCorrectTime(location?.search?.split("?")?.[1])}
            </span>{" "}
            .
            <br /> Thank you for choosing our services.
          </p>
          <Link to="/mycart" style={{ cursor: "pointer" }}>
            <button>RETURN TO CART</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default BookingMsg;
