/** @format */

import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, LOGOUT } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import MenuOptions from "./MenuOptions";
import { CartItems } from "../../store/cartSlice";
import MobileBar from "../Sidebar/MobileBar";
import { getCart } from "../../Repository/Api";
import { DummyCartItems } from "../../store/DummyCart";
import { ServiceItems } from "../../store/DummySerivce";
import SearchHeader from "../Search/SearchHeader";
import { FaHeart } from "react-icons/fa";
import { HashLink } from "react-router-hash-link";
import { ImageLazyLoading } from "../../utils/helpingComponent";
import OfferBanner from "../OfferBanner/OfferBanner";

const Navbar = () => {
  const isLoggedIn = useSelector(isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cart, setCart] = useState({});
  const myCart = useSelector(CartItems);
  const dummyItem = useSelector(DummyCartItems);
  const [isOpen, setIsOpen] = useState(false);
  const serviceItem = useSelector(ServiceItems);
  const [length, setLength] = useState(0);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getCart());
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      setCart(myCart);
    }
  }, [isLoggedIn, myCart]);

  useEffect(() => {
    if (isLoggedIn) {
      setLength(
        (cart?.AddOnservicesSchema?.length || 0) +
        (cart?.frequentlyBuyProductSchema?.length || 0) +
        (cart?.gifts?.length || 0) +
        (cart?.products?.length || 0) +
        (cart?.services?.length || 0)
      );
    } else {
      setLength(dummyItem?.length + serviceItem?.length);
    }
  }, [cart, dummyItem, serviceItem, isLoggedIn]);

  function LogoutHandler() {
    dispatch(LOGOUT());
    navigate("/login");
  }

  const cartReturner = () => {
    return isLoggedIn ? (
      <>
        <div className="cartCountDiv">
          <HashLink to={"/shop#FAVOURITES"}>
            <FaHeart
              className="text-2xl cursor-pointer"
              style={{ cursor: "pointer" }}
            />
          </HashLink>
        </div>
        <div className="cartCountDiv" onClick={() => navigate("/mycart")}>
          <FaShoppingCart
            className="text-2xl cursor-pointer"
            style={{ cursor: "pointer" }}
          />
          <span> {length} </span>
        </div>
      </>
    ) : (
      <div className="cartCountDiv" onClick={() => navigate("/login")}>
        <FaShoppingCart
          className="text-2xl cursor-pointer"
          style={{ cursor: "pointer" }}
        />
        <span> {length} </span>
      </div>
    );
  };

  const handleToggleOpen = () => {
    setIsOpen(true);
  };


  return (
    <>
      <div className="Nav_Bar" onMouseLeave={() => setIsOpen(false)}>
        <header className="Header">
          <div className="left">
            <Link to={"/"}>
              <ImageLazyLoading
                img={"/asessts/navbar/logo.webp"}
                alt={"Logo"}
              />
            </Link>
          </div>
          <div className="right-container">
            <img
              src="/asessts/navbar/search.webp"
              style={{ cursor: "pointer" }}
              onClick={() => handleToggleOpen()}
              alt="Search products"
              loading="lazy"
            />

            <SearchHeader isOpen={isOpen} setIsOpen={setIsOpen} />

            {cartReturner()}
            {isLoggedIn === true ? (
              <div className="prof-container" style={{ alignItems: "center" }}>
                <Link to={"/my-profile"}>
                  <ImageLazyLoading
                    img={"/asessts/navbar/profile.webp"}
                    alt={"My Profile"}
                  />
                </Link>

                <span
                  className="text-secondary font-medium cursor-pointer"
                  onClick={() => LogoutHandler()}
                >
                  Logout
                </span>
              </div>
            ) : (
              <div className="prof-container">
                <ImageLazyLoading
                  img={"/asessts/navbar/profile.webp"}
                  alt={"Login"}
                />

                <Link
                  className="text-secondary font-medium"
                  to={"/login"}
                  style={{ cursor: "pointer" }}

                >
                  <span style={{ fontSize: "20px" }}>LOGIN</span>
                </Link>
              </div>
            )}

            <Link to={"membership"}>
              <ImageLazyLoading
                img={"/asessts/navbar/crown.webp"}
                alt={"Purchase Membership"}
              />
            </Link>
          </div>
        </header>

        <div
          className="mx-auto mt-5 bigEmptyLine "
          style={{ backgroundColor: "#E5D896", height: "2px", width: "85%" }}
        ></div>
        <MenuOptions />
        <MobileBar />
      </div>
    </>
  );
};

export default Navbar;
