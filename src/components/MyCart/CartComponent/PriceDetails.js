/** @format */

import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { Call, Mail } from "../../Helping/Mail";
import { AiFillInstagram } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import { BiCurrentLocation } from "react-icons/bi";
import { Link } from "react-router-dom";
import CheckoutSection from "./CheckoutSection";
import CheckElement from "../../Checkout/CheckElement";
import rightCaret from "../../../assest/Images/arrow-right-solid.svg";
import { edit_module_redux, getCart } from "../../../Repository/Api";
import { useDispatch } from "react-redux";
import cancleSvg from "../../../assest/Images/xmark-solid.svg";
import endPoints from "../../../Repository/apiConfig";
import { getApi } from "../../../Repository/Api";

const PriceDetails = ({
  isSubscriptionActive,
  subTotal,
  offerDiscount,
  hasProducts,
  deliveryLoader,
  handleDeliveyOption,
  pickUpFromStore,
  contact,
  addressFetcher,
  hasService,
  appointmentTimeGetter,
  appointmentSlotChanger,
  shipping,
  total,
  setModalOpen2,
  setDesc,
  shippingPrivacy,
  returnPolicy,
  isMobile,
  hasGiftCard,
  deliveryAddressPresent,
  hasAppointmentTime,
  cart,
}) => {
  const [couponCode, setCouponCode] = useState("");
  const [allCoupons, setAllCoupons] = useState(null);
  const dispatch = useDispatch();

  const productDiscount = cart?.products?.map((i) => i?.membershipDiscount);
  const productSavings = productDiscount?.reduce((acc, curr) => acc + curr, 0);

  const serviceDiscount = cart?.services?.map((i) => i?.membershipDiscount);
  const serviceSavings = serviceDiscount?.reduce((acc, curr) => acc + curr, 0);

  const applyCoupon = (e) => {
    e.preventDefault();
    const payload = {
      couponCode,
    };
    const dispatchFunc = [getCart];
    dispatch(
      edit_module_redux({
        url: "api/v1/applyCoupan",
        payload,
        dispatchFunc,
      })
    );
  };

  const removeCoupon = (e) => {
    e.preventDefault();
    const dispatchFunc = [getCart];
    const additionalFunctions = [() => setCouponCode("")];
    dispatch(
      edit_module_redux({
        url: "api/v1/removeCoupan",
        payload: {},
        dispatchFunc,
        additionalFunctions,
      })
    );
  };

  const haveAny = hasGiftCard || hasProducts;

  let checkoutText;
  const hasGiftCardOnly = hasGiftCard && !hasProducts;
  if (hasGiftCardOnly) {
    checkoutText = "Pay For Gift Card";
  } else {
    checkoutText = "Pay For Products";
  }

  useEffect(() => {
    if (cart?.coupon?.code) {
      setCouponCode(cart?.coupon?.code);
    }
  }, [cart]);

  const fetchCoupons = () => {
    getApi({
      url: endPoints.getAllCoupons,
      setResponse: setAllCoupons,
    });
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const giftCardLength = cart?.gifts?.length;
  const isCouponAvailable = cart?.couponUsed && cart?.couponEligible;
  const couponNotEligible = cart?.couponUsed && !cart?.couponEligible;
  const productLength = cart?.products?.length;
  const serviceLength = cart?.services?.length;
  const totalItemsLength = productLength + serviceLength + giftCardLength;
  const isProductOrService = hasService || pickUpFromStore;

  const CouponCard = () => {
    if (isCouponAvailable) {
      if (cart?.coupon?.per === "Service") {
        return (
          <div className="coupon-reward">
            <p className="title"> {cart?.coupon?.title} </p>
            <div className="info">
              <p className="service-name">
                {cart?.coupon?.addOnservicesId?.name}
              </p>
            </div>
          </div>
        );
      } else {
        if (cart?.coupon?.discount > 0) {
          return (
            <p className="flex justify-between items-center">
              Your Coupon Savings
              <span className="text-green font-semibold">
                -${cart?.coupon?.discount}{" "}
              </span>
            </p>
          );
        }
      }
    }
  };

  const isAllOfferService =
    cart?.services?.length > 0
      ? cart?.services?.every((service) => service?.serviceId?.type === "offer")
      : false;


  const CouponErrMsg = () => {
    if (isAllOfferService && cart?.coupon && !hasProducts) {
      return (
        <div style={{ color: "red" }}>
          Coupons are not valid on limited-time offers. Thank you for
          your understanding! 😊
        </div>
      );
    }

    if (isAllOfferService && cart?.coupon && hasProducts) {
      return (
        <div style={{ color: "red" }}>
          Coupons are not valid on limited-time offers and the order value must
          exceed ${cart?.coupon?.discount} to apply the coupon. Thank you for
          your understanding! 😊
        </div>
      );
    }

    if (hasProducts && !hasService && cart?.coupon?.type !== "Visit") {
      return (
        <div style={{ color: "red" }}>
          This coupon is valid for services only. 
        </div>
      );
    }

    if (total < cart?.coupon?.discount) {
      return (
        <div style={{ color: "red" }}>
          The order value must exceed ${cart?.coupon?.discount} to apply the
          coupon. Thank you for understanding! 😊
        </div>
      );
    }

    return (
      <div style={{ color: "red" }}>
        The order value must exceed ${cart?.coupon?.discount} to apply the
        coupon. Thank you for understanding! 😊
      </div>
    );
  };

  return (
    <>
      <section className="right_container">
        <div>
          <section className="py-6 px-8 border-2 border-black price_section_cart">
            {isSubscriptionActive && (
              <>
                <h3 className="font-bold text-primary text-xl ">
                  PRICE DETAILS
                </h3>
                <hr className="w-full h-0.5 my-6 bg-black" />
              </>
            )}

            <div className="flex flex-col gap-5 text-lg">
              {totalItemsLength > 0 && (
                <p className="flex justify-between items-center ">
                  Items ({totalItemsLength})
                  <span className="font-semibold ">${subTotal} </span>
                </p>
              )}

              {hasProducts && (
                <div className="text-l flex justify-between">
                  <span>Shipping & handling </span>
                  <span className="text-green font-semibold">
                    {shipping === 0 ? "Free" : `$${shipping}`}
                  </span>
                </div>
              )}

              {cart?.salesTax > 0 && (
                <div className="text-l flex justify-between">
                  <span>Sales Tax </span>
                  <span className="text-green font-semibold">
                    ${cart?.salesTax}
                  </span>
                </div>
              )}

              <CouponCard />

              {isSubscriptionActive && (
                <>
                  {offerDiscount > 0 && (
                    <p className="flex justify-between items-center ">
                      Offer Discount
                      <span className="font-semibold text-green">
                        -${offerDiscount}{" "}
                      </span>
                    </p>
                  )}
                </>
              )}

              {productSavings > 0 && (
                <p className="flex justify-between items-center">
                  Products savings
                  <span className="text-green font-semibold">
                    -${productSavings}{" "}
                  </span>
                </p>
              )}

              {serviceSavings > 0 && (
                <p className="flex justify-between items-center">
                  Service savings
                  <span className="text-green font-semibold">
                    -${serviceSavings}{" "}
                  </span>
                </p>
              )}

              {hasService && cart?.memberCredit > 0 && (
                <p className="flex justify-between items-center ">
                  Credit
                  <span className="text-green font-semibold">
                    -${cart?.memberCredit}
                  </span>
                </p>
              )}

              <p className="flex justify-between items-center">
                Order total
                <span className=" font-semibold text-2xl">${total}</span>
              </p>

              {hasProducts &&
                cart?.pickupFromStore === false &&
                (cart?.freeShippingAfter === 0 ? (
                  <p>You are eligible for free shipping.</p>
                ) : (
                  <p>
                    <span style={{ fontSize: " 20px", fontWeight: "bold" }}>
                      Spend
                      <span className="text-green font-semibold ml-1 mr-1 blinking-element">
                        ${cart?.freeShippingAfter}{" "}
                      </span>{" "}
                    </span>

                    <span style={{ fontSize: "14px" }}>
                      {" "}
                      more and get free shipping!
                    </span>
                  </p>
                ))}
            </div>

            {hasProducts && (
              <>
                {deliveryLoader ? (
                  <div className="loader">
                    <Spin size="medium" />
                  </div>
                ) : (
                  <>
                    <h4 className="text-xl my-2 font-bold">
                      Select Delivery Option for Product
                    </h4>
                    <div
                      className="flex justify-between gap-2  my-5 delivery_container"
                      id="delivery_option"
                    >
                      <div
                        className="relative flex gap-1 px-3 py-2 border-2 cursor-pointer"
                        onClick={handleDeliveyOption}
                      >
                        <input
                          className="absolute top-2 w-6  checked:accent-green h-6 left-2"
                          type="radio"
                          name="option"
                          checked={!pickUpFromStore}
                        />
                        <label htmlFor="doorstep">
                          <div className="flex flex-col items-center">
                            <img
                              className="w-24 h-12 stroke-green fill-green"
                              src="/asessts/truck.svg"
                              alt="truck"
                              loading="lazy"
                            />
                            <span className="text bold  text-xl font-bold">
                              Doorstep Delivery
                            </span>
                            <p className="text-sm">
                              *Includes Shipping Charges
                            </p>
                          </div>
                        </label>
                      </div>

                      <div
                        className="relative flex gap-1 px-3 py-2 border-2 cursor-pointer"
                        onClick={handleDeliveyOption}
                      >
                        <input
                          className="absolute top-2 w-6  checked:accent-green h-6 left-2"
                          type="radio"
                          name="option"
                          checked={pickUpFromStore}
                        />
                        <label htmlFor="store">
                          <div className="flex flex-col items-center">
                            <img
                              className="w-24 h-12 stroke-green fill-green"
                              src="/asessts/store location.svg"
                              alt="store"
                              loading="lazy"
                            />
                            <span className="text bold text-xl font-bold">
                              Pickup from Store
                            </span>
                            <p className="text-sm">*No Shipping Charges</p>
                          </div>
                        </label>
                      </div>
                    </div>
                  </>
                )}

                {!pickUpFromStore && (
                  <>
                    <h3 className="text-xl font-medium">Delivery Location:</h3>{" "}
                    {addressFetcher()}
                  </>
                )}
              </>
            )}
            <div id="time"></div>

            {isProductOrService && (
              <>
                <h4 className="text-xl my-2 font-bold">Service Location</h4>
                <div className="Box">
                  <div className="two-sec">
                    <img src={contact?.image} alt="" loading="lazy" />
                    <div>
                      <p className="title"> {contact?.name} </p>

                      <div className="contact-info">
                        <BsFillTelephoneFill />
                        <p onClick={() => Call()}> {contact?.phone} </p>
                      </div>
                      <div
                        className="contact-info cursor-pointer "
                        onClick={() => Mail(contact?.email)}
                      >
                        <GrMail />
                        <p> {contact?.email} </p>
                      </div>
                      <a href={contact?.instagram}>
                        <div className="contact-info">
                          <AiFillInstagram />
                          <p>nurse.shahina </p>
                        </div>
                      </a>
                    </div>
                  </div>

                  <div className="two-sec mt-3">
                    <BiCurrentLocation style={{ fontSize: "20px" }} />
                    <div>
                      <p className="title" style={{ fontSize: "16px" }}>
                        {contact?.address}
                      </p>
                    </div>
                  </div>
                  <a href={contact?.mapLink} target="_blank" rel="noreferrer">
                    <button className="locate_btn">
                      LOCATE ON GOOGLE MAPS
                    </button>
                  </a>
                </div>
              </>
            )}

            {hasService && (
              <div className="schedule_1">
                <div className="right_div" style={{ width: "100%" }}>
                  {appointmentTimeGetter()}
                </div>
              </div>
            )}

            {appointmentSlotChanger()}

            {!hasGiftCardOnly &&
              (cart?.couponUsed ? (
                <form onSubmit={removeCoupon}>
                  <div className="apply-coupon my-4 py-4 border-black border-t-2 pb-0">
                    <input type="text" value={couponCode} />
                    <button type="submit" className="cancel">
                      <img src={cancleSvg} alt="" loading="lazy" />
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={applyCoupon}>
                  <div className="apply-coupon my-4 py-4 border-black border-t-2 pb-0">
                    <select
                      required
                      onChange={(e) => setCouponCode(e.target.value)}
                      value={couponCode}
                    >
                      <option value={""}> Select Coupon </option>
                      {allCoupons?.cart?.map((item) => (
                        <option value={item?.code}>
                          {" "}
                          {item?.code}{" "}
                          {item?.title === "Reward" && `$${item?.discount}`} (
                          {item?.title === "Reward"
                            ? "Visit/Store Reward"
                            : item?.title}
                          ){" "}
                        </option>
                      ))}
                    </select>
                    <button type="submit">
                      <img src={rightCaret} alt="" loading="lazy" />
                    </button>
                  </div>
                </form>
              ))}

            {couponNotEligible && <CouponErrMsg />}

            <div className="font-semibold text-2xl flex justify-between border-black border-t-2 py-4 border-b-2 my-4">
              <span className="">Total Amount</span>
              <span>${total} </span>
            </div>

            {!isSubscriptionActive && (
              <div className="memeber_notification">
                <Link to="/membership">
                  Become a member & save up <br /> to 20% on products & services
                </Link>
              </div>
            )}

            {hasProducts && (
              <div className="policy-sem-container">
                <p
                  onClick={() => {
                    setDesc(shippingPrivacy);
                    setModalOpen2(true);
                  }}
                >
                  {" "}
                  Shipping Policy
                </p>
                <p
                  onClick={() => {
                    setDesc(returnPolicy);
                    setModalOpen2(true);
                  }}
                >
                  Return Policy
                </p>
              </div>
            )}

            {haveAny && (
              <CheckElement
                pickUpFromStore={pickUpFromStore}
                deliveryAddressPresent={deliveryAddressPresent}
                hasProducts={hasProducts}
                hasGiftCard={hasGiftCard}
                checkoutText={checkoutText}
              />
            )}
          </section>
        </div>

        {isMobile && (
          <CheckoutSection
            hasService={hasService}
            hasGiftCard={hasGiftCard}
            hasProducts={hasProducts}
            hasAppointmentTime={hasAppointmentTime}
            deliveryAddressPresent={deliveryAddressPresent}
            pickUpFromStore={pickUpFromStore}
          />
        )}
      </section>
    </>
  );
};

export default PriceDetails;
