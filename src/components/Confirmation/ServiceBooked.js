/** @format */

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getApi, savedBookingCard } from "../../Repository/Api";
import { getCorrectTime2, getCorrectTime } from "../../Helper/Herlper";
import Loader from "../Loader/Loader";
import DynamicHelmet from "../Helmet/DynamicHelmet";

function DOBfetcher(orgignalDate) {
  const original = getCorrectTime2(orgignalDate);
  const month = original.getMonth() + 1;
  const date = original.getDate();
  const year = original.getFullYear();
  const hasAll = month && year && date;
  return (
    hasAll &&
    `${month < 9 ? `0${month}` : month}-${date < 9 ? `0${date}` : date}-${year}`
  );
}

const ServiceBooked = () => {
  const { id } = useParams();
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    savedBookingCard();
    getApi({
      url: `api/v1/user/getOrderDetails/${id}`,
      setResponse,
      setLoading,
    });
  }, [id]);

  return (
    <>
      <DynamicHelmet />
      {loading ? (
        <Loader />
      ) : (
        <div className="Thanks_Container">
          <p className="title">Your appointment is confirmed!</p>
          <p className="desc" style={{ textTransform: "none" }}>
            We are pleased to confirm your upcoming appointment with us on{" "}
            <span style={{ backgroundColor: "#e5d896" }}>
              {" "}
              {response?.data?.serviceData?.fromTime &&
                DOBfetcher(response?.data?.serviceData?.fromTime)}{" "}
            </span>
            at{" "}
            <span style={{ backgroundColor: "#e5d896", textTransform: "none" }}>
              {response?.data?.serviceData?.toTime &&
                getCorrectTime(response?.data?.serviceData?.toTime)}
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

export default ServiceBooked;
