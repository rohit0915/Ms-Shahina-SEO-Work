/** @format */
import React from "react";
import { createRoot } from "react-dom/client"; // ✅ Correct
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "react-calendar/dist/Calendar.css";
import "react-notifications-component/dist/theme.css";
import "react-phone-input-2/lib/style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.React_App_Stripe_Published_Key);

const Component = (
  <Elements stripe={stripePromise}>
    <Provider store={store}>
      <App />
    </Provider>
  </Elements>
);

const container = document.getElementById("root");
const root = createRoot(container); // ✅ This is the modern API
root.render(Component); // ✅ Correct way to render
