/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getServiceDate } from "../../Helper/Herlper";
import { updateApi } from "../../Repository/Api";
import { checkServiceTime } from "../../utils/utilsFunc";
import {
  CancelAppointmentModal,
  RescheduleAppointmentPopup,
} from "../Drawer/Modal";
import FullScreenLoader from "../Loader/FullScreenLoader";
import { ImageLazyLoading } from "../../utils/helpingComponent";

const ServiceOrderCard = ({
  img,
  title,
  price,
  orderId,
  time,
  membershipDiscount,
  offerDiscount,
  serviceId,
  appointmentId,
  isCancel = true,
  isReschedule = true,
  isView = true,
  size,
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    checkServiceTime(time, setShowBtn);
  }, [time]);

  const submitHandler = () => {
    const additionalFunctions = [() => navigate(`/booking-msg/cancel`)];
    updateApi({
      url: `api/v1/cancelBookingByUser/${appointmentId}`,
      payload: {},
      additionalFunctions,
      setLoading,
    });
  };

  return (
    <>
      {loading && <FullScreenLoader />}
      <CancelAppointmentModal
        setOpen={setOpen}
        open={open}
        id={appointmentId}
      />
      <RescheduleAppointmentPopup
        setOpen={setShow}
        open={show}
        id={appointmentId}
      />
      <div className="Items">
        <ImageLazyLoading className="thumb" img={img} alt={title} />
        <div className="content">
          <div
            style={{
              display: "flex",
              gap: "40px",
              alignItems: "center",
            }}
            className="Spec"
          >
            <p className="title" style={{ margin: 0 }}>
              {title} <br />
              {size && `(${size})`}
            </p>{" "}
            {price > 0 && (
              <p className="title" style={{ fontSize: "24px" }}>
                {" "}
                ${price}
              </p>
            )}
          </div>
          <p
            className="orderId"
            style={{
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            Order ID: {orderId}
          </p>{" "}
          {time && (
            <p className="orderId" style={{ color: "#A9A9A9" }}>
              Date: {getServiceDate(time)}
            </p>
          )}
          {membershipDiscount > 0 && (
            <p className="orderId " style={{ color: "#A9A9A9" }}>
              {" "}
              Membership Discount: ${membershipDiscount}
            </p>
          )}{" "}
          {offerDiscount > 0 && (
            <p className="orderId " style={{ color: "#A9A9A9" }}>
              {" "}
              Offer Discount: ${offerDiscount}
            </p>
          )}{" "}
          {isView && (
            <div className="button-container">
              <button
                onClick={() => navigate(`/service/${title}?id=${serviceId}`)}
                style={{
                  background: "#042b26",
                  border: "1px solid #042b26",
                  color: "#e5d896",
                }}
              >
                View Service
              </button>
            </div>
          )}
          {isCancel &&
            (showBtn === true ? (
              <div className="button-container">
                <button className="delete-btn" onClick={() => setOpen(true)}>
                  Cancel
                </button>
              </div>
            ) : (
              <div className="button-container">
                <button className="delete-btn" onClick={() => submitHandler()}>
                  Cancel
                </button>
              </div>
            ))}
          {isReschedule && (
            <div className="button-container">
              {showBtn ? (
                <button
                  onClick={() => setShow(true)}
                  style={{
                    background: "#042b26",
                    border: "1px solid #042b26",
                    color: "#e5d896",
                  }}
                >
                  Reschedule
                </button>
              ) : (
                <button
                  onClick={() => navigate(`/reschedule/${appointmentId}`)}
                  style={{
                    background: "#042b26",
                    border: "1px solid #042b26",
                    color: "#e5d896",
                  }}
                >
                  Reschedule
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ServiceOrderCard;
