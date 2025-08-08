/** @format */

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getApi } from "../../Repository/Api";
import { isAuthenticated } from "../../store/authSlice";
import { ImageLazyLoading } from "../../utils/helpingComponent";
import endPoints from "../../Repository/apiConfig";

const HeroSection = () => {
  const isLoggedIn = useSelector(isAuthenticated);
  const [data, setData] = useState({});
  const [item, setItem] = useState({});

  useEffect(() => {
    getApi({
      url: endPoints.banner.homepageBanner,
      setResponse: setData,
    });
  }, []);

  useEffect(() => {
    if (data) {
      setItem(data?.data?.[0]);
    }
  }, [data]);

  return (
    item && (
      <div className="Home_Hero_Section ">
        <div className="left-container ">
          <h1> {item?.title} </h1>
          <ul>
            {item?.description?.map((i, index) => (
              <li key={index}>{i} </li>
            ))}
          </ul>
          {isLoggedIn ? (
            <Link to="/schedule1">
              <button>BOOK ONLINE </button>
            </Link>
          ) : (
            <Link to="/appointment">
              <button>BOOK ONLINE </button>
            </Link>
          )}
        </div>
        <div className="Image_container">
          <ImageLazyLoading
            img={item?.bannerImage}
            alt={"Shahina Hoja"}
            className="Hero_Imgl"
          />
        </div>
      </div>
    )
  );
};

export default HeroSection;
