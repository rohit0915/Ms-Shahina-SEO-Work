/** @format */

import React from "react";
import { ImageLazyLoading } from "../../utils/helpingComponent";

const NoData = ({ message }) => {
  return (
    <div className="Not-Found">
      <div className="thumbnail-container">
        <ImageLazyLoading
          img={"/Image/no-results.png"}
          alt={"404"}
          className={"thumbnail"}
        />
      </div>

      <h5> {message} </h5>
    </div>
  );
};

export default NoData;
