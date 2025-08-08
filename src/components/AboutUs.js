/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApi } from "../Repository/Api";
import { ViewDescription } from "../Helper/Herlper";
import GallarySlider from "./Sliders/GallarySlider";
import { ImageLazyLoading } from "../utils/helpingComponent";
import DynamicHelmet from "./Helmet/DynamicHelmet";
import endPoints from "../Repository/apiConfig";

const AboutUs = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [response, setResponse] = useState({});
  const [metaResponse, setMetaResponse] = useState(null);

  const fetchMetaTags = () => {
    getApi({
      url: endPoints.metaTags.aboutusPage,
      setResponse: setMetaResponse,
    });
  };

  const fetchAboutUs = () => {
    getApi({
      url: "api/v1/static/getAboutUs",
      setResponse,
    });
  };

  useEffect(() => {
    fetchMetaTags();
    fetchAboutUs();
  }, []);

  return (
    <section className="bg-primary text-white font-light about-us-container ">
      {metaResponse && (
        <DynamicHelmet
          title={metaResponse?.data?.title}
          description={metaResponse?.data?.description}
        />
      )}
      <div className="Backward_Heading step_Heading">
        <div>
          <ImageLazyLoading
            img={"/Image/1.png"}
            alt={"Go Back"}
            onClick={() => navigate(-1)}
            className={"text-[10px]"}
          />
        </div>
      </div>

      {response && (
        <div className="About-us_section ">
          <div className="left-container">
            <ImageLazyLoading
              img={response?.data?.[0]?.image}
              alt={response?.data?.[0]?.title}
              className="about-us-image"
            />
          </div>
          <div
            className="flex flex-col w-[47.04rem] items-start Right_Section "
            style={{ gap: "20px" }}
          >
            <h3 className="text-4xl font-medium title">
              {" "}
              {response?.data?.[0]?.title}{" "}
            </h3>
            <h4 className="font-medium text-xl flex items-center gap-2">
              {response?.data?.[0]?.designation}
            </h4>

            {show ? (
              response?.data?.[0]?.description?.map((i, index) => (
                <ViewDescription description={i} key={index} />
              ))
            ) : (
              <ViewDescription
                description={response?.data?.[0]?.description?.[0]}
              />
            )}

            {show ? (
              <button
                className="w-96 py-6 bg-secondary text-primary text-2xl font-bold"
                onClick={() => setShow(false)}
              >
                SHOW LESS
              </button>
            ) : (
              <button
                className="w-96 py-6 bg-secondary text-primary text-2xl font-bold"
                onClick={() => setShow(true)}
              >
                VIEW MORE
              </button>
            )}
          </div>
        </div>
      )}

      <div className="mt-[14.5rem]"></div>
      <GallarySlider />
    </section>
  );
};

export default AboutUs;
