/** @format */

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getApi,
  getOfferService,
  getOfferServicebeforeLogin,
} from "../../Repository/Api";
import WithLoader from "../Wrapped/WithLoader";
import { useSelector } from "react-redux";
import { isAuthenticated } from "../../store/authSlice";
import DynamicHelmet from "../Helmet/DynamicHelmet";
import { ImageLazyLoading } from "../../utils/helpingComponent";
import endPoints from "../../Repository/apiConfig";

const LimitedDeals = () => {
  const [response, setResponse] = useState([]);
  const [load, setLoad] = useState(false);
  const [metaResponse, setMetaResponse] = useState(null);
  const isLoggedIn = useSelector(isAuthenticated);
  const navigate = useNavigate();

  const fetchMetaTags = () => {
    getApi({
      url: endPoints.metaTags.limitedDealsPage,
      setResponse: setMetaResponse,
    });
  };

  useEffect(() => {
    fetchMetaTags();
  }, []);

  async function fetchHandler() {
    try {
      setLoad(true);
      await getOfferService(setResponse);
      setLoad(false);
    } catch (e) {
      console.log(e);
    } finally {
      setLoad(false);
    }
  }

  async function fetchBeforLogin() {
    try {
      setLoad(true);
      await getOfferServicebeforeLogin(setResponse);
      setLoad(false);
    } catch (e) {
      console.log(e);
    } finally {
      setLoad(false);
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      fetchHandler();
    } else {
      fetchBeforLogin();
    }
  }, [isLoggedIn]);

  const navigationHandler = (id, name) => {
    navigate(`/service/${name}?id=${id}`);
  };

  const Component = () => {
    return (
      <div className="Service_Drawer offer_Drawer" style={{ padding: "20px" }}>
        {metaResponse && (
          <DynamicHelmet
            title={metaResponse?.data?.title}
            description={metaResponse?.data?.description}
          />
        )}
        <div className="heading" style={{ position: "relative" }}>
          <ImageLazyLoading
            img={"/Image/1.png"}
            onClick={() => navigate(-1)}
            alt={"Go Back"}
            className={"text-[10px]"}
          />
          <div>
            <ImageLazyLoading img={"/Image/32.png"} alt={"Limited Icon"} />
            <p>Limited Time Offers</p>
          </div>
        </div>

        <div className="product-container">
          {response?.length === 0 ? (
            <div className="Not-Found">
              <ImageLazyLoading
                img={"/Image/no-results.png"}
                alt={"no result"}
              />
              <h5> Sorry, we couldn't find any matching services</h5>
            </div>
          ) : (
            response?.map((i, index) => (
              <div className="Items" key={index} style={{ marginTop: 0 }}>
                <Link to={`/service/${i.name}?id=${i._id}`}>
                  <div
                    className="thumbnail_second"
                    style={{ backgroundImage: `url(${i.images?.[0]?.img})` }}
                  />
                </Link>

                <p className="title"> {i.name} </p>
                <span className="price-container">
                  <p className="member" style={{ color: "red" }}>
                    Limited Offer
                  </p>
                  <span
                    className="mrp"
                    style={{
                      fontSize: "16px",
                      color: "#000",
                      textDecoration: "none",
                    }}
                  >
                    Regular Price{" "}
                  </span>
                </span>
                <span className="price-container">
                  <p className="member-price" style={{ color: "red" }}>
                    ${i.discountPrice}{" "}
                  </p>
                  <span className="mrp">${i.price} </span>
                </span>

                <p className="interes">
                  Pay with interest free installments with Cherry
                </p>
                <a href="/paymentplan">CLICK TO LEARN MORE</a>
                <button onClick={() => navigationHandler(i._id, i.name)}>
                  VIEW MORE
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  return <WithLoader Wrapped={Component} loading={load} />;
};

export default LimitedDeals;
