/** @format */

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { filterProduct } from "../../Repository/Api";
import { ImageLazyLoading } from "../../utils/helpingComponent";

const SearchHeader = ({ isOpen, setIsOpen }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    filterProduct(searchTerm, setFilteredProducts);
  }, [searchTerm]);

  const uniqueNamedArray = [];
  const encounteredNames = new Set();

  filteredProducts?.forEach((product) => {
    const { name } = product;
    if (!encounteredNames.has(name)) {
      encounteredNames.add(name);
      uniqueNamedArray.push(product);
    }
  });

  const handleNavigator = (link) => {
    navigate(link);
    setIsOpen(false);
  };

  return (
    <motion.div
      initial={{
        height: 0,
        opacity: 0,
        display: "none",
        zIndex: -100,
      }}
      animate={{
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
        zIndex: 200,
      }}
      transition={{ duration: 0.3 }}
      exit={{
        height: 0,
        opacity: 0,
        display: "none",
        zIndex: -100,
      }}
      className="search_Header"
    >
      <div className="content">
        <div className="search-input">
          <ImageLazyLoading
            img={"/asessts/navbar/search.png"}
            alt={"Search Products"}
          />
          <input
            type="search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {uniqueNamedArray?.map((i, index) => (
          <div className="Item" key={index}>
            <div className="sub-Item">
              <div className="media">
                <ImageLazyLoading
                  img={i.productImages?.[0]?.image}
                  alt={i.name}
                  className={"product-image"}
                />
                <div className="media-body">
                  <div className="product-name">
                    <span
                      className="cursor-pointer"
                      onClick={() => handleNavigator(`/product/${i.name}?id=${i._id}`)}
                    >
                      {i.name}
                    </span>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SearchHeader;
