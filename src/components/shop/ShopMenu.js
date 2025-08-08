/** @format */

import React, { useState } from "react";
import { shopMenu } from "../../constants/shopConstant";
import { BsChevronDown } from "react-icons/bs";
import {
  BrandsSlider,
  NutritionSlider,
  ProductTypeSlider,
  SkinConditionsSlider,
  SkinTypeSlider,
} from "./ShopSlider";

const ShopMenu = () => {
  const [hoveredType, setHoveredType] = useState(null);
  const [isBrand, setBrand] = useState(true);

  const handleLeave = () => {
    setBrand(false);
    setHoveredType(null);
  };

  const clickHandler = (id) => {
    if (id === hoveredType) {
      setHoveredType(null);
    } else {
      if (id === 2) {
        setBrand(true);
      }
      setHoveredType(id);
    }
  };

  return (
    <div
      className="relative Shop_Menu_Container"
      onMouseLeave={() => handleLeave()}
    >
      <ul className="Item_Name">
        {shopMenu.map((item, id) => (
          <li key={id}>
            <div onClick={() => clickHandler(id)}>
              {item}
              <BsChevronDown />
            </div>
          </li>
        ))}
      </ul>
      <div
        className={` Item_Container  ${hoveredType !== null ? "fade-entered" : "fade-exiting"
          }`}
      >
        {hoveredType === 0 && <SkinTypeSlider />}
        {hoveredType === 1 && <ProductTypeSlider />}
        {hoveredType === 2 && <BrandsSlider isBrand={isBrand} />}
        {hoveredType === 3 && <SkinConditionsSlider />}
        {hoveredType === 4 && <NutritionSlider />}
      </div>
    </div>
  );
};

export default ShopMenu;
