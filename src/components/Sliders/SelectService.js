/** @format */

import React from "react";
import Slider from "react-slick";

const SelectService = ({ data, id, setId }) => {
  var settings = {
    dots: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    infinite: true,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="Slider_Container">
      <Slider {...settings} className="w-full MaxComponent Service_Slider">
        <p className={"All" === id && "active"} onClick={() => setId("All")}>
          All
        </p>
        <p
          className={"Limited" === id && "active"}
          onClick={() => setId("Limited")}
        >
          Limited Time Offers
        </p>
        {data?.data?.map((i, index) => (
          <p
            key={index}
            className={i._id === id && "active"}
            onClick={() => setId(i._id)}
          >
            {" "}
            {i.name}{" "}
          </p>
        ))}
      </Slider>
    </div>
  );
};

export default SelectService;
