/** @format */

import React from "react";
import MainStripe from "../../Stripe/MainStripe";

const CheckoutSection = ({ hasService, hasAppointmentTime }) => {
  return (
    <>
      {hasService && (
        <div className="schedule_1 appointment_box">
          <div className="left_div" style={{ width: "100%" }}>
            <div className="review_box">
              <p className="title">Confirm Appointment</p>
              <p
                className="title"
                style={{
                  fontSize: "20px",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                Payment Method
              </p>
              <span style={{ marginTop: "20px" }} className="mob">
                You won't be charged now , payment will be collected in store
                after your appointment.
              </span>
              <MainStripe hasAppointmentTime={hasAppointmentTime} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutSection;
