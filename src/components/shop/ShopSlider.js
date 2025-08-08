/** @format */

import React, { useState, useEffect } from "react";
import {
  getAllBrands,
  getAllNutrition,
  getProductType,
  getSkinCondition,
  getSkinType,
} from "../../Repository/Api";
import ItemCard from "./ItemCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Autoplay, Keyboard } from "swiper/modules";

export const SkinTypeSlider = () => {
  const [response, setResponse] = useState([]);

  function fetchHandler() {
    getSkinType(setResponse);
  }
  useEffect(() => {
    fetchHandler();
  }, []);

  const swiperConfig = {
    spaceBetween: 20,
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
    keyboard: {
      enabled: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 4,
      },
    },
  };

  return (
    response && (
      <>
        <div style={{ overflow: "hidden", maxWidth: "1400px", margin: "auto" }}>
          <Swiper {...swiperConfig} modules={[Autoplay, Keyboard]}>
            {response?.map((item, i) => (
              <SwiperSlide key={i}>
                <ItemCard
                  src={item.image}
                  styles={"w-80 h-80 text-4xl"}
                  type={item.name}
                  link={`/skin-type/${item.slug}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </>
    )
  );
};

export const ProductTypeSlider = () => {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    getProductType(setResponse);
  }, []);

  const swiperConfig = {
    spaceBetween: 20,
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
    keyboard: {
      enabled: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 5,
      },
    },
  };

  return (
    response && (
      <div style={{ overflow: "hidden", maxWidth: "1400px", margin: "auto" }}>
        <Swiper {...swiperConfig} modules={[Autoplay, Keyboard]}>
          {response?.map((item, i) => (
            <SwiperSlide key={i}>
              <ItemCard
                src={item.image}
                styles={"w-60 h-60"}
                baseType={item.name}
                link={`/product-type/${item.slug}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  );
};

export const BrandsSlider = ({ isBrand }) => {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    getAllBrands(setResponse);
  }, []);

  const swiperConfig = {
    spaceBetween: 20,
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
    keyboard: {
      enabled: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 5,
      },
    },
  };

  return (
    response && (
      <div style={{ overflow: "hidden", maxWidth: "1400px", margin: "auto" }}>
        <Swiper {...swiperConfig} modules={[Autoplay, Keyboard]}>
          {response?.map((item, i) => (
            <SwiperSlide key={i}>
              <ItemCard
                src={item.image}
                isBrand={isBrand}
                styles={`${
                  isBrand
                    ? "w-60 h-60 text-2xl text-center"
                    : "isBrand_container"
                }`}
                link={`/brands/${item.slug}`}
                largeCardType={item.name}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  );
};

export const SkinConditionsSlider = () => {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    getSkinCondition(setResponse);
  }, []);

  const swiperConfig = {
    spaceBetween: 20,
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
    keyboard: {
      enabled: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 5,
      },
    },
  };
  return (
    response && (
      <div style={{ overflow: "hidden", maxWidth: "1400px", margin: "auto" }}>
        <Swiper {...swiperConfig} modules={[Autoplay, Keyboard]}>
          {response?.map((item, i) => (
            <SwiperSlide key={i}>
              <ItemCard
                src={item.image}
                styles={"w-60 h-60"}
                baseType={item.name}
                link={`/skin-conditions/${item.slug}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  );
};

export const NutritionSlider = () => {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    getAllNutrition(setResponse);
  }, []);

  const swiperConfig = {
    spaceBetween: 20,
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
    keyboard: {
      enabled: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 4,
      },
    },
  };

  return (
    response && (
      <div style={{ overflow: "hidden", maxWidth: "1200px", margin: "auto" }}>
        <Swiper {...swiperConfig} modules={[Autoplay, Keyboard]}>
          {response?.map((item, i) => (
            <SwiperSlide key={i}>
              <ItemCard
                src={item.image}
                styles={"w-60 h-60"}
                nutritionType={item.name}
                link={`/nutrition/${item.slug}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  );
};
