/** @format */

import React from "react";
import { useNavigate } from "react-router-dom";
import { ViewDescription } from "../../Helper/Herlper";
import { ImageLazyLoading } from "../../utils/helpingComponent";

const DescriptionView = ({
  src,
  title,
  content,
  desc,
  desc1,
  btnName,
  styles,
  reverse,
  link,
}) => {
  const navigate = useNavigate();

  return (
    <div className={`flex ${reverse} flex-shrink-0 Home_Two_Sec`}>
      <div className="w-1/2 h-[44rem] flex-shrink-0 img-container">
        <ImageLazyLoading
          img={src}
          alt={title}
          className="h-full w-full object-cover  object-image"
        />
      </div>

      <div className="flex flex-col items-center justify-between w-full">
        <h1 className=" bg-secondary w-full text-center  py-4 text-4xl font-medium text-primary title">
          {title}
        </h1>
        <div className="px-12 py-10 h-full text-center content_container ">
          {content && (
            <h4
              className={`text-3xl  font-medium leading-10 content ${
                styles ? styles : "mb-6"
              }`}
            >
              {content}
            </h4>
          )}

          <p className="text-2xl font-normal mb- leading-10 text-left description ">
            <ViewDescription description={desc} />
          </p>
          {desc1 && (
            <p className="text-2xl font-normal leading-10 text-left mt-8 description">
              {desc1}
            </p>
          )}
        </div>
        {btnName && (
          <button
            className="w-96 py-3 mb-14 text-primary bg-secondary  text-2xl font-semibold "
            onClick={() => navigate(link)}
          >
            {btnName}
          </button>
        )}
      </div>
    </div>
  );
};

export default DescriptionView;
