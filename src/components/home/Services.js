/** @format */

import React, { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";
import { getApi } from "../../Repository/Api";
import NoData from "../NoData/NoData";
import WithLoader from "../Wrapped/WithLoader";
import endPoints from "../../Repository/apiConfig";

const Services = ({ name, className }) => {
  const [response, setResponse] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    getApi({
      url: endPoints.service.getCategory,
      setResponse,
      setLoading: setLoad,
    });
  }, []);

  const Component = () => {
    return response?.data?.length > 0 ? (
      <section className="Service_Glass_Section">
        <div className={`Heading ${className}`}>Services Menu By Concern</div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-9 service-card ">
          {response?.data?.map((i, index) => (
            <ServiceCard
              key={index}
              src={i.image}
              service={i.name}
              slug={i.slug}
              id={i._id}
              name={name}
            />
          ))}
        </div>
      </section>
    ) : (
      <NoData message={"Sorry, we couldn't find any service's"} />
    );
  };

  return <WithLoader Wrapped={Component} loading={load} />;
};

export default Services;
