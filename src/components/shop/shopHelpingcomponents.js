/** @format */

import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import ProductCard from "./ProductCard";
import {
  getAllBrands,
  getAllNutrition,
  getProductType,
  getSkinCondition,
  getSkinType,
} from "../../Repository/Api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Pagination, Autoplay, Keyboard } from "swiper/modules";
import { useNavigate } from "react-router-dom";

export const SkinType = () => {
  const [response, setResponse] = useState([]);

  function fetchHandler() {
    getSkinType(setResponse);
  }
  useEffect(() => {
    fetchHandler();
  }, []);

  const swiperConfig = {
    spaceBetween: 20,
    slidesPerView: "auto",
    loop: true,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    keyboard: {
      enabled: true,
    },
  };

  return (
    response?.length > 0 && (
      <div className="SkinType_Container  padingation_another MaxComponent">
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          {...swiperConfig}
          modules={[Pagination, Autoplay, Keyboard]}
        >
          {response?.map((item, i) => (
            <SwiperSlide key={i} style={{ width: "20rem" }}>
              <ItemCard
                key={i}
                src={item.image}
                styles={"w-80 h-80 text-4xl"}
                type={item.name}
                link={`/skin-type/${item.slug}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  );
};

export const ProductType = () => {
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
      900: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 5,
      },
    },
  };

  return (
    response?.length > 0 && (
      <div className="SkinType_Container padingation_another MaxComponent">
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          {...swiperConfig}
          modules={[Pagination, Autoplay, Keyboard]}
        >
          {response?.map((item, i) => (
            <SwiperSlide key={i}>
              <ItemCard
                key={i}
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

export const Brands = () => {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    getAllBrands(setResponse);
  }, []);

  return (
    response?.length > 0 && (
      <div className={` New_Brand_Container `}>
        {response?.map((item, i) => (
          <BrandCards
            key={i}
            src={item.image}
            largeCardType={item.name}
            link={`/brands/${item.slug}`}
          />
        ))}
      </div>
    )
  );
};

export const SkinConditions = () => {
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
      pauseOnMouseEnter: true,
    },
    keyboard: {
      enabled: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      900: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 5,
      },
    },
  };

  return (
    response?.length > 0 && (
      <div className="SkinType_Container padingation_another MaxComponent">
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          {...swiperConfig}
          modules={[Pagination, Autoplay, Keyboard]}
        >
          {response?.map((item, i) => (
            <SwiperSlide key={i}>
              <ItemCard
                key={i}
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

export const Nutrition = () => {
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
      pauseOnMouseEnter: true,
    },
    keyboard: {
      enabled: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      900: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 4,
      },
    },
  };

  return (
    response?.length > 0 && (
      <div className="SkinType_Container  padingation_another MaxComponent ">
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          {...swiperConfig}
          modules={[Pagination, Autoplay, Keyboard]}
        >
          {response?.map((item, i) => (
            <SwiperSlide key={i}>
              <ItemCard
                key={i}
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

export const Products = ({ data }) => {
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
    data?.length > 0 && (
      <div className="customer_fav">
        <Swiper
          {...swiperConfig}
          pagination={true}
          modules={[Pagination, Autoplay, Keyboard]}
        >
          {data?.map((item) => (
            <SwiperSlide key={item._id}>
              <ProductCard
                id={item._id}
                src={item?.productImages?.[0]?.image}
                title={item.name}
                slug={item.slug}
                price={
                  item.multipleSize === false
                    ? item.price
                    : item.sizePrice?.[0]?.price
                }
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  );
};

export const BrandCards = ({ src, largeCardType, link }) => {
  const navigate = useNavigate();
  return (
    <div
      style={{ backgroundImage: `url(${src})` }}
      onClick={() => navigate(`/allproducts${link}`)}
      className="Item"
    >
      <div className="bg"></div>
      <h3> {largeCardType} </h3>
    </div>
  );
};
