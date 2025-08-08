/** @format */

import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBin6Fill } from "react-icons/ri";

const renderImage = (i) => {
  if (i) {
    return <img src={i.addOnservicesId?.image} alt={i.addOnservicesId?.name} loading="lazy" />;
  }
};

const AdOnActions = ({ Items, QuantityAction, DeletAction }) => {
  return (
    <>
      {Items?.map((i, index) => (
        <div className="Item" key={index}>
          <div className="item-container">
            <div className="img-container">{renderImage(i)} </div>
            <div className="content">
              <p className="title"> {i.addOnservicesId?.name} </p>

              <div className="Quantity">
                <span className="quant">QTY</span>

                <div className="qty">
                  <span
                    className="input cursor-pointer"
                    onClick={() => {
                      if (i.quantity > 1) {
                        QuantityAction(i.addOnservicesId?._id, i?.quantity - 1);
                      }
                    }}
                  >
                    <AiOutlineMinus />
                  </span>
                  <span className="item"> {i.quantity} </span>
                  <span
                    className="input cursor-pointer"
                    onClick={() => {
                      QuantityAction(i.addOnservicesId?._id, i?.quantity + 1);
                    }}
                  >
                    <AiOutlinePlus />
                  </span>
                </div>
              </div>

              <button onClick={() => DeletAction(i.addOnservicesId?._id)}>
                {" "}
                <RiDeleteBin6Fill /> DELETE SERVICE
              </button>
            </div>

            <div className="price_div">
              <p className="sellingPrice">${i.price}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AdOnActions;
