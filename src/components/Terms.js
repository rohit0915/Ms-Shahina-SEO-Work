/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ViewDescription } from "../Helper/Herlper";
import { getApi, getTerms } from "../Repository/Api";
import DynamicHelmet from "./Helmet/DynamicHelmet";
import { ImageLazyLoading } from "../utils/helpingComponent";
import endPoints from "../Repository/apiConfig";

const Terms = () => {
  const [response, setResponse] = useState([]);
  const [metaResponse, setMetaResponse] = useState(null);

  const navigate = useNavigate();

  function BackNavigation() {
    navigate(-1);
  }

  const fetchMetaTags = () => {
    getApi({
      url: endPoints.metaTags.termPage ,
      setResponse: setMetaResponse,
    });
  };

  useEffect(() => {
    getTerms(setResponse);
    fetchMetaTags();
  }, []);

  return (
    <main className="service_details_page">
      {metaResponse && (
        <DynamicHelmet
          title={metaResponse?.data?.title}
          description={metaResponse?.data?.description}
        />
      )}
      <div className="Backward_Heading step_Heading" style={{ padding: 0 }}>
        <div>
          <ImageLazyLoading
            img={"/Image/1.png"}
            alt={"Go Back"}
            onClick={() => BackNavigation()}
          />
          <p style={{ width: "50%" }}></p>
        </div>
        <p className="title" style={{ textTransform: "uppercase" }}>
          Terms of Use
        </p>
      </div>

      {response && (
        <div className="content privacy_policy" style={{ padding: "20px" }}>
          {response?.map((i, index) => (
            <p className="desc" key={index}>
              <ViewDescription description={i.terms} />
            </p>
          ))}
        </div>
      )}
    </main>
  );
};

export default Terms;
