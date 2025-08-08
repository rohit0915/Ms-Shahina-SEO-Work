/** @format */

import React, { useEffect, useState } from "react";
import { ImageLazyLoading } from "../../utils/helpingComponent";
import ServiceDrawer from "../Drawer/ServiceDrawer";

const ServiceCard = ({ src, service, slug, id, name }) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (slug === name) {
      setOpen(true);
    }
  }, [service, name]);

  return (
    <>
      <ServiceDrawer onClose={onClose} open={open} title={service} id={id} />
      <div className="m-2 Component">
        <div className="relative w-full h-[30rem] xl:h-[39rem] Items">
          <ImageLazyLoading
            img={src}
            alt={service}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute top-0 w-full h-full cursor-pointer"
            onClick={() => showDrawer()}
            style={{ zIndex: 2 }}
          >
            <p className="absolute bottom-20 left-0 right-0 text-center text-[#e5d896] text-4xl font-medium Normal_Title">
              {service}
            </p>
          </div>

          <div className="bg-taker"></div>
        </div>
      </div>
    </>
  );
};

export default ServiceCard;
