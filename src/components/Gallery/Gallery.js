/** @format */

import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getApi } from "../../Repository/Api";
import { ImageLazyLoading } from "../../utils/helpingComponent";
import NoData from "../NoData/NoData";
import WithLoader from "../Wrapped/WithLoader";
import DynamicHelmet from "../Helmet/DynamicHelmet";
import { useSelector } from "react-redux";
import { isAuthenticated } from "../../store/authSlice";
import endPoints from "../../Repository/apiConfig";

const Gallery = () => {
  const navigate = useNavigate();
  const [response, setResponse] = useState({});
  const [load, setLoad] = useState(false);
  const [metaResponse, setMetaResponse] = useState(null);
  const isLoggedIn = useSelector(isAuthenticated);

  const fetchMetaTags = () => {
    getApi({
      url: endPoints.metaTags.galleryPage,
      setResponse: setMetaResponse,
    });
  };

  const fetchGallery = useCallback(() => {
    const beforLoginUrl = endPoints.gallery.getGalleryBeforeLogin;
    const afterLoginUrl = endPoints.gallery.getGalleryAfterlogin;

    getApi({
      url: isLoggedIn ? afterLoginUrl : beforLoginUrl,
      setResponse,
      setLoading: setLoad,
    });
  }, [isLoggedIn]);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  useEffect(() => {
    fetchMetaTags();
  }, []);

  const Component = () => {
    return (
      <div>
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
          <p className="title">Gallery</p>
        </div>

        {response?.data?.length > 0 ? (
          <div className="Galler_container">
            {response?.data?.map((i, index) => (
              <div className="Item" key={`gallery${index}`}>
                <Link
                  to={
                    "https://www.instagram.com/nurse.shahina/?igshid=OGQ5ZDc2ODk2ZA%3D%3D"
                  }
                  target="_blank"
                  
                >
                  <ImageLazyLoading img={i?.image} alt={i.description} />
                  <p> {i.description} </p>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <NoData message={"Sorry, we couldn't find any Gallery Image's"} />
        )}
      </div>
    );
  };

  return <WithLoader Wrapped={Component} loading={load} />;
};

export default Gallery;
