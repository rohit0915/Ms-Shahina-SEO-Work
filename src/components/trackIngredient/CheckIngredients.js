/** @format */

import React, { useEffect, useState } from "react";
import { Header } from "../../utils/helpingComponent";
import { BiSearch } from "react-icons/bi";
import { getApi, getIngredeints } from "../../Repository/Api";
import DynamicHelmet from "../Helmet/DynamicHelmet";
import endPoints from "../../Repository/apiConfig";

const ingredients = ["COSMETICS", "FOOD INGREDIENTS", "BIRTH CONTROL"];

const CheckIngredients = () => {
  const [selected, setSelected] = useState("COSMETICS");
  const [response, setResponse] = useState([]);
  const [isMatched, setIsMatched] = useState("");
  const [content, setContent] = useState("");
  const [showBox, setShowBox] = useState(true);
  const [metaResponse, setMetaResponse] = useState(null);

  const fetchMetaTags = () => {
    getApi({
      url: endPoints.metaTags.checkIngredientPage,
      setResponse: setMetaResponse,
    });
  };

  useEffect(() => {
    getIngredeints(selected, setResponse);
  }, [selected]);

  useEffect(() => {
    fetchMetaTags();
  }, []);

  const isEmpty = Object.keys(response).length === 0;

  // ---
  const items = response?.map((i) => i.name);

  function clearPast() {
    setValue("");
  }

  const [value, setValue] = useState("");

  const highlightWords = () => {
    const cleanedItems = items?.map((i) =>
      i?.replace(/[+[\]()<>\/;'\\|]/g, "").trim()
    );
    const escapedItems = cleanedItems?.map((item) =>
      item.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
    );
    const pattern = new RegExp(`\\b(${escapedItems?.join("|")})\\b`, "gi");
    const replaceValue = value?.replace("&amp;", "&");
    const matches = replaceValue?.match(pattern);
    setShowBox(true);
    if (matches) {
      setIsMatched("matched");
    } else {
      setIsMatched("NotMatched");
    }
    const highlighted = replaceValue?.replace(
      pattern,
      (match) => `<span style="color : red;" >${match}</span>`
    );
    setContent(highlighted);
  };

  // Sorted Response
  const sortedResponse = response?.sort((a, b) => {
    const nameA = a?.name?.toUpperCase();
    const nameB = b?.name?.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  // select new type

  function typeSelector(name) {
    setSelected(name);
    setValue("");
    setShowBox(false);
  }

  return (
    <section className="bg-primary">
      {metaResponse && (
        <DynamicHelmet
          title={metaResponse?.data?.title}
          description={metaResponse?.data?.description}
        />
      )}
      <Header
        heading={"Check Ingredients"}
        styles={"font-light text-secondary"}
      />

      <main className="flex gap-24 justify-center pb-32 Check_Ingredeints">
        <div className="w-[54rem] left_container ">
          <ul className="flex  justify-between my-6 list">
            {ingredients?.map((list, index) => (
              <li
                className={`${
                  selected === list
                    ? "text-secondary font-extrabold"
                    : "font-medium text-white"
                } whitespace-nowrap text-secondary w-48  text-2xl cursor-pointer flex justify-center `}
                onClick={() => typeSelector(list)}
                key={index}
              >
                {list}
              </li>
            ))}
          </ul>

          <div
            className={`w-full flex ${
              selected === "FOOD INGREDIENTS"
                ? "items-center"
                : selected === "BIRTH CONTROL"
                ? "items-end"
                : "items-start"
            } flex-col rounded-full h-1.5 bg-lighterGray`}
          >
            <div
              className={`transition-all duration-700 ease-linear translate-[50%] h-1.5 rounded-full bg-secondary w-52`}
            ></div>
          </div>

          <p className="check-ingredient-heading">
            If you have acne-prone skin, you need to check skincare, haircare,
            and makeup products for comedogenic (pore-clogging) ingredients.
            Find the ingredients list of the product that you would like to
            check on the Internet, copy and insert it here:
          </p>

          <form>
            <div className="edit-cont">
              <textarea
                className="ingredient-textarea"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Please insert ingredients here....."
              />
            </div>

            <div className="text-2xl font-semibold flex justify-between items-center my-6 gap-4">
              <button
                type="button"
                onClick={highlightWords}
                className="w-96 bg-secondary text-primary  rouded-xl py-3 rounded-xl"
              >
                Check
              </button>
              <button
                type="button"
                className="w-96 text-secondary border border-secondary rounded-xl py-3"
                onClick={() => clearPast()}
              >
                Clear
              </button>
            </div>
          </form>
          {showBox && (
            <>
              {isMatched === "matched" && (
                <p className="text-sl text-[#FF0000] font-normal line-clamp-4 ">
                  Unfortunately , there are some comedogenic ingredients.
                  Comedogenics ingredients are listed in red .
                </p>
              )}
              {isMatched === "NotMatched" && (
                <p className="text-sl text-[#fff] font-normal line-clamp-4 ">
                  Congratulations ! This product does not have any comedogenic
                  ingredients.
                </p>
              )}
              {content && (
                <div
                  dangerouslySetInnerHTML={{ __html: content }}
                  className="conten-table mt-4"
                />
              )}
            </>
          )}
        </div>

        {isEmpty === false && (
          <div className="w-96 bg-secondary text-primary px-5 rounded-xl">
            <div className="flex justify-between my-9  items-center">
              <span className="text-lg font-semibold">Full List</span>
              <BiSearch className="text-4xl " />
            </div>

            <div
              className="font-semibold text-sm"
              style={{ overflowY: "auto", maxHeight: "600px" }}
            >
              {sortedResponse?.map(
                (list, index) =>
                  list?.isShow === true && (
                    <p
                      key={`list ${index}`}
                      className={
                        "flex flex-col pt-6 border-b border-b-primary  pb-6 mb-4"
                      }
                    >
                      {list?.name}
                    </p>
                  )
              )}
            </div>
          </div>
        )}
      </main>
    </section>
  );
};

export default CheckIngredients;
