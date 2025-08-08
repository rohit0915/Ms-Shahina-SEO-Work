/** @format */

import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

const renderImage = (item) => {
  if (item) {
    return (
      <img
        src={item.serviceId?.images?.[0]?.img}
        alt={item?.serviceId?.name}
        loading="lazy"
      />
    );
  }
};

const renderPrice = (item) => {
  if (item) {
    return item?.serviceId?.type === "offer"
      ? `$${item?.total}`
      : `$${item?.subTotal}`;
  }
};

const renderSize = (item) => {
  if (item?.size) {
    <p className="sellingPrice" style={{ fontSize: "20px" }}>
      Size : {item?.size}
    </p>;
  }
};

const ServiceActions = ({
  hasService,
  Items,
  QuantityAction,
  DeleteAction,
}) => {
  return (
    <>
      {hasService && <p className="Title">All Services : </p>}

      {Items?.map((i, index) => (
        <div className="Item" key={index}>
          <div className="item-container">
            <div className="img-container">
              <Link
                to={`/service/${i.serviceId?.name}?id=${i?.serviceId?._id}`}
                
              >
                {renderImage(i)}
              </Link>
            </div>
            <div className="content">
              <Link
                to={`/service/${i.serviceId?.name}?id=${i?.serviceId?._id}`}
                
              >
                <p className="title">{i.serviceId?.name} </p>
              </Link>

              <div className="Quantity">
                <span className="quant">QTY</span>
                <div className="qty">
                  <span
                    className="input cursor-pointer"
                    onClick={() => {
                      if (i.quantity > 1) {
                        QuantityAction(i, i.quantity - 1, i.serviceId?._id);
                      }
                    }}
                  >
                    <AiOutlineMinus />
                  </span>
                  <span className="item"> {i.quantity} </span>
                  <span
                    className="input cursor-pointer"
                    onClick={() => {
                      QuantityAction(i, i.quantity + 1, i.serviceId?._id);
                    }}
                  >
                    <AiOutlinePlus />
                  </span>
                </div>
              </div>

              <button
                onClick={() => DeleteAction(i.serviceId?._id, i?.priceId)}
              >
                {" "}
                <RiDeleteBin6Fill /> DELETE SERVICE
              </button>
            </div>

            <div className="price_div">
              <p className="sellingPrice"> {renderPrice(i)} </p>
              {renderSize(i)}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ServiceActions;
