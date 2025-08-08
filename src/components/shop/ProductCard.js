/** @format */

import React from "react";
import { Link } from "react-router-dom";
import { ImageLazyLoading } from "../../utils/helpingComponent";

const ProductCard = ({ src, title,slug, price, id }) => {
  return (
    <Link to={`/product/${slug}?id=${id}`}>
      <div className="Item cursor-pointer">
        <div className="thumbnail">
          <ImageLazyLoading img={src} alt={title} className="w-full h-full" />
        </div>
        <p className="text-2xl font-black text-primary">${price}</p>
        <h4 className="text-xl font-normal">{title}</h4>
      </div>
    </Link>
  );
};

export default ProductCard;
