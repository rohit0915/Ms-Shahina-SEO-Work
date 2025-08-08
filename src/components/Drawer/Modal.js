/** @format */

import React, { useState } from "react";
import { Modal } from "antd";
import { updateApi } from "../../Repository/Api";
import FullScreenLoader from "../Loader/FullScreenLoader";
import { useNavigate } from "react-router-dom";

const CancelAppointmentModal = ({ open, setOpen, id }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Cancel appointment
  const submitHandler = (e) => {
    e.preventDefault();
    const additionalFunctions = [
      () => setOpen(false),
      () => navigate(`/booking-msg/cancel`),
    ];
    updateApi({
      url: `api/v1/cancelBookingByUser/${id}`,
      payload: {},
      additionalFunctions,
      setLoading,
    });
  };

  return (
    <Modal
      centered
      open={open}
      onCancel={() => setOpen(false)}
      width={700}
      className="Sub_Modal"
    >
      {loading && <FullScreenLoader />}
      <div className="heading">
        <p>Cancel Appointment</p>
        <img src="/Image/14.png" onClick={() => setOpen(false)} alt="" loading="lazy" />
      </div>

      <form onSubmit={submitHandler}>
        <div className="input_check" style={{ alignItems: "flex-start" }}>
          <input type="checkbox" required />
          <span>
            I accept the late cancellation policy and agree to pay 50% service
            fee for canceling within 48 hours
          </span>
        </div>

        <div className="two_btn ">
          <button type="submit" className="first">
            Cancel
          </button>
          <button type="button" onClick={() => setOpen(false)}>
            Go Back
          </button>
        </div>
      </form>
    </Modal>
  );
};

const RescheduleAppointmentPopup = ({ open, setOpen, id }) => {
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/reschedule/${id}`);
  };
  return (
    <Modal
      centered
      open={open}
      onCancel={() => setOpen(false)}
      width={700}
      className="Sub_Modal"
    >
      <div className="heading">
        <p>Reschedule Appointment</p>
        <img src="/Image/14.png" onClick={() => setOpen(false)} alt="" loading="lazy" />
      </div>

      <form onSubmit={submitHandler}>
        <div className="input_check" style={{ alignItems: "flex-start" }}>
          <input type="checkbox" required />
          <span>
            I accept the reschedule policy and agree to pay 50% service fee for
            rescheduling within 48 hours
          </span>
        </div>

        <div className="two_btn ">
          <button type="submit" className="first">
            Reschedule
          </button>
          <button type="button" onClick={() => setOpen(false)}>
            Go Back
          </button>
        </div>
      </form>
    </Modal>
  );
};

const DefaultModal = ({ children, className, open, setOpen }) => {
  return (
    <Modal
      centered
      open={open}
      onCancel={() => setOpen(false)}
      className={className}
    >
      {children}
    </Modal>
  );
};

export { CancelAppointmentModal, RescheduleAppointmentPopup, DefaultModal };
