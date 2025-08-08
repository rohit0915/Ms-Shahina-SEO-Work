/** @format */

import React, { useEffect, useState } from "react";
import { Drawer } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  getOfferService,
  getOfferServicebeforeLogin,
} from "../../Repository/Api";
import WithLoader from "../Wrapped/WithLoader";
import { useSelector } from "react-redux";
import { isAuthenticated } from "../../store/authSlice";

const OfferDrawer = ({ open, onClose }) => {
  const [response, setResponse] = useState([]);
  const [load, setLoad] = useState(false);
  const isLoggedIn = useSelector(isAuthenticated);
  const navigate = useNavigate();

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
    if (open) {
      if (isLoggedIn) {
        fetchHandler();
      } else {
        fetchBeforLogin();
      }
    }
  }, [open, isLoggedIn]);

  const navigationHandler = (id) => {
    navigate(`/service/${id}`);
    onClose();
  };

  const Component = () => {
    return (
      <div className="Service_Drawer offer_Drawer">
        <div className="heading">
          <div>
            <img src="/Image/32.png" alt="" loading="lazy" />
            <p>Limited Time Offers</p>
          </div>
          <img
            src="/Image/14.png"
            alt=""
            onClick={() => onClose()}
            loading="lazy"
          />
        </div>

        <div className="product-container">
          {response?.length === 0 ? (
            <div className="Not-Found">
              <img src="/Image/no-results.png" alt="" loading="lazy" />
              <h5> Sorry, we couldn't find any matching services</h5>
            </div>
          ) : (
            response?.map((i, index) => (
              <div className="Items" key={index}>
                <img
                  src={i.images?.[0]?.img}
                  className="thumbnail"
                  alt={i.name}
                  onClick={() => navigationHandler(i._id)}
                  loading="lazy"
                />
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
                <Link to="/paymentplan">
                  CLICK TO LEARN MORE
                </Link>

                <button onClick={() => navigationHandler(i._id)}>
                  VIEW MORE
                </button>
              </div>
            ))
          )}
        </div>
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

export default OfferDrawer;
