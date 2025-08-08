/** @format */
import React, { useState } from "react";
import {  placeOrder, showMsg } from "../../Repository/Api";
import axios from "axios";
import { Link } from "react-router-dom";

const CheckoutIntent = ({
  pickUpFromStore,
  deliveryAddressPresent,
  hasProducts,
  hasGiftCard,
  checkoutText,
}) => {
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);

  const Baseurl = process.env.React_App_Baseurl;

  let orderId;

  const btnStyle = {
    backgroundColor: "#000",
    color: "#fff",
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #000",
    width: "200px",
    display: "block",
    margin: "auto",
    marginTop: "15px",
  };

  const messageCaster = () => {
    if (pickUpFromStore === false && !deliveryAddressPresent) {
      return (
        <Link
          to="/my-profile"
          className="block text-center w-full mt-3"
          style={{ color: "blue", textDecoration: "underline" }}
         
        >
          Please add shipping address
        </Link>
      );
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        `${Baseurl}api/v1/checkout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      const id = response.data?.data?.orderId;
      orderId = id;
    } catch (e) {
      console.log(e);
      const msg = e?.response?.data?.message;
      showMsg("", msg, "info");
    }
  };

  const handleCheckoutAndPlaceOrder = async () => {
    setLoading(true);
    try {
      await handleCheckout();
      await placeOrder(orderId);
      
    } catch (e) {
      console.log(e);
    }
  };

  const handleGiftCardCheckout = () => {
    handleCheckoutAndPlaceOrder();
  };

  const handleProductCheckout = async () => {
    if (pickUpFromStore === true) {
      handleCheckoutAndPlaceOrder();
    } else if (
      pickUpFromStore === false &&
      deliveryAddressPresent !== null &&
      deliveryAddressPresent !== undefined
    ) {
      handleCheckoutAndPlaceOrder();
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (hasGiftCard && !hasProducts) {
      setClicked(false);
      handleGiftCardCheckout();
    } else {
      setClicked(true);
      handleProductCheckout();
    }
  };

  return (
    <>
      {loading && (
        <div className="fullscreen-spinner">
          <div className="spinner"></div>
        </div>
      )}
      <form onSubmit={submitHandler}>
        <button style={btnStyle}> {checkoutText} </button>
        {clicked && messageCaster()}
      </form>
    </>
  );
};

export default CheckoutIntent;
