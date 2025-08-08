/** @format */

import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useParams } from "react-router-dom";

const stripePromise = loadStripe(process.env.React_App_Stripe_Published_Key);

const options = {
  mode: "setup",
  currency: "usd",
  appearance: {
    theme: "stripe",
    variables: {
      colorPrimary: "#0570de",
      colorBackground: "#ffffff",
      colorText: "#30313d",
      colorDanger: "#df1b41",
      fontFamily: "Ideal Sans, system-ui, sans-serif",
      spacingUnit: "4px",
      borderRadius: "4px",
      fontWeight: "bold",
    },
    rules: {
      ".Tab": {
        border: "1px solid #E0E6EB",
        boxShadow:
          "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02)",
      },

      ".Tab:hover": {
        color: "var(--colorText)",
      },

      ".Tab--selected": {
        borderColor: "#E0E6EB",
        boxShadow:
          "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02), 0 0 0 2px var(--colorPrimary)",
      },

      ".Input--invalid": {
        boxShadow:
          "0 1px 1px 0 rgba(0, 0, 0, 0.07), 0 0 0 2px var(--colorDanger)",
      },
    },
    paymentRequestButton: {
      type: "default", // or "donate"
      style: {
        paymentRequestButton: {
          theme: "light",
          height: "40px",
          type: "buy",
          border: "1px solid black",
        },
      },
    },
  },
};

const btnStyle = {
  backgroundColor: "#000",
  color: "#fff",
  padding: "10px",
  borderRadius: "10px",
  border: "1px solid #000",
  width: "200px",
  display: "block",
  marginTop: "15px",
};

const Baseurl = process.env.React_App_Baseurl;
const CardSave = () => {
  const { email, orderId } = useParams();
  const updateid = orderId?.split("=")?.[1];

  const IntentComponent = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState();
    const [loading, setLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);

    const handleError = (error) => {
      setLoading(false);
      setErrorMessage(error.message);
    };

    // Provided date string
    const originalDate = new Date();
    const timeString = originalDate.toTimeString().split(" ")[0];
    const adjustedDate =
      originalDate.toISOString().split("T")[0] + "T" + timeString + ".000Z";

    const submitHandler = async (e) => {
      e.preventDefault();
      setSubmitLoading(true);

      try {
        const response = await axios.post(
          `${process.env.React_App_Baseurl}api/v1/user/card/updateCardDetailSaved/${updateid}`,
          {
            cardDetailSavedDate: adjustedDate,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
          }
        );
        if (response.status === 200) {
          handleSubmit();
        }
      } catch {}
    };

    const handleSubmit = async () => {
      if (!stripe) {
        return;
      }
      setLoading(true);
      const { error: submitError } = await elements.submit();
      if (submitError) {
        handleError(submitError);
        return;
      }
      try {
        const res = await axios.post(
          `${Baseurl}api/v1/user/card/savecardBeforLogin/${email}`
        );
        const clientSecret = res?.data?.client_secret?.client_secret;
        if (clientSecret) {
          const { error } = await stripe.confirmSetup({
            elements,
            clientSecret,
            confirmParams: {
              return_url: `${process.env.React_App_Web_url}confirmation`,
            },
          });
          if (error) {
            handleError(error);
            setSubmitLoading(false);
          } else {
            setSubmitLoading(false);
          }
        } else {
          console.log("Client Secret not available ");
        }
      } catch (error) {
        handleError(error);
        setSubmitLoading(false);
      }
    };

    return (
      <>
        {submitLoading && (
          <div className="fullscreen-spinner">
            <div className="spinner"></div>
          </div>
        )}

        <div className="schedule_1">
          <div className="left_div" style={{ width: "100%" }}>
            <div className="review_box">
              <p className="title">Confirm Appointment</p>
              <p
                className="title"
                style={{
                  fontSize: "20px",
                  marginTop: "20px",
                }}
              >
                Payment Method
              </p>

              <span style={{ marginTop: "20px" }} className="mob">
                You won't be charged now , payment will be collected in store
                after your appointment.
              </span>
              <form onSubmit={submitHandler}>
                <PaymentElement />

                <div className="content" style={{ width: "100%" }}>
                  <p>
                    <strong>Cancellation policy</strong>
                  </p>
                  <p className="desc">
                    Cancel for free up to <strong>48 hours</strong> ahead ,
                    otherwise you will be charged <strong>50%</strong> of the
                    service price for late cancellation or <strong>100%</strong>{" "}
                    for not showing up.
                  </p>
                </div>

                <div
                  className="content"
                  style={{ width: "100%", marginTop: "20px" }}
                >
                  <p>
                    {" "}
                    <strong>Important info</strong>{" "}
                  </p>
                  <p className="desc">
                    Please understand that when you forget or cancel your
                    appointment without giving enough notice, we miss the
                    opportunity to fill that appointment time, and clients on
                    our waiting list miss the opportunity to receive services.{" "}
                    <br /> Appointments are confirmed 48 hours in advance
                    because we know how easy it is to forget an appointment you
                    booked months ago. Since the services are reserved for you
                    personally, a cancellation fee will apply if you no show.
                  </p>
                </div>
                <div className="checked_check">
                  <input type="checkbox" required />
                  <p>I agree with cancellation policy</p>
                </div>

                <button
                  style={btnStyle}
                  type="submit"
                  disabled={!stripe || loading}
                >
                  Confirm
                </button>

                {errorMessage && <div>{errorMessage}</div>}
              </form>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <IntentComponent />
    </Elements>
  );
};

export default CardSave;
