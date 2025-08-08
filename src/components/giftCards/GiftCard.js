/** @format */

import { isArray } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getApi,
  getCart,
  getGiftCard,
  post_module_redux,
} from "../../Repository/Api";
import { ViewDescription } from "../../Helper/Herlper";
import { ImageLazyLoading } from "../../utils/helpingComponent";
import DynamicHelmet from "../Helmet/DynamicHelmet";
import endPoints from "../../Repository/apiConfig";

const GiftCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [item, setItem] = useState([]);
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [isOther, setIsOther] = useState(false);
  const [price, setPrice] = useState("");
  const [metaResponse, setMetaResponse] = useState(null);
  const dispatch = useDispatch();
  const quantity = 1;
  const dispatchFunc = [getCart];

  useEffect(() => {
    getGiftCard(setItem);
  }, []);

  const navigate = useNavigate();

  const toggleSelectBox = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value) => {
    if (value.type === "other") {
      setSelectedValue("Other");
      setIsOther(true);
    } else {
      setSelectedValue(value?.price);
      setIsOther(false);
    }
    setId(value?._id);
    setIsOpen(false);
  };

  function BackNavigation() {
    navigate(-1);
  }

  let payload;

  if (isOther) {
    payload = {
      quantity,
      email,
      price,
    };
  } else {
    payload = {
      quantity,
      email,
    };
  }

  const submitHandler = () => {
    const additionalFunctions = [() => navigate("/mycart")];
    dispatch(
      post_module_redux({
        url: `api/v1/add-to-cart/giftPrice/${id}`,
        payload,
        dispatchFunc,
        additionalFunctions,
      })
    );
  };

  function SelectedValue() {
    if (selectedValue) {
      if (selectedValue === "Other") {
        return selectedValue;
      } else {
        return `$${selectedValue}`;
      }
    }
  }

  const fetchMetaTags = () => {
    getApi({
      url: endPoints.metaTags.giftCardPage,
      setResponse: setMetaResponse,
    });
  };

  useEffect(() => {
    fetchMetaTags();
  }, []);

  return (
    <div className="my-20">
      {metaResponse && (
        <DynamicHelmet
          title={metaResponse?.data?.title}
          description={metaResponse?.data?.description}
        />
      )}
      <div className="Backward_Heading step_Heading">
        <div>
          <img
            src="/Image/1.png"
            alt=""
            onClick={() => BackNavigation()}
            loading="lazy"
          />
        </div>
        <p className="title">Gift Cards</p>
      </div>
      <div className="GiftCard_Container" style={{ marginTop: "40px" }}>
        {isArray(item) &&
          item?.map((i, index) => (
            <>
              <div
                className="w-[50rem] h-[22rem] mx-auto my-20 Img_Container"
                key={index}
              >
                <ImageLazyLoading
                  img={i?.image}
                  alt={""}
                  className="gift_card_image"
                />
              </div>
              <div className="w-[50rem] mx-auto Img_Container">
                <h2
                  className="text-4xl font-bold text-primary text_Title"
                  style={{ fontWeight: "bold" }}
                >
                  {i.name}
                </h2>
                <div className="mt-3 mb-4" />
                <ViewDescription description={i.description} />
                <div className="mt-3 mb-4" />

                <label
                  className="font-bold flex flex-col"
                  style={{ fontSize: "20px", fontFamily: "Poppins" }}
                >
                  <div className="relative inline-block">
                    <div
                      className="w-full border border-black py-5 px-12 flex items-center justify-between cursor-pointer"
                      onClick={toggleSelectBox}
                    >
                      <span> {SelectedValue()}</span>
                      <img
                        className={`w-7 h-7 transition-transform transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        src="/Image/77.png"
                        alt="arrow down"
                        loading="lazy"
                      />
                    </div>
                    {isOpen && (
                      <div className="absolute bg-white  w-full mt-2 border space-y-4 border-black py-2 px-12 drop_values ">
                        <div className="cursor-pointer text-3xl hover:bg-gray-300"></div>
                        {i?.priceArray?.map((item, index) => (
                          <div
                            key={`option${index}`}
                            className="cursor-pointer text-2xl hover:bg-gray-300"
                            onClick={() => handleOptionClick(item)}
                          >
                            {item.type === "other"
                              ? "Other"
                              : `$${item.price} `}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </label>

                <div>
                  <input
                    type="email"
                    className="InputEmail"
                    placeholder="Enter email to send gift card"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {isOther && (
                  <div>
                    <input
                      type="number"
                      className="InputEmail"
                      placeholder="Enter Amount"
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                    />
                  </div>
                )}

                {selectedValue && (
                  <div className="flex justify-center font-bold  items-center mt-16">
                    <div className="flex items-center gap-10">
                      <h3 className="text-2xl  text-mediumGray">Price : </h3>
                      <span className="text-2xl  text-black">
                        {selectedValue === "Other"
                          ? `$${price}`
                          : `$${selectedValue}`}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex justify-center mt-32">
                  <button
                    className="text-darkSecondary text-1xl font-bold w-[31rem] bg-primary py-4 "
                    style={{ fontSize: "24px" }}
                    onClick={() => submitHandler()}
                  >
                    PURCHASE NOW
                  </button>
                </div>
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

export default GiftCard;
