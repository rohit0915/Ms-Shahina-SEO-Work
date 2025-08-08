/** @format */

import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

const ProductActions = ({
  hasProducts,
  products,
  QuantityAction,
  deleteAction,
}) => {
  function showImage(item) {
    if (item.productId?.productImages?.[0]?.image) {
      return (
        <img
          src={item.productId?.productImages?.[0]?.image}
          alt=""
          loading="lazy"
        />
      );
    }
  }

  return (
    <>
      {hasProducts && <p className="Title">All Products : </p>}

      {products?.map((i, index) => (
        <div className="Item" key={index}>
          <div className="item-container">
            <div className="img-container">
              <Link
                to={`/product/${i.productId?.name}?id=${i?.productId?._id}`}
              >
                {showImage(i)}
              </Link>
            </div>
            <div className="content">
              <Link
                to={`/product/${i.productId?.name}?id=${i?.productId?._id}`}
              >
                <p className="title"> {i.productId?.name} </p>
              </Link>

              <div className="Quantity">
                <span className="quant">QTY</span>

                <div className="qty">
                  <span
                    className="input cursor-pointer"
                    onClick={() => {
                      if (i.quantity > 1) {
                        QuantityAction(
                          i.productId?._id,
                          i?.quantity - 1,
                          i.size,
                          i.priceId,
                          i.sizePrice
                        );
                      }
                    }}
                  >
                    <AiOutlineMinus />
                  </span>
                  <span className="item"> {i.quantity} </span>
                  <span
                    className="input cursor-pointer"
                    onClick={() => {
                      QuantityAction(
                        i.productId?._id,
                        i?.quantity + 1,
                        i.size,
                        i.priceId,
                        i.sizePrice
                      );
                    }}
                  >
                    <AiOutlinePlus />
                  </span>
                </div>
              </div>

              <button onClick={() => deleteAction(i.productId?._id)}>
                {" "}
                <RiDeleteBin6Fill /> DELETE ITEM
              </button>
            </div>

            <div className="price_div">
              <p className="sellingPrice"> ${i.subTotal}</p>
              {i.size && (
                <p className="sellingPrice" style={{ fontSize: "20px" }}>
                  Size : {i.size}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductActions;
