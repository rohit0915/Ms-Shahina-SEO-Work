/** @format */

import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { ImageLazyLoading } from '../../../utils/helpingComponent'

const FBPActions = ({ Items, QuantityAction, DeleteAction }) => {
  function isImage(item) {
    if (item) {
      return (
        <ImageLazyLoading
          img={item.productId?.productImages?.[0]?.image}
          alt={item.productId?.name}
          className="Image"
        />
      );
    }
  }

  return Items?.map((item, index) => (
    <div className="frequently-bought FrequentlyInCart" key={index}>
      <div className="container">
        <div className="left">
          {item?.products?.map(
            (i) =>
              i.select === true && (
                <>
                  {isImage(i)}
                  <img
                    src="/Image/96.png"
                    className="plus"
                    alt=""
                    loading="lazy"
                  />
                </>
              )
          )}
        </div>
        <div className="right">
          <p className="price">${item?.subTotal} </p>
          <div className="Quantity">
            <div className="qty" style={{ justifyContent: "flex-end" }}>
              <span
                className="input cursor-pointer"
                onClick={() => {
                  if (item.quantity > 1) {
                    QuantityAction(
                      item?.frequentlyBuyProductId,
                      item?.quantity - 1
                    );
                  }
                }}
              >
                <AiOutlineMinus />
              </span>
              <span className="item"> {item.quantity} </span>
              <span
                className="input cursor-pointer"
                onClick={() => {
                  QuantityAction(
                    item?.frequentlyBuyProductId,
                    item?.quantity + 1
                  );
                }}
              >
                <AiOutlinePlus />
              </span>
            </div>
          </div>

          <button
            className="delete"
            onClick={() => {
              DeleteAction(item?.frequentlyBuyProductId);
            }}
          >
            {" "}
            <RiDeleteBin6Fill /> DELETE ITEM
          </button>
        </div>
      </div>
    </div>
  ));
};

export default FBPActions;
