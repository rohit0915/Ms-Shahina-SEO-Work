/** @format */

import React from "react";
import StripeComp from "./StripeComp";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

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

const MainStripe = ({hasAppointmentTime}) => {
  return (
    <Elements stripe={stripePromise} options={options}>
      <StripeComp hasAppointmentTime={hasAppointmentTime}  />
    </Elements>
  );
};

export default MainStripe;
