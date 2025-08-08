/** @format */

import React, { useCallback, useEffect, useState } from "react";
import { Drawer } from "antd";
import { Link } from "react-router-dom";
import { getApi } from "../../Repository/Api";
import { useSelector } from "react-redux";
import { isAuthenticated } from "../../store/authSlice";
import WithLoader from "../Wrapped/WithLoader";
import { ImageLazyLoading } from "../../utils/helpingComponent";
import endPoints from "../../Repository/apiConfig";

const ServiceDrawer = ({ open, onClose, title }) => {
  const [response, setResponse] = useState([]);
  const [load, setLoad] = useState(false);
  const isLoggedIn = useSelector(isAuthenticated);

  const fetchService = useCallback(() => {
    const queryParams = new URLSearchParams({
      categoryId: title,
    });
    const beforeLoginUrl = endPoints.service.getServiceByCategoryBeforeLogin(
      queryParams?.toString()
    );
    const afterLoginUrl = endPoints.service.getServiceByCategoryAfterLogin(
      queryParams?.toString()
    );
    const url = isLoggedIn ? afterLoginUrl : beforeLoginUrl;

    getApi({
      url: url,
      setLoading: setLoad,
      setResponse,
    });
  }, [title, isLoggedIn]);

  useEffect(() => {
    if (open) {
      fetchService();
    }
  }, [open, fetchService]);

  function priceFetcher(i) {
    if (i.multipleSize === false) {
      return (
        <>
          <span className="price-container">
            <p className="member" style={{ color: "red" }}>
              Member Price
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
              ${i.mPrice}{" "}
            </p>
            <span className="mrp" style={{ textDecoration: "none" }}>
              ${i.price}{" "}
            </span>
          </span>
        </>
      );
    } else {
      const smallestPriceObject = i?.sizePrice?.reduce(
        (minPriceObject, currentObject) => {
          if (currentObject.mPrice < minPriceObject.mPrice) {
            return currentObject;
          } else {
            return minPriceObject;
          }
        },
        i?.sizePrice?.[0]
      );

      return (
        <>
          <span className="price-container">
            <p className="member" style={{ color: "red" }}>
              Member Price
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
              ${smallestPriceObject?.mPrice}{" "}
            </p>
            <span className="mrp" style={{ textDecoration: "none" }}>
              ${smallestPriceObject?.price}{" "}
            </span>
          </span>
        </>
      );
    }
  }

  const Component = () => {
    function getHead() {
      if (title === "IV Injections") {
        return "IV Injections";
      } else {
        return `${title} Treatments`;
      }
    }

    return (
      <div className="Service_Drawer">
        <div className="heading">
          <p> {getHead()}</p>
          <ImageLazyLoading
            img={"/Image/14.png"}
            alt="Close"
            onClick={() => onClose()}
          />
        </div>

        {response ? (
          <div className="product-container">
            {(response?.data?.docs || response?.data)?.map((i, index) => (
              <div className="Items" key={index}>
                <Link to={`/service/${i.slug}`}>
                  <ImageLazyLoading
                    img={i.images?.[0]?.img}
                    alt={i?.name}
                    className="thumbnail"
                  />
                </Link>
                <p className="title"> {i.name} </p>
                {priceFetcher(i)}
                <p className="interes">
                  Pay with interest free installments with Cherry
                </p>
                <a href="/paymentplan">CLICK TO LEARN MORE</a>
                <Link to={`/service/${i.slug}`}>
                  <button>VIEW MORE</button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="Not-Found">
            <ImageLazyLoading
              img={"/Image/no-results.png"}
              alt={"No results"}
              className=""
            />
            <h5> Sorry, we couldn't find any matching services</h5>
          </div>
        )}
      </div>
    );
  };

  return (
    <Drawer
      placement="bottom"
      closable={false}
      onClose={onClose}
      open={open}
      size={"large"}
    >
      <WithLoader Wrapped={Component} loading={load} />
    </Drawer>
  );
};

export default ServiceDrawer;
