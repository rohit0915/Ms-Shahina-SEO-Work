/** @format */

import React from "react";
import { useDispatch } from "react-redux";
import { openBanner } from "../../store/BannerSlice";

const OfferCard = () => {
  const dispatch = useDispatch();
  const handleOpen = () => {
    dispatch(openBanner());
  };

  return (
    <div className="flex gap-5 bg-secondary items-center justify-between px-3  rounded-md h-full">
      <div className="w-44 xl:w-48 p-2">
        <img
          src="/asessts/specialOffer.webp"
          className="w-full cursor-pointer"
          alt=""
          onClick={() => handleOpen()} loading="lazy"
        />
      </div>
      <div className="flex flex-col gap-3 py-2">
        <h5 className="text-left text-xs font-bold">
          Unlock a Special Treat! 🎉 <br />   Enjoy $50 OFF on your first visit when you
          choose the convenience of booking through our fabulous APP!
        </h5>
        <h5 className="cursor-pointer font-bold" onClick={() => handleOpen()}>
          {"CLICK TO VIEW MORE"}
        </h5>
      </div>
    </div>
  );
};

export default OfferCard;
