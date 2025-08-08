/** @format */

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getApi } from "../../Repository/Api";
import ServiceOrderCard from "../OrderCard/ServiceOrderCard";
import DynamicHelmet from "../Helmet/DynamicHelmet";
import { ImageLazyLoading } from "../../utils/helpingComponent";

const PastServiceOrder = ({ isSliced, heading, padded, isMore }) => {
  const [order, setOrder] = useState([]);
  const [addOnServicePresent, setAddOnServicePresent] = useState(false);
  const [regularServicePresent, setRegularServicePresent] = useState(false);
  const [rewardServicePresent, setRewardServicePresent] = useState(false);
  const navigate = useNavigate();

  const fetchHandler = () => {
    getApi({
      url: `api/v1/serviceOrders?serviceStatus=Done`,
      setResponse: setOrder,
    });
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  useEffect(() => {
    const isAnyAddOnServicePresent = order?.data?.some(
      (item) => item?.AddOnservicesSchema?.length > 0
    );
    setAddOnServicePresent(isAnyAddOnServicePresent);
  }, [order]);

  useEffect(() => {
    const isRegularServicePresent = order?.data?.some(
      (item) => item?.services?.length > 0
    );
    setRegularServicePresent(isRegularServicePresent);
  }, [order]);

  useEffect(() => {
    const isRewardServicePresent = order?.data?.some(
      (item) => item?.coupon?.per === "Service"
    );
    setRewardServicePresent(isRewardServicePresent);
  }, [order]);

  return (
    <div className={`${!padded && "user_product_order_container"}`}>
      <DynamicHelmet />
      <div className="user_product_order">
        {!order ? (
          <div className="Not-Found">
            <img src="/Image/out-of-stock.png" alt="" loading="lazy" />
            <h5> You have no past service orders.</h5>
          </div>
        ) : (
          <>
            {!isSliced && (
              <div
                className="Backward_Heading step_Heading"
                style={{ padding: "0px !important" }}
              >
                <div>
                  <ImageLazyLoading
                    img={"/Image/1.png"}
                    onClick={() => navigate(-1)}
                    alt={"Go Back"}
                  />
                </div>
                {!heading && <p className="title">Past Service</p>}
              </div>
            )}
            {isSliced === true ? (
              <>
                {regularServicePresent === true ? (
                  <div className="service-upcoming-order">
                    {order?.data
                      ?.slice(0, 4)
                      ?.map((item) =>
                        item?.services?.map((i) => (
                          <ServiceOrderCard
                            img={i.serviceId?.images?.[0]?.img}
                            title={i?.serviceId?.name}
                            price={
                              i.memberprice
                                ? i.memberprice
                                : i?.serviceId?.price
                            }
                            orderId={item?.orderId}
                            time={item?.toTime}
                            membershipDiscount={item?.memberShip}
                            serviceId={i?.serviceId?._id}
                            isCancel={false}
                            isReschedule={false}
                            key={i?.serviceId?._id}
                            size={i?.size}
                          />
                        ))
                      )}
                  </div>
                ) : (
                  <div className="Not-Found">
                    <img src="/Image/out-of-stock.png" alt="" loading="lazy" />
                    <h5> No regular services are present.</h5>
                  </div>
                )}
              </>
            ) : (
              <>
                {regularServicePresent === true ? (
                  <div className="service-upcoming-order">
                    {order?.data?.map((item) =>
                      item?.services?.map((i) => (
                        <ServiceOrderCard
                          img={i.serviceId?.images?.[0]?.img}
                          title={i?.serviceId?.name}
                          price={
                            i.memberprice ? i.memberprice : i?.serviceId?.price
                          }
                          orderId={item?.orderId}
                          time={item?.toTime}
                          membershipDiscount={item?.memberShip}
                          serviceId={i?.serviceId?._id}
                          isCancel={false}
                          isReschedule={false}
                          key={i?.serviceId?._id}
                          size={i?.size}
                        />
                      ))
                    )}
                  </div>
                ) : (
                  <div className="Not-Found">
                    <img src="/Image/out-of-stock.png" alt="" loading="lazy" />
                    <h5> No regular services are present.</h5>
                  </div>
                )}

                {addOnServicePresent === true && (
                  <>
                    {" "}
                    <div className="title_account_second">AddOn Service's</div>
                    <div className="service-upcoming-order">
                      {order?.data?.map((item) =>
                        item?.AddOnservicesSchema?.map((i) => (
                          <ServiceOrderCard
                            img={i.addOnservicesId?.image}
                            title={i?.addOnservicesId?.name}
                            price={i?.addOnservicesId?.price}
                            orderId={item?.orderId}
                            time={item?.toTime}
                            membershipDiscount={item?.memberShip}
                            offerDiscount={item?.offerDiscount}
                            serviceId={i?.serviceId?._id}
                            isCancel={false}
                            isReschedule={false}
                            isView={false}
                            key={`SeviceIndex${i?.serviceId?._id}`}
                            size={i?.size}
                          />
                        ))
                      )}
                    </div>{" "}
                  </>
                )}

                {rewardServicePresent === true && (
                  <>
                    <div
                      className="title_account_second"
                      style={{ textTransform: "capitalize" }}
                    >
                      Reward Service's
                    </div>
                    <div className="service-upcoming-order">
                      {order?.data?.map(
                        (item) =>
                          item?.coupon?.addOnservicesId && (
                            <ServiceOrderCard
                              img={item?.coupon?.addOnservicesId?.image}
                              title={item?.coupon?.addOnservicesId?.name}
                              orderId={item?.orderId}
                              serviceId={item?.coupon?.addOnservicesId?._id}
                              isCancel={false}
                              isReschedule={false}
                              time={item?.toTime}
                              isView={false}
                              key={`couponServices${item?.coupon?.addOnservicesId?._id}`}
                              size={item?.coupon?.title}
                            />
                          )
                      )}
                    </div>
                  </>
                )}
              </>
            )}

            {order?.data?.length > 4 && isMore && (
              <Link to="/past-orders">
                <button className="view_more_btn">
                  View More Appointments
                </button>
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PastServiceOrder;
