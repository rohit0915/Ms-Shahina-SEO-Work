/** @format */

import React, { useEffect, useState } from "react";
import { getLimitedOffer } from "../../Repository/Api";
import { GrClose } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { closeBanner } from "../../store/BannerSlice";
import { ViewDescription } from "../../Helper/Herlper";
import { ImageLazyLoading } from "../../utils/helpingComponent";

const OfferBanner = ({ setBanner }) => {
  const [response, setResponse] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 786);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeBanner());
  };

  function fetchHandler() {
    getLimitedOffer(setResponse, "Promotion");
  }

  useEffect(() => {
    fetchHandler();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 786);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  let footer;
  if (!isMobile) {
    const MyComponent = () => {
      return (
        <div className="relative w-full Offer_Banner">
          <div className="w-4/6 h-[20rem] image_container">
           <ImageLazyLoading
            img={response?.[0]?.bannerImage}
            className={'w-full h-full'}
            alt={"Banner"}
            />
          </div>
          <div style={{ textAlign: "left" }}>
            <h1 className="absolute bottom-10 left-16 text-center w-[37rem] offer_description ">
              <ViewDescription description={response?.[0]?.desc} />
            </h1>
          </div>

          <div className="absolute  top-0 right-0 flex flex-col gap-10  justify-center items-center bg-white w-[51rem] h-full rounded-l-full z-[300] Hover_Element">
            <h1 className="font-medium text-3xl">
              {" "}
              {response?.[0]?.title} <br />
              Refer Code : {response?.[0]?.refferalCode}{" "}
            </h1>

            <div className="flex items-center store">
              <div className="w-40 h-20 ">
                <a
                  href={response?.[0]?.playstoreLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="w-full h-full object-contain"
                    src="/asessts/play.png"
                    alt="play" loading="lazy"
                  />
                </a>
              </div>

              <div className="w-40 h-20 ">
                <a
                  href={response?.[0]?.appleLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="w-full h-full object-contain"
                    src="/asessts/store.png"
                    alt="store" loading="lazy"
                  />
                </a>
              </div>
            </div>
            <div className="w-8 h-4  absolute top-3 right-11 close_btn ">
              <img
                className="object-cover cursor-pointer"
                src="/Image/14.png"
                alt=""
                onClick={() => handleClose()} loading="lazy"
              />
            </div>
          </div>
        </div>
      );
    };
    footer = <MyComponent />;
  } else {
    const MyComponent = () => {
      return (
        <div className="Promotional_Banner_Mobile">
          <GrClose className="close_button" onClick={() => handleClose()} />
          <div className="content">
            <img src={response?.[0]?.bannerImage} alt="" loading="lazy" />
            <h1>
              <ViewDescription description={response?.[0]?.desc} />
            </h1>
          </div>
          <h1> </h1>
          <div className="Download">
            <h1>
              {" "}
              {response?.[0]?.title} <br /> Refer Code :-
              {response?.[0]?.refferalCode}{" "}
            </h1>

            <a
              href={response?.[0]?.playstoreLink}
              target="_blank"
              rel="noreferrer"
            >
              <img src="/asessts/play.png" alt="" loading="lazy" />
            </a>
            <a href={response?.[0]?.appleLink} target="_blank" rel="noreferrer">
              <img src="/asessts/store.png" alt="" loading="lazy" />
            </a>
          </div>
        </div>
      );
    };
    footer = <MyComponent />;
  }

  return response?.[0] && footer;
};

export default OfferBanner;
