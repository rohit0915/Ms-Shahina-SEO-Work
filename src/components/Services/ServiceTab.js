/** @format */

import React, { useEffect, useState } from "react";
import Services from "../home/Services";
import { useNavigate, useParams } from "react-router-dom";
import { getApi, getLimitedOffer } from "../../Repository/Api";
import { useSelector } from "react-redux";
import { isAuthenticated } from "../../store/authSlice";
import { ImageLazyLoading } from "../../utils/helpingComponent";
import DynamicHelmet from "../Helmet/DynamicHelmet";
import endPoints from "../../Repository/apiConfig";

const ServiceTab = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const [response, setResponse] = useState([]);
  const [metaResponse, setMetaResponse] = useState(null);
  const isLoggedIn = useSelector(isAuthenticated);

  const fetchMetaTags = () => {
    getApi({
      url: endPoints.metaTags.servicePage,
      setResponse: setMetaResponse,
    });
  };

  useEffect(() => {
    getLimitedOffer(setResponse, "servicePage");
    fetchMetaTags();
  }, []);

  return (
    <section>
      {metaResponse && (
        <DynamicHelmet
          title={metaResponse?.data?.title}
          description={metaResponse?.data?.description}
        />
      )}
      {response?.[0] && (
        <div className="relative_product_container">
          <ImageLazyLoading
            img={response?.[0]?.serviceImage?.[0]}
            className="full_Image"
            alt={"Banner"}
          />

          <div className="content">
            {isLoggedIn ? (
              <button
                className="w-52 mx-auto py-2 text-lg font-semibold z-50  bg-secondary text-primary "
                onClick={() => navigate("/schedule1")}
              >
                BOOK ONLINE
              </button>
            ) : (
              <button
                className="w-52 mx-auto py-2 text-lg font-semibold z-50  bg-secondary text-primary "
                onClick={() => navigate("/appointment")}
              >
                BOOK ONLINE
              </button>
            )}
          </div>
          <div className="Image">
            <ImageLazyLoading
              img={"/asessts/back-button.svg"}
              alt={"Go Back"}
              onClick={() => navigate(-1)}
            />
          </div>
        </div>
      )}

      <Services name={name} />
    </section>
  );
};

export default ServiceTab;
