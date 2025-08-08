/** @format */

import React, { useEffect, useState } from "react";
import { getApi } from "../../Repository/Api";
import DynamicHelmet from "../Helmet/DynamicHelmet";
import endPoints from "../../Repository/apiConfig";
import { ImageLazyLoading } from "../../utils/helpingComponent";
import { useNavigate } from "react-router-dom";

const PaymentPlan = () => {
  const [metaResponse, setMetaResponse] = useState(null);
  const navigate = useNavigate();

  const fetchMetaTags = () => {
    getApi({
      url: endPoints.metaTags.paymentplanPage,
      setResponse: setMetaResponse,
    });
  };

  useEffect(() => {
    fetchMetaTags();
  }, []);

  useEffect(() => {
    const script = document.createElement("script");

    script.innerHTML = `
        (function (w, d, s, o, f, js, fjs) {
          w[o] =
            w[o] ||
            function () {
              (w[o].q = w[o].q || []).push(arguments);
            };
          (js = d.createElement(s)), (fjs = d.getElementsByTagName(s)[0]);
          js.id = o;
          js.src = f;
          js.async = 1;
          fjs.parentNode.insertBefore(js, fjs);
        })(
          window,
          document,
          "script",
          "_hw",
          "https://files.withcherry.com/widgets/widget.js"
        );
  
        _hw(
          "init",
          {
            debug: false,
            variables: {
              slug: "shahinahoja",
              name: "Shahina Hoja Aesthetics"
            },
            styles: {
              primaryColor: "#042b26",
              secondaryColor: "#e5d896",
              fontFamily: "Open Sans"
            }
          },
  
          ["all", "hero", "howitworks", "testimony", "faq", "calculator"]
        );`;

    const head = document.querySelector("head");
    head.appendChild(script);

    return () => {
      head.removeChild(script);
    };
  }, []);

  return (
    <>
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

      <div id="all"></div>
    </>
  );
};

export default PaymentPlan;
