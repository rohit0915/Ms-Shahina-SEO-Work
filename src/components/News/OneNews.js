/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getApi } from "../../Repository/Api";
import { ViewDescription } from "../../Helper/Herlper";
import { ImageLazyLoading } from "../../utils/helpingComponent";
import DynamicHelmet from "../Helmet/DynamicHelmet";
import endPoints from "../../Repository/apiConfig";

const OneNews = () => {
  const { id } = useParams();
  const [response, setResponse] = useState({});
  const [metaResponse, setMetaResponse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getApi({
      url: endPoints.news.getNewsDetail(id),
      setResponse,
    });
    getApi({
      url: endPoints.metaTags.blogDetailPage(id),
      setResponse: setMetaResponse,
    });
  }, [id]);

  const getKeywords = () => {
    if (response?.data?.keyWords) {
      return response?.keyWords?.map(
        (i, index) => i && <button key={`keywords${index}`}> {i} </button>
      );
    }
  };

  return (
    <section
      className="MaxComponent All_News_Page"
      style={{ marginBottom: "40px" }}
    >
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
            onClick={() => navigate(-1)}
            alt={"Go Back"}
          />
        </div>
      </div>
      <div className="gap-3  mx-auto  All_News_Page">
        <section className="p-3 pt-0">
          <div className="my-2">
            <h3 className="my-6 font-medium text-3xl text-primary news-heading">
              {response?.data?.title}
            </h3>
            <ImageLazyLoading
              className={"thumb_image"}
              alt={response?.data?.title}
              img={response?.data?.image}
            />
            <div className="mt-4" />
            <ViewDescription description={response?.data?.description} />
            <div className="keyword_cont">{getKeywords()}</div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default OneNews;
