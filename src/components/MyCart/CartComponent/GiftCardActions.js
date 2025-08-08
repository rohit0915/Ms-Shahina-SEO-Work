/** @format */

import React from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

const renderImage = (img) => {
  if (img) {
    return <img src={img?.giftPriceId?.giftId?.image} alt="" loading="lazy" />;
  }
};

const GiftCardActions = ({ hasGiftCard, Items, deleteAction }) => {
  return (
    <>
      {hasGiftCard && <p className="Title">All Gift : </p>}
      {Items?.map((i, index) => (
        <div className="Item" key={index}>
          <div className="item-container">
            <div className="img-container">
              <Link to={`/giftcards`}>{renderImage(i)}</Link>
            </div>
            <div className="content">
              <Link to={`/giftcards`}>
                <p className="title"> {i.giftPriceId?.giftId?.name} </p>
              </Link>

              <button onClick={() => deleteAction(i.giftPriceId?._id)}>
                {" "}
                <RiDeleteBin6Fill /> DELETE GIFT CARD
              </button>
            </div>

            <div className="price_div">
              <p className="sellingPrice">${i?.subTotal}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default GiftCardActions;
