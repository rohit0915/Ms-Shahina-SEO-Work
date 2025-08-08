/** @format */

import React, { useEffect, useState } from "react";
import HeroSection from "../../components/home/HeroSection";
import Services from "../../components/home/Services";
import Description from "../../components/home/Description";
import LatestNews from "../../components/home/LatestNews";
import Testimonials from "../../components/PaymentPlans/Testimonials";
import GallarySlider from "../../components/Sliders/GallarySlider";
import Partners from "../../components/Partners/Partners";
import Reviews from "../../components/Reviews/Reviews";
import Awards from "../../components/Awards/Awards";
import { getApi } from "../../Repository/Api";
import DynamicHelmet from "../../components/Helmet/DynamicHelmet";
import endPoints from "../../Repository/apiConfig";
import OfferBanner from "../../components/OfferBanner/OfferBanner";
import MobileOfferBanner from "../../components/OfferBanner/MobileOfferBanner";

const Home = () => {
  const [metaResponse, setMetaResponse] = useState(null);

  const fetchMetaTags = () => {
    getApi({
      url: endPoints.metaTags.homePage,
      setResponse: setMetaResponse,
    });
  };

  useEffect(() => {
    fetchMetaTags();
  }, []);

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 500) {
      setTimeout(() => setOpen1(true), 500);
    } else {
      setOpen(true);
    }
  }, []);


  return (
    <div>
      {metaResponse && (
        <DynamicHelmet
          title={metaResponse?.data?.title}
          description={metaResponse?.data?.description}
        />
      )}
      <HeroSection />
      <Awards />
      <Services />
      <Reviews />
      <Testimonials />
      <div className="mb-14"></div>
      <Description />
      <Partners />
      <LatestNews />
      <GallarySlider />
      <OfferBanner open={open} onClose={() => setOpen(false)} />
      <MobileOfferBanner open={open1} onClose={() => setOpen1(false)} />
    </div>
  );
};

export default Home;
