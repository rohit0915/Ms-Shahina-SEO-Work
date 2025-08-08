/** @format */

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ViewDescription } from "../Helper/Herlper";
import { getApi } from "../Repository/Api";
import { ImageLazyLoading } from "../utils/helpingComponent";
import DynamicHelmet from "./Helmet/DynamicHelmet";
import endPoints from "../Repository/apiConfig";

const AllNews = () => {
  const [response, setResponse] = useState({});
  const navigate = useNavigate();
  const [metaResponse, setMetaResponse] = useState(null);

  const fetchMetaTags = () => {
    getApi({
      url: endPoints.metaTags.allNewsPage,
      setResponse: setMetaResponse,
    });
  };

  const fetchNews = () => {
    getApi({
      url: endPoints.news.getAllNews,
      setResponse,
    });
  };

  useEffect(() => {
    fetchMetaTags();
    fetchNews();
  }, []);

  return (
    <section
      className=" Home_Three_Sec  MaxComponent All_News_Page"
      style={{ marginBottom: "40px", marginTop: "20px !important" }}
    >
      {metaResponse && (
        <DynamicHelmet
          title={metaResponse?.data?.title}
          description={metaResponse?.data?.description}
        />
      )}
      <div className="gap-3  mx-auto  All_News_Page">
        <div className="Backward_Heading step_Heading">
          <div>
            <ImageLazyLoading
              img={"/Image/1.png"}
              onClick={() => navigate(-1)}
              alt={"Go Back"}
            />
          </div>
        </div>

        {response?.data?.map((card, index) => (
          <section className="p-3" key={index}>
            <div className="my-2">
              <h3 className="my-6 font-medium text-3xl text-primary title_heading">
                {card.title}
              </h3>
              <Link to={`/news/${card?.title}`}>
                <ImageLazyLoading
                  className={"thumb_image"}
                  alt={card.title}
                  img={card.image}
                />
              </Link>
              <div className="mt-4" />
              <p className="text-xl font-normal desc">
                <ViewDescription
                  description={card?.description?.substr(0, 200)}
                />
              </p>

              <div className="flex justify-center my-3 viewMore-Container">
                <Link to={`/news/${card?.title}`}>
                  <button className=" py-2 font-bold text-primary bg-secondary viewMore">
                    Read More
                  </button>
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
};

export default AllNews;
