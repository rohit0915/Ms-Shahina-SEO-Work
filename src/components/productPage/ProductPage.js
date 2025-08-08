/** @format */

import React, { useCallback, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import AllProducts from "./AllProducts";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllBrands,
  getAllNutrition,
  getApi,
  getProductType,
  getSkinCondition,
  getSkinType,
} from "../../Repository/Api";
import WithLoader from "../Wrapped/WithLoader";
import { debouncedSetQuery } from "../../utils/utilsFunc";
import { ImageLazyLoading } from "../../utils/helpingComponent";
import DynamicHelmet from "../Helmet/DynamicHelmet";
import endPoints from "../../Repository/apiConfig";

const ProductPage = () => {
  const navigate = useNavigate();
  const [skinType, setSkinType] = useState([]);
  const [productType, setProductType] = useState([]);
  const [brands, setBrands] = useState([]);
  const [skinCondition, setSkinCondition] = useState([]);
  const [nutrition, setNutrition] = useState([]);
  const { type, name } = useParams();
  const [img, setImg] = useState("");
  const [load, setLoad] = useState(false);
  const [limit, setLimit] = useState(15);
  const [search, setSearch] = useState("");
  const [data, setData] = useState({});
  const [categoryType, setCategoryType] = useState("");

  useEffect(() => {
    getSkinType(setSkinType);
    getProductType(setProductType);
    getAllBrands(setBrands);
    getSkinCondition(setSkinCondition);
    getAllNutrition(setNutrition);
  }, []);

  useEffect(() => {
    if (type === "skin-type") {
      setCategoryType("skinTypeId");
    } else if (type === "product-type") {
      setCategoryType("productTypeId");
    } else if (type === "brands") {
      setCategoryType("brandId");
    } else if (type === "skin-conditions") {
      setCategoryType("skinConditionId");
    } else if (type === "nutrition") {
      setCategoryType("nutritionId");
    }
  }, [type]);

  const fetchHandler = useCallback(() => {
    if (categoryType) {
      const queryParams = new URLSearchParams({
        search,
        limit,
        [categoryType]: name,
      });

      getApi({
        url: endPoints.products.getProductByCategory(queryParams?.toString()),
        setResponse: setData,
        setLoading: setLoad,
      });
    }
  }, [categoryType, name, search, limit]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
    setLimit(15);
  }, [type]);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  useEffect(() => {
    if (data) {
      if (type === "skin-type") {
        setImg(data?.data?.docs?.[0]?.skinTypeId?.image);
      } else if (type === "product-type") {
        setImg(data?.data?.docs?.[0]?.productTypeId?.image);
      } else if (type === "brands") {
        setImg(data?.data?.docs?.[0]?.brandId?.image);
      } else if (type === "skin-conditions") {
        setImg(data?.data?.docs?.[0]?.skinConditionId?.image);
      } else if (type === "nutrition") {
        setImg(data?.data?.docs?.[0]?.nutritionId?.image);
      } else {
        setImg("/Image/39.jpg");
      }
    } else {
      setImg("/Image/39.jpg");
    }
  }, [data, img, type]);

  const Component = () => {
    return (
      <AllProducts
        products={data?.data?.docs}
        setLimit={setLimit}
        limit={limit}
        hasNextPage={data?.data?.hasNextPage}
      />
    );
  };

  return (
    <section>
      <DynamicHelmet />
      <div
        className="relative_product_container"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="content"></div>
        <div className="Image">
          <ImageLazyLoading
            img={"/asessts/back-button.svg"}
            alt={"Go back"}
            className={"text-[10px] cursor-pointer"}
            onClick={() => navigate(-1)}
          />
        </div>
      </div>

      <section className="Category_Product_Container">
        <div className="Main ">
          <h1 className="text-4xl text-center font-medium text-primary TItle_of">
            {/* {name ? name : "All"} Products */}
          </h1>

          <div className=" flex gap-5 items-center text-xl border-b-2 pb-2   w-80 border-b-primary text-primary">
            <BiSearch className="text-3xl" />
            <input
              className="px-2 w-full"
              type="search"
              placeholder="Search Products...."
              onChange={(e) => {
                debouncedSetQuery(e.target.value, setSearch);
              }}
              style={{ outline: "none" }}
            />
          </div>
        </div>

        <div className="flex flex-shrink-0 justify-between items-start Item_Container ">
          <div className=" w-[30%] px-12 py-4 left_container">
            {skinType?.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-primary"> SKIN TYPE </h3>
                <div className="grid grid-flow-row gap-5 my-10">
                  {skinType?.map((item, index) => (
                    <label
                      key={`option${index}`}
                      className="flex items-center gap-4 text-xl break break-keep cursor-pointer"
                      htmlFor={item?.name}
                      onClick={() =>
                        navigate(`/allproducts/skin-type/${item.slug}`)
                      }
                    >
                      {item?.name}
                    </label>
                  ))}
                  <hr className="bg-black h-1 my-5" />
                </div>
              </div>
            )}

            {productType?.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-primary">
                  {" "}
                  PRODUCT TYPE{" "}
                </h3>
                <div className="grid grid-flow-row gap-5 my-10">
                  {productType?.map((item, index) => (
                    <label
                      key={`option${index}`}
                      className="flex items-center gap-4 text-xl break break-keep cursor-pointer"
                      htmlFor={item?.name}
                      onClick={() =>
                        navigate(`/allproducts/product-type/${item.slug}`)
                      }
                    >
                      {item?.name}
                    </label>
                  ))}
                  <hr className="bg-black h-1 my-5" />
                </div>
              </div>
            )}

            {brands?.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-primary">BRANDS</h3>
                <div className="grid grid-flow-row gap-5 my-10">
                  {brands?.map((item, index) => (
                    <label
                      key={`option${index}`}
                      className="flex items-center gap-4 text-xl break break-keep cursor-pointer"
                      htmlFor={item?.name}
                      onClick={() =>
                        navigate(`/allproducts/brands/${item.slug}`)
                      }
                    >
                      {item?.name}
                    </label>
                  ))}
                  <hr className="bg-black h-1 my-5" />
                </div>
              </div>
            )}

            {skinCondition?.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-primary">
                  SKIN CONDITIONS
                </h3>
                <div className="grid grid-flow-row gap-5 my-10">
                  {skinCondition?.map((item, index) => (
                    <label
                      key={`option${index}`}
                      className="flex items-center gap-4 text-xl break break-keep cursor-pointer"
                      htmlFor={item?.name}
                      onClick={() =>
                        navigate(`/allproducts/skin-conditions/${item.slug}`)
                      }
                    >
                      {item?.name}
                    </label>
                  ))}
                  <hr className="bg-black h-1 my-5" />
                </div>
              </div>
            )}

            {nutrition?.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-primary">NUTRITION</h3>
                <div className="grid grid-flow-row gap-5 my-10">
                  {nutrition?.map((item, index) => (
                    <label
                      key={`option${index}`}
                      className="flex items-center gap-4 text-xl break break-keep cursor-pointer"
                      htmlFor={item?.name}
                      onClick={() =>
                        navigate(`/allproducts/nutrition/${item.slug}`)
                      }
                    >
                      {item?.name}
                    </label>
                  ))}
                  <hr className="bg-black h-1 my-5" />
                </div>
              </div>
            )}
          </div>
          <div className="w-full border-l-2 border-l-primary mb-20 product-colored-container">
            <WithLoader Wrapped={Component} loading={load} />
          </div>
        </div>
      </section>
    </section>
  );
};

export default ProductPage;
