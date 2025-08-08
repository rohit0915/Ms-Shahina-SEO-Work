/** @format */

import React, { useEffect, useState } from "react";
import { getApi } from "../../Repository/Api";
import { ImageLazyLoading } from "../../utils/helpingComponent";
import endPoints from "../../Repository/apiConfig";

const Reviews = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    getApi({
      url: endPoints.getContactDetail,
      setResponse: setData,
    });
  }, []);

  return (
    <div className="Review_Title_Container ">
      <h1>Client Reviews</h1>
      <p>
        We are very proud of the service we provide and stand by every product
        we carry. We work hard to address our client's needs and have them leave
        our spa loving their skin. That's why over {data?.data?.numOfReviews}{" "}
        people have given us a 5-star rating on Google!
      </p>
      <a href="https://surl.li/itcqtk" target="_blank" rel="noopener noreferrer">
        <ImageLazyLoading
          img={"/asessts/google-review.webp"}
          alt={"Google Rating"}
        />
      </a>
    </div>
  );
};

export default Reviews;
