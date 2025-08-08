/** @format */

import React, { useState, useEffect } from "react";
import {
  Brands,
  Nutrition,
  ProductType,
  Products,
  SkinConditions,
  SkinType,
} from "./shopHelpingcomponents";
import ShopMenu from "./ShopMenu";
import { useNavigate } from "react-router-dom";
import { getApi, getLimitedOffer, getWishlist } from "../../Repository/Api";
import LatestNews from "../home/LatestNews";
import { useSelector } from "react-redux";
import { isAuthenticated } from "../../store/authSlice";
import { ImageLazyLoading } from "../../utils/helpingComponent";
import DynamicHelmet from "../Helmet/DynamicHelmet";
import endPoints from "../../Repository/apiConfig";

const Shop = () => {
  const [response, setResponse] = useState([]);
  const [fav, setFav] = useState([]);
  const isLoggedIn = useSelector(isAuthenticated);
  const navigate = useNavigate();
  const [metaResponse, setMetaResponse] = useState(null);

  const fetchMetaTags = () => {
    getApi({
      url: endPoints.metaTags.shopPage,
      setResponse: setMetaResponse,
    });
  };

  useEffect(() => {
    fetchMetaTags();
    getLimitedOffer(setResponse, "shopPage");
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getWishlist(setFav);
    }
  }, [isLoggedIn]);

  return (
    <section>
      {metaResponse && (
        <DynamicHelmet
          title={metaResponse?.data?.title}
          description={metaResponse?.data?.description}
        />
      )}
      <ShopMenu />
      {response && (
        <div className="relative_product_container">
          <ImageLazyLoading
            img={response?.[0]?.shopImage?.[0]}
            alt={"Shop"}
            className={"full_Image"}
          />

          <div className="Image">
            <ImageLazyLoading
              img={"/asessts/back-button.svg"}
              alt={"Go Back"}
              className={"cursor-pointer text-[10px]"}
              onClick={() => navigate(-1)}
            />
          </div>
        </div>
      )}

      <h2
        className="text-4xl font-medium  text-primary text-center my-14"
        style={{ textTransform: "uppercase" }}
      >
        Shop by skin type
      </h2>

      <SkinType />
      <h2
        className="text-4xl font-medium  text-primary text-center my-14"
        style={{ textTransform: "uppercase" }}
      >
        Shop by product type
      </h2>
      <ProductType />
      <h2
        className="text-4xl font-medium  text-primary text-center my-14"
        style={{ textTransform: "uppercase" }}
      >
        Shop by brands
      </h2>
      <Brands />
      <h2
        className="text-4xl font-medium  text-primary text-center my-14"
        style={{ textTransform: "uppercase" }}
      >
        Shop by skin conditions
      </h2>
      <SkinConditions />
      <h2
        className="text-4xl font-medium  text-primary text-center my-14"
        style={{ textTransform: "uppercase" }}
      >
        Shop nutritions
      </h2>
      <Nutrition />
      {fav?.length > 0 && (
        <>
          <h2
            className="text-4xl font-medium  text-primary text-center my-14"
            id="FAVOURITES"
          >
            MY FAVORITE
          </h2>
          <Products data={fav} />
        </>
      )}

      <LatestNews />
    </section>
  );
};

export default Shop;
