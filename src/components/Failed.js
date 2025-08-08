/** @format */

import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { orderFailed } from "../Repository/Api";
import DynamicHelmet from "./Helmet/DynamicHelmet";

const Failed = () => {
  const { id } = useParams();

  useEffect(() => {
    orderFailed(id);
  }, [id]);

  return (
    <div className="Thanks_Container">
      <DynamicHelmet />
      <p className="title">Failed !</p>
      <p className="desc">Order Failed due to Technical issue</p>
      <Link to="/" style={{ cursor: "pointer" }}>
        <button>RETURN TO HOMEPAGE</button>
      </Link>
    </div>
  );
};

export default Failed;
