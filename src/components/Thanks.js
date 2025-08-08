/** @format */

import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUserOrder, orderSuccess } from "../Repository/Api";
import Loader from "./Loader/Loader";
import DynamicHelmet from "./Helmet/DynamicHelmet";

const Thanks = () => {
  const { id } = useParams();
  const [giftCardPresent, setGiftCardPresent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id && giftCardPresent) {
      getUserOrder(id, setData);
    }
  }, [id, giftCardPresent]);

  const couponCode = data?.data?.coupanData?.code;

  const fetchHandler = useCallback(() => {
    dispatch(
      orderSuccess({
        id,
        navigate,
        setLoading,
        setGiftCardPresent,
      })
    );
  }, [dispatch, id, navigate]);

  useEffect(() => {
    if (id) {
      fetchHandler();
    }
  }, [id, fetchHandler]);

  return (
    <>
      <DynamicHelmet />
      {loading ? (
        <Loader />
      ) : id === "failed" ? (
        <div className="Thanks_Container">
          <p className="desc" style={{ textTransform: "none" }}>
            We apologize, but there was an issue processing your order. <br />
            Please check your payment details and try again. If the problem
            persists, contact customer support for assistance.
          </p>
          <Link to="/mycart" style={{ cursor: "pointer" }}>
            <button>RETURN TO CART</button>
          </Link>
        </div>
      ) : giftCardPresent ? (
        <div className="Thanks_Container">
          <p className="title" style={{ textTransform: "none" }}>
            Thank you for your gift card purchase!
          </p>
          <p className="desc" style={{ textTransform: "none" }}>
            We look forward to serving you and hope to exceed your expectations.
          </p>
          <p className="desc">GIFT CARD CODE : {couponCode}</p>
          <Link to="/mycart" style={{ cursor: "pointer" }}>
            <button>RETURN TO CART</button>
          </Link>
        </div>
      ) : (
        <div className="Thanks_Container">
          <p className="title" style={{ textTransform: "none" }}>
            Thank you for your order!
          </p>
          <p className="desc" style={{ textTransform: "none" }}>
            Your order is confirmed. Please check your email for further
            information.
          </p>
          <Link to="/mycart" style={{ cursor: "pointer" }}>
            <button>RETURN TO CART</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Thanks;
