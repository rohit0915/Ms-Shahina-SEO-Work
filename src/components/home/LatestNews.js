/** @format */

import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import { getApi } from "../../Repository/Api";
import { useNavigate } from "react-router-dom";
import WithLoader from "../Wrapped/WithLoader";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Pagination, Autoplay, Keyboard } from "swiper/modules";

const LatestNews = () => {
  const [response, setResponse] = useState({});
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getApi({
      url: "api/v1/News/getNews",
      setResponse,
      setLoading: setLoad,
    });
  }, []);

  const swiperConfig = {
    spaceBetween: 20,
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 2000,
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
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  };

  const Component = () => {
    return (
      response?.data?.length > 0 && (
        <section className=" Home_Three_Sec  MaxComponent mt-24 ">
          <div className="flex flex-col gap-7 items-center">
            <h1 className="text-4xl text-primary font-bold  bg-secondary w-full text-center  py-4 text-4xl font-medium text-primary title latest_blog_title ">
              Latest Blogs{" "}
            </h1>
          </div>

          <div className="latest_news_swiper mt-3">
            <Swiper
              {...swiperConfig}
              pagination={true}
              modules={[Pagination, Autoplay, Keyboard]}
            >
              {response?.data?.map((card, index) => (
                <SwiperSlide key={index}>
                  <NewsCard
                    key={index}
                    src={card.image}
                    title={card.title}
                    content={card.description}
                    id={card._id}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="flex justify-center my-24 viewMore-Container">
            <button
              className="w-1/4 py-2 font-bold text-primary bg-secondary viewMore"
              onClick={() => navigate("/allNews")}
            >
              VIEW MORE
            </button>
          </div>
        </section>
      )
    );
  };

  return <WithLoader Wrapped={Component} loading={load} />;
};

export default LatestNews;
