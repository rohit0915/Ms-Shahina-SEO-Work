/** @format */

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProductOrder } from "../../Repository/Api";
import { DateFormatter, ImageLazyLoading } from "../../utils/helpingComponent";
import BundeProductCard from "../OrderCard/BundeProductCard";
import ProductOrderCard from "../OrderCard/ProductOrderCard";
import DynamicHelmet from "../Helmet/DynamicHelmet";

const ProductOrder = ({ isSliced, heading, padded, isMore }) => {
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();

  const fetchHandler = () => {
    getProductOrder(setOrder);
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  return (
    <div className={`${!padded && "user_product_order_container"}`}>
      <DynamicHelmet />
      <div className="user_product_order">
        {order?.length === 0 ? (
          <div className="Not-Found">
            <ImageLazyLoading
              img={"/Image/out-of-stock.png"}
              alt={"No Orders Found"}
            />
            <h5> You have no past orders.</h5>
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
                {!heading && <p className="title">Product Order History</p>}
              </div>
            )}

            <div className="main">
              {isSliced === true ? (
                <>
                  {order
                    ?.slice(0, 4)
                    ?.map((item) =>
                      item?.products?.map((i, index) => (
                        <ProductOrderCard
                          img={i.productId?.productImages?.[0]?.image}
                          title={i?.productId?.name}
                          price={i?.price}
                          orderID={item?.orderId}
                          date={item?.date}
                          subTotal={item?.subTotal}
                          membershipDiscount={item?.memberShip}
                          productId={i?.productId?._id}
                          key={`productOrder${index}`}
                        />
                      ))
                    )}

                  {order?.slice(0, 4)?.map((item) =>
                    item?.frequentlyBuyProductSchema?.map((i, index) => (
                      <div className="Items" key={`frequent${index}`}>
                        <ImageLazyLoading
                          img={
                            i.frequentlyBuyProductId?.products?.[0]
                              ?.productImages?.[0]?.image
                          }
                          alt={i.frequentlyBuyProductId?.products?.[0]?.name}
                          className={"thumb"}
                        />
                        <div className="content">
                          <div className="Related_Product_Container">
                            <p
                              className="title Related_Product"
                              style={{ margin: 0 }}
                            >
                              {i.frequentlyBuyProductId?.products?.map(
                                (product, index) => (
                                  <>
                                    <span> {product.name} </span>
                                    <ImageLazyLoading
                                      img={"/Image/96.png"}
                                      key={`Product_Image_Carousel_Images_Img${index}`}
                                      className={"plus"}
                                      alt={"plus icon"}
                                    />
                                  </>
                                )
                              )}
                            </p>{" "}
                            <p className="title" style={{ fontSize: "24px" }}>
                              {" "}
                              ${i?.price}
                            </p>
                          </div>
                          <p
                            className="orderId"
                            style={{
                              fontWeight: "bold",
                              fontSize: "20px",
                            }}
                          >
                            Order ID: ${item?.orderId}
                          </p>{" "}
                          {item?.date && (
                            <p className="orderId" style={{ color: "#A9A9A9" }}>
                              Date:{DateFormatter(item?.date)}
                            </p>
                          )}
                          <p className="orderId" style={{ color: "#A9A9A9" }}>
                            {" "}
                            Subtotal ${item?.subTotal}
                          </p>{" "}
                          {item?.memberShip > 0 && (
                            <p
                              className="orderId "
                              style={{ color: "#A9A9A9" }}
                            >
                              {" "}
                              Membership Discount: ${item?.memberShip}
                            </p>
                          )}{" "}
                          <div className="button-container">
                            <button
                              onClick={() =>
                                navigate(`/product/${i?.productId?.name}?id=${i?.productId?._id}`)
                              }
                              style={{
                                background: "#042b26",
                                border: "1px solid #042b26",
                                color: "#e5d896",
                              }}
                            >
                              View Product
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </>
              ) : (
                <>
                  {order?.map((item) =>
                    item?.products?.map((i, index) => (
                      <ProductOrderCard
                        img={i.productId?.productImages?.[0]?.image}
                        title={i?.productId?.name}
                        price={i?.price}
                        orderID={item?.orderId}
                        date={item?.date}
                        subTotal={item?.subTotal}
                        membershipDiscount={item?.memberShip}
                        productId={i?.productId?._id}
                        key={`productOrder${index}`}
                      />
                    ))
                  )}

                  {order?.map((item) =>
                    item?.frequentlyBuyProductSchema?.map((i, index) => (
                      <BundeProductCard
                        img={
                          i.frequentlyBuyProductId?.products?.[0]
                            ?.productImages?.[0]?.image
                        }
                        products={i.frequentlyBuyProductId?.products}
                        price={i?.price}
                        orderId={item?.orderId}
                        date={item?.date}
                        subTotal={item?.subTotal}
                        membershipDiscount={item?.memberShip}
                        productId={i?.productId?._id}
                        key={`frequent${index}`}
                      />
                    ))
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>
      {order?.length > 0 && isMore && (
        <Link to="/product-orders">
          <button className="view_more_btn">View More</button>
        </Link>
      )}
    </div>
  );
};

export default ProductOrder;
