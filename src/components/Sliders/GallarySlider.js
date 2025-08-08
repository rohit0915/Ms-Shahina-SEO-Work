/** @format */
import React, { useState } from "react";
import { PiInstagramLogoLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import { pictures } from "../../constants/constant";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { ImageLazyLoading } from "../../utils/helpingComponent";

const GallarySlider = () => {
  const [hover, sethover] = useState(null);

  const swiperConfig = {
    spaceBetween: 0,
    loop: true,
    slidesPerView: "auto",
    keyboard: {
      enabled: true,
    },
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
  };

  return (
    <div className="gallery-slider-container">
      <Swiper {...swiperConfig} modules={[Keyboard, Autoplay]}>
        {pictures?.map((i, index) => (
          <SwiperSlide key={index} style={{ width: "18rem" }}>
            <div
              onMouseEnter={() => sethover(index)}
              onMouseLeave={() => sethover(null)}
              key={index}
              className="relative galler_slider_com "
            >
              <ImageLazyLoading
                img={i}
                alt={"Go To Instagram"}
                className={"gallery-slider-img"}
              />

              {hover === index && (
                <div className="absolute top-0 w-full h-full flex justify-center items-center bg-black bg-opacity-30 ">
                  <Link
                    to={"https://www.instagram.com/nurse.shahina/"}
                    target="_blank"
                    className="flex flex-col gap-2 items-center text-white"
                  
                  >
                    <PiInstagramLogoLight className="text-9xl text-white cursor-pointer" />
                    <span className="text-lg font-normal">
                      VIEW ON INSTAGRAM
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GallarySlider;
