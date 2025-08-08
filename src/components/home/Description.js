/** @format */

import React, { useEffect, useState } from "react";
import DescriptionView from "./DescriptionView";
import { getApi } from "../../Repository/Api";
import WithLoader from "../Wrapped/WithLoader";

const Description = () => {
  const [response, setResponse] = useState({});
  const [aboutus, setabvoutUs] = useState({});
  const [load, setLoad] = useState(false);

  const fetchHandler = async () => {
    setLoad(true);
    try {
      await getApi({
        url: "api/v1/Banner/getBanner/product",
        setResponse,
      });

      await getApi({
        url: "api/v1/static/getAboutUs",
        setResponse: setabvoutUs,
      });
    } catch {
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  const Component = () => {
    return (
      <section className="MaxComponent">
        {response?.data?.[0] && (
          <DescriptionView
            src={response?.data?.[0]?.bannerImage}
            title={response?.data?.[0]?.bannerName}
            content={response?.data?.[0]?.title}
            desc={response?.data?.[0]?.desc}
            btnName="EXPLORE PRODUCTS"
            link={"/shop"}
          />
        )}
        {aboutus?.data?.[0] && (
          <DescriptionView
            src={aboutus?.data?.[0]?.image}
            title={aboutus?.data?.[0]?.title}
            content={aboutus?.data?.[0]?.designation}
            desc={aboutus?.data?.[0]?.description?.[0]}
            btnName={"VIEW MORE"}
            styles={"mb-6 text-left"}
            reverse={"flex-row-reverse"}
            link={"/aboutus"}
          />
        )}

      </section>
    );
  };

  return <WithLoader Wrapped={Component} loading={load} />;
};

export default Description;
