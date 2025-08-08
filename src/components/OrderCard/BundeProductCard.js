/** @format */

import React from "react";
import { useNavigate } from "react-router-dom";
import { DateFormatter } from "../../utils/helpingComponent";

const BundeProductCard = ({
  img,
  products,
  price,
  orderId,
  subTotal,
  membershipDiscount,
  date,
  productId,
}) => {
  const navigate = useNavigate();
  return (
    <div className="Items">
      <img src={img} alt="" className="thumb" loading="lazy" />
      <div className="content">
        <div className="Related_Product_Container">
          <p className="title Related_Product" style={{ margin: 0 }}>
            {products?.map((product, index) => (
              <>
                <span> {product.name} </span>
                <img
                  src="/Image/96.png"
                  key={`Product_Image_Carousel_Images_Img${index}`}
                  className="plus"
                  alt=""
                  loading="lazy"
                />
              </>
            ))}
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
          Order ID: ${orderId}
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
            onClick={() =>
              navigate(
                `/product/${products?.[0]?.name}?id=${products?.[0]?._id}`
              )
            }
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

export default BundeProductCard;
