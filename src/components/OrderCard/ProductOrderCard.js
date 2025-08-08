/** @format */

import React from "react";
import { useNavigate } from "react-router-dom";
import { DateFormatter } from "../../utils/helpingComponent";

const ProductOrderCard = ({
  img,
  title,
  price,
  orderID,
  date,
  subTotal,
  membershipDiscount,
  productId,
}) => {
  const navigate = useNavigate();
  return (
    <div className="Items">
      <img src={img} alt="" className="thumb" loading="lazy" />
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
            {title}{" "}
          </p>{" "}
          <p className="title" style={{ fontSize: "24px" }}>
            {" "}
            ${price}
          </p>
        </div>
        <p
          className="orderId"
          style={{
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          Order ID: {orderID}
        </p>{" "}
        {date && (
          <p className="orderId" style={{ color: "#A9A9A9" }}>
            Date: {DateFormatter(date)}
          </p>
        )}
        <p className="orderId" style={{ color: "#A9A9A9" }}>
          {" "}
          Subtotal ${subTotal}
        </p>{" "}
        {membershipDiscount > 0 && (
          <p className="orderId " style={{ color: "#A9A9A9" }}>
            {" "}
            Membership Discount: ${membershipDiscount}
          </p>
        )}{" "}
        <div className="button-container">
          <button
            onClick={() => navigate(`/product/${title}?id=${productId}`)}
            style={{
              background: "#042b26",
              border: "1px solid #042b26",
              color: "#e5d896",
            }}
          >
            View Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductOrderCard;
