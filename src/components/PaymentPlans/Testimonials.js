/** @format */

import React, { useEffect, useState } from "react";
import { getReviews } from "../../Repository/Api";
import { ViewDescription } from "../../Helper/Herlper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Pagination, Autoplay, Keyboard } from "swiper/modules";

const Testimonials = () => {
  const [response, setResponse] = useState([]);

  function fetchHandler() {
    getReviews(setResponse);
  }

  useEffect(() => {
    fetchHandler();
  }, []);

  const swiperConfig = {
    spaceBetween: 20,
    slidesPerView: "auto",
    loop: true,
    grabCursor: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: true,
      pauseOnMouseEnter: true,
    },
    keyboard: {
      enabled: true,
    },
  };

  return (
    response?.length > 0 && (
      <section className="MaxComponent">
        <div className="testimonial_container">
          <Swiper
            {...swiperConfig}
            pagination={true}
            modules={[Pagination, Autoplay, Keyboard]}
          >
            {response?.map((i, index) => (
              <SwiperSlide
                key={index}
                style={{ maxWidth: "450px", width: "100%" }}
              >
                <div className="Testimonial-Box">
                  <h5>{i.userName}</h5>
                  <ViewDescription description={i.description} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    )
  );
};

export default Testimonials;
