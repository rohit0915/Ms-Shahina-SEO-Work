/** @format */

import React, { useState, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getApi, getCart, post_module_redux } from "../../Repository/Api";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated } from "../../store/authSlice";
import Testimonials from "../PaymentPlans/Testimonials";
import { addServiceLocally } from "../../store/DummySerivce";
import { motion } from "framer-motion";
import GallarySlider from "../Sliders/GallarySlider";
import DynamicHelmet from "../Helmet/DynamicHelmet";
import { ImageLazyLoading } from "../../utils/helpingComponent";
import endPoints from "../../Repository/apiConfig";

const ServicePage = () => {
  const { name } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // const serviceId = queryParams.get("id");
  const [response, setResponse] = useState([]);
  const navigate = useNavigate();
  const isLoggedIn = useSelector(isAuthenticated);
  const dispatch = useDispatch();
  const quantity = 1;
  const [priceId, setPriceId] = useState("");
  const [size, setSize] = useState("");
  const [sizePrice, setSizeprice] = useState("");
  const [memberprice, setMemberPrice] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [seasonOpen, setSeasonOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);
  const [area, setArea] = useState("");
  const [season, setSeason] = useState("");
  const [firstQuery, setFirstQuery] = useState("");
  const [secondQuery, setSecondQuery] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 786);
  const [sessionPrice, setSessionPrice] = useState("");
  const [metaResponse, setMetaResponse] = useState(null);
  const [data, setData] = useState(null);
  const [serviceId, setServiceId] = useState('')

  const fetchServiceDetail = useCallback(() => {
    const url = endPoints.service.getServiceDetail(name);
    getApi({
      url,
      setResponse: setData,
    });
  }, [name]);

  useEffect(() => {
    setServiceId(response?._id)
  }, [response])

  useEffect(() => {
    fetchServiceDetail();
  }, [fetchServiceDetail]);

  useEffect(() => {
    if (data) {
      setResponse(data?.data);
    }
  }, [data]);

  const fetchMetaTags = useCallback(() => {
    if (serviceId) {
      getApi({
        url: endPoints.metaTags.serviceDetailPage(serviceId),
        setResponse: setMetaResponse,
      });
    }
  }, [serviceId]);

  useEffect(() => {
    fetchMetaTags();
  }, [fetchMetaTags]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [name]);

  useEffect(() => {
    if (response?.multipleSize === true) {
      setPriceId(response?.sizePrice?.[0]?._id);
      setSize(response?.sizePrice?.[0]?.size);
      setSizeprice(response?.sizePrice?.[0]?.price);
      setMemberPrice(response?.sizePrice?.[0]?.mPrice);
    }
  }, [response]);

  let payload;
  if (response?.multipleSize === true) {
    payload = {
      quantity,
      priceId,
      size,
      sizePrice,
      memberprice,
    };
  } else {
    payload = {
      quantity,
    };
  }

  const addToCart = async () => {
    if (isLoggedIn === true) {
      const dispatchFunc = [getCart];
      const additionalFunctions = [() => navigate("/schedule1")];
      dispatch(
        post_module_redux({
          url: `api/v1/add-to-cart/service/${serviceId}`,
          payload,
          dispatchFunc,
          additionalFunctions,
        })
      );
    } else {
      const dummy = { id: serviceId, payload };
      await dispatch(addServiceLocally(dummy));
      navigate("/appointment");
    }
  };

  // ------------
  const handleToggleOpen = () => {
    setSeasonOpen(false);
    setSizeOpen(false);
    setIsOpen(!isOpen);
  };
  const handleToggleSeason = () => {
    setIsOpen(false);
    setSizeOpen(false);
    setSeasonOpen(!seasonOpen);
  };
  const handleToggleSize = () => {
    setIsOpen(false);
    setSeasonOpen(false);
    setSizeOpen(!sizeOpen);
  };

  const query = firstQuery?.trim() + " " + secondQuery?.trim();

  const TotolData =
    query?.length > 2
      ? response?.sizePrice?.filter((i) =>
        i?.size?.toLowerCase().includes(query?.toLowerCase())
      )
      : response?.sizePrice;

  const querySelector = (data, state, type) => {
    if (type === "first") {
      setFirstQuery(data);
    } else {
      setSecondQuery(data);
    }
    state(false);
  };

  useEffect(() => {
    if (query?.length > 2) {
      if (TotolData?.length > 0) {
        setPriceId(TotolData?.[0]?._id);
        setSize(TotolData?.[0]?.size);
        setSizeprice(TotolData?.[0]?.price);
        setMemberPrice(TotolData?.[0]?.mPrice);
      }
    }
  }, [TotolData, query]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 786);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  let ImageFinder;
  if (isMobile) {
    ImageFinder = (
      <div className="main_Img">
        <ImageLazyLoading
          img={response?.images?.[0]?.img}
          className={"text-[10px]"}
          alt={"banner"}
        />
      </div>
    );
  } else {
    ImageFinder = (
      <div
        className="backImage"
        style={{ backgroundImage: `url(${response?.images?.[0]?.img})` }}
      ></div>
    );
  }


  function priceFetcher(i) {
    if (i.multipleSize === false) {
      return (
        <div
          className="price-container"
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: "50px",
          }}
        >
          {/* Member Price column */}
          <div style={{ textAlign: "center" }}>
            <p
              className="member"
              style={{ color: "red", margin: 0 }}
            >
              Member Price
            </p>
            <p
              className="member-price"
              style={{ color: "red", margin: 0 }}
            >
              ${i.mPrice}
            </p>
          </div>

          {/* Regular Price column */}
          <div style={{ textAlign: "center" }}>
            <p
              className="mrp-label"
              style={{ fontSize: "16px", color: "#000", margin: 0 }}
            >
              Regular Price
            </p>
            <p
              className="mrp"
              style={{ margin: 0 }}
            >
              ${i.price}
            </p>
          </div>
        </div>

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
        <div
          className="price-container"
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: "50px",
          }}
        >
          {/* Member Price column */}
          <div style={{ textAlign: "center" }}>
            <p
              className="member"
              style={{ color: "red", margin: 0 }}
            >
              Member Price
            </p>
            <p
              className="member-price"
              style={{ color: "red", margin: 0 }}
            >
              ${i.mPrice}
            </p>
          </div>

          {/* Regular Price column */}
          <div style={{ textAlign: "center" }}>
            <p
              className="mrp-label"
              style={{ fontSize: "16px", color: "#000", margin: 0 }}
            >
              Regular Price
            </p>
            <p
              className="mrp"
              style={{ margin: 0 }}
            >
              ${i.price}
            </p>
          </div>
        </div>
      );
    }
  }

  return (
    <>
      {metaResponse && (
        <DynamicHelmet
          title={metaResponse?.data?.title}
          description={metaResponse?.data?.description}
        />
      )}
      <main className="service_details_page">
        <div className="Backward_Heading step_Heading" style={{ padding: 0 }}>
          <div>
            <ImageLazyLoading
              img={"/Image/1.png"}
              onClick={() => navigate(-1)}
              alt={"Go Back"}
              className={"text-[10px]"}
            />
            <p style={{ width: "50%" }}></p>
          </div>
          <h1 className="title" style={{ textTransform: "uppercase" }}>
            {response?.name}
          </h1>
        </div>

        {ImageFinder}

        <div className="content">
          <div dangerouslySetInnerHTML={{ __html: response?.description }} />
        </div>

        <div className="flex-container">
          {response?.benfit?.length > 0 && (
            <div className="list">
              <p> Treatment Benefits</p>
              <ul>
                {response?.benfit?.map((i, index) => (
                  <li key={`Benefit${index}`}> {i} </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {response?.area?.length > 0 && (
          <div className="drop_Down_Container">
            <button className="main_btn" onClick={handleToggleOpen}>
              Type : {area}
              <svg
                className="Icon Icon--select-arrow"
                role="presentation"
                viewBox="0 0 19 12"
              >
                <polyline
                  fill="none"
                  stroke="currentColor"
                  points="17 2 9.5 10 2 2"
                  fill-rule="evenodd"
                  stroke-width="2"
                  stroke-linecap="square"
                ></polyline>
              </svg>
            </button>
            {isOpen === true && (
              <motion.div
                initial={{
                  height: 0,
                  opacity: 0,
                  zIndex: -9999,
                }}
                animate={{
                  height: isOpen ? "auto" : 0,
                  opacity: isOpen ? 1 : 0,
                  zIndex: 9999,
                  display: "block",
                }}
                transition={{ duration: 0.5 }}
                exit={{
                  height: 0,
                  opacity: 0,
                  zIndex: -9999,
                }}
                className="animated_dropDown"
              >
                <div className="container">
                  {response?.area?.map((i, index) => (
                    <button
                      key={`Area${index}`}
                      onClick={() => {
                        querySelector(i, setIsOpen, "first");
                        setArea(i);
                      }}
                    >
                      {" "}
                      {i}{" "}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        )}

        {response?.session?.length > 0 && (
          <div className="drop_Down_Container">
            <button className="main_btn" onClick={handleToggleSeason}>
              Session (s) : {season}
              <svg
                className="Icon Icon--select-arrow"
                role="presentation"
                viewBox="0 0 19 12"
              >
                <polyline
                  fill="none"
                  stroke="currentColor"
                  points="17 2 9.5 10 2 2"
                  fill-rule="evenodd"
                  stroke-width="2"
                  stroke-linecap="square"
                ></polyline>
              </svg>
            </button>

            {seasonOpen === true && (
              <motion.div
                initial={{
                  height: 0,
                  opacity: 0,
                  zIndex: -9999,
                }}
                animate={{
                  height: seasonOpen ? "auto" : 0,
                  opacity: seasonOpen ? 1 : 0,
                  zIndex: 9999,
                  display: "block",
                }}
                transition={{ duration: 0.3 }}
                exit={{
                  height: 0,
                  opacity: 0,
                  zIndex: -9999,
                }}
                className="animated_dropDown"
              >
                <div className="container">
                  {response?.session?.map((i, index) => (
                    <button
                      key={`Season${index}`}
                      onClick={() => {
                        querySelector(i, setSeasonOpen, "second");
                        setSeason(i);
                      }}
                    >
                      {" "}
                      {i}{" "}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        )}

        {response?.sizePrice?.length > 0 && (
          <div className="drop_Down_Container">
            <button className="main_btn" onClick={handleToggleSize}>
              {size} -${memberprice}
              {sessionPrice > 0 ? `- $${sessionPrice}/session` : ""}
              <svg
                className="Icon Icon--select-arrow"
                role="presentation"
                viewBox="0 0 19 12"
              >
                <polyline
                  fill="none"
                  stroke="currentColor"
                  points="17 2 9.5 10 2 2"
                  fill-rule="evenodd"
                  stroke-width="2"
                  stroke-linecap="square"
                ></polyline>
              </svg>
            </button>
            {sizeOpen === true && (
              <motion.div
                initial={{
                  height: 0,
                  opacity: 0,
                  zIndex: -9999,
                }}
                animate={{
                  height: sizeOpen ? "auto" : 0,
                  opacity: sizeOpen ? 1 : 0,
                  zIndex: 9999,
                  display: "block",
                }}
                transition={{ duration: 0.3 }}
                exit={{
                  height: 0,
                  opacity: 0,
                  zIndex: -9999,
                }}
                className="animated_dropDown"
              >
                <div className="container">
                  {TotolData?.length === 0
                    ? response?.sizePrice?.map((i, index) => (
                      <button
                        key={`Season${index}`}
                        onClick={() => {
                          setPriceId(i?._id);
                          setSize(i?.size);
                          setSizeprice(i?.price);
                          setMemberPrice(i?.mPrice);
                          setSizeOpen(false);
                          setSessionPrice(i?.savedPrice);
                        }}
                      >
                        {i.size} ${i.mPrice}{" "}
                        {i?.savedPrice > 0
                          ? `- $${i?.savedPrice}/session`
                          : ""}
                      </button>
                    ))
                    : TotolData?.map((i, index) => (
                      <button
                        key={`Season${index}`}
                        onClick={() => {
                          setPriceId(i?._id);
                          setSize(i?.size);
                          setSizeprice(i?.price);
                          setMemberPrice(i?.mPrice);
                          setSizeOpen(false);
                          setSessionPrice(i?.savedPrice);
                        }}
                      >
                        {i.size} ${i.mPrice}
                        {i?.savedPrice > 0
                          ? `- $${i?.savedPrice}/session`
                          : ""}
                      </button>
                    ))}
                </div>
              </motion.div>
            )}
          </div>
        )}

        {response?.beforeAfterImage && (
          <ImageLazyLoading
            img={response?.beforeAfterImage}
            className={"tweet_image text-[10px]"}
            alt={"Before Treatment"}
          />
        )}
        <div style={{marginTop:"1rem"}}>
          {priceFetcher(response)}
          <div className="product-container" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "10px" }}>
            <p className="interes">
              Pay with interest free installments with Cherry
            </p>
            <a href="/paymentplan" style={{ color: "#042b26", fontWeight: "700" }}>CLICK TO LEARN MORE</a>
          </div>
        </div>
        <div className="service_book_button">
          <button onClick={() => addToCart()}>Book Now</button>
        </div>

        <div className="Review_Title_Container ">
          <h1>Client Reviews</h1>
          <p>
            We are very proud of the service we provide and stand by every
            product we carry. We work hard to address our client's needs and
            have them leave our spa loving their skin. That's why over 130
            people have given us a 5-star rating on Google!
          </p>
          <a href="https://surl.li/itcqtk" target="_blank" rel="noopener noreferrer">
            <ImageLazyLoading
              img={"/asessts/google-review.webp"}
              className={"text-[10px]"}
              alt={"Google Reviews"}
            />
          </a>
        </div>
        <div style={{ width: "100%", overflow: "hidden" }}>
          <Testimonials />
        </div>
      </main>
      <GallarySlider />
    </>
  );
};

export default ServicePage;
