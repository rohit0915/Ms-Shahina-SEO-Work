/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import { getApi } from "../Repository/Api";
import { ViewDescription } from "../Helper/Herlper";
import DynamicHelmet from "./Helmet/DynamicHelmet";
import { ImageLazyLoading } from "../utils/helpingComponent";
import endPoints from "../Repository/apiConfig";

const FAQ = () => {
  const [response, setResponse] = useState({});
  const [metaResponse, setMetaResponse] = useState(null);
  const navigate = useNavigate();

  function BackNavigation() {
    navigate(-1);
  }

  const fetchMetaTags = () => {
    getApi({
      url: endPoints.metaTags.faqPage,
      setResponse: setMetaResponse,
    });
  };

  useEffect(() => {
    getApi({
      url: "api/v1/static/faq/All",
      setResponse,
    });
    fetchMetaTags();
  }, []);

  const getItems = response?.data?.map((i, index) => ({
    key: index,
    label: <ViewDescription description={i.question} />,
    children: <ViewDescription description={i.answer} />,
  }));

  return (
    <main className="service_details_page">
      {metaResponse && (
        <DynamicHelmet
          title={metaResponse?.data?.title}
          description={metaResponse?.data?.description}
        />
      )}
      <div className="Backward_Heading step_Heading" style={{ padding: 0 }}>
        <div style={{ width: "10%" }}>
          <ImageLazyLoading
            img={"/Image/1.png"}
            alt={"Go Back"}
            onClick={() => BackNavigation()}
            className={"text-[10px]"}
          />
        </div>
        <p style={{ textTransform: "uppercase" }}>
          FAQ’s ( Frequently Asked Questuons )
        </p>
      </div>

      {response?.data?.length > 0 && (
        <div className="FAQ-Container">
          <Collapse
            bordered={false}
            defaultActiveKey={["0"]}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
            items={getItems}
          />
        </div>
      )}
    </main>
  );
};

export default FAQ;
