/** @format */

import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutIntent from "./CheckoutIntent";

const stripePromise = loadStripe(process.env.React_App_Stripe_Published_Key);

const CheckElement = ({
  pickUpFromStore,
  deliveryAddressPresent,
  hasProducts,
  hasGiftCard,
  checkoutText
}) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutIntent
        pickUpFromStore={pickUpFromStore}
        deliveryAddressPresent={deliveryAddressPresent}
        hasProducts={hasProducts}
        hasGiftCard={hasGiftCard}
        checkoutText={checkoutText}
      />
    </Elements>
  );
};

export default CheckElement;
