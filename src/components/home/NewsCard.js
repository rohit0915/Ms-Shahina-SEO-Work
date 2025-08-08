/** @format */

import React from "react";
import { Link } from "react-router-dom";
import { ViewDescription } from "../../Helper/Herlper";
import { ImageLazyLoading } from "../../utils/helpingComponent";

const NewsCard = ({ src, title, content }) => {
  const textTransformation = (content) => {
    if (content?.length > 100) {
      return <ViewDescription description={content?.substr(0, 100)} />;
    } else {
      return <ViewDescription description={content} />;
    }
  };

  return (
    <section className="p-3 w-[430px] NewsCard ">
      <div className="my-2 Upper_Div">
        <div>
          <h3 className="font-medium  text-primary title">
            {title?.substr(0, 100)}
          </h3>
          <Link to={`/news/${title}`}>
            <ImageLazyLoading img={src} alt={title} className="w-full h-auto" />
          </Link>
          <p className="font-normal desc">{textTransformation(content)} </p>
        </div>
        <Link to={`/news/${title}`}>
          <button>Read More</button>
        </Link>
      </div>
    </section>
  );
};

export default NewsCard;
