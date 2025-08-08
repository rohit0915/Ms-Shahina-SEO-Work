/** @format */

import React from "react";
import { ImageLazyLoading } from "../../utils/helpingComponent";

const Description = ({ src, id, setDesc, response, title, desc }) => {
  return (
    <div className="Description_Box">
      <div className="w-[36rem] h-[36rem] flex-shrink-0 left_container ">
        <ImageLazyLoading
          img={src}
          alt={title}
          className={"h-full w-full text-[10px]"}
        />
      </div>
      <div className=" flex flex-col justify-between pb-10 items-start  px-12 pt-16 border border-t-primary border-r-primary border-b-primary">
        <h1 className="text-4xl font-medium text-primary"> {title} </h1>

        <p className="text-xl font-normal">{desc}</p>
        <div className="flex gap-2 ml-16">
          {response?.map((item, index) => (
            <hr
              style={{ cursor: "pointer" }}
              onClick={() => setDesc(index)}
              className={` rounded-xl h-2 ${
                id === index ? "w-28 bg-primary" : "bg-lighterGray w-11"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Description;
