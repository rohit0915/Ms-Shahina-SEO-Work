/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ViewDescription } from "../Helper/Herlper";
import { getApi, getPrivacyPolicy } from "../Repository/Api";
import DynamicHelmet from "./Helmet/DynamicHelmet";
import { ImageLazyLoading } from "../utils/helpingComponent";
import endPoints from "../Repository/apiConfig";

const Privacy = () => {
  const [response, setResponse] = useState([]);
  const navigate = useNavigate();
  const [metaResponse, setMetaResponse] = useState(null);

  const fetchMetaTags = () => {
    getApi({
      url: endPoints.metaTags.privacyPage,
      setResponse: setMetaResponse,
    });
  };

  useEffect(() => {
    fetchMetaTags();
  }, []);

  function BackNavigation() {
    navigate(-1);
  }

  useEffect(() => {
    getPrivacyPolicy(setResponse);
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
            alt={"Go back"}
            onClick={() => BackNavigation()}
          />
          <p style={{ width: "50%" }}></p>
        </div>
        <p className="title" style={{ textTransform: "uppercase" }}>
          Privacy Policy
        </p>
      </div>

      {response && (
        <div className="content privacy_policy" style={{ padding: "20px" }}>
          {response?.map((i, index) => (
            <p className="desc" key={index}>
              <ViewDescription description={i.privacy} />
            </p>
          ))}
        </div>
      )}
    </main>
  );
};

export default Privacy;
