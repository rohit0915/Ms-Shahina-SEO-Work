/** @format */

import React, { useEffect, useState } from "react";
import { getApi } from "../../Repository/Api";
import { ImageLazyLoading } from "../../utils/helpingComponent";
import OfferDrawer from "../Drawer/OfferDrawer";

const LimitedOffer = () => {
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState([]);

  useEffect(() => {
    getApi({
      url: "api/v1/Banner/getBanner/offer",
      setResponse,
    });
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const OfferComponent = () => {
    if (response?.data?.[0]?.bannerImage) {
      return (
        <div className="Limited_offer" onClick={() => showDrawer()}>
          <ImageLazyLoading img={response?.data?.[0]?.bannerImage} alt={""} />
        </div>
      );
    }
  };

  return (
    <>
      <OfferDrawer onClose={onClose} open={open} />
      {OfferComponent()}
    </>
  );
};

export default LimitedOffer;
