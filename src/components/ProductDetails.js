/** @format */

import React, { useState, useEffect, useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Tabs } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  getSingleProduct,
  getFrequently,
  addFBP,
  getSingleProductAuth,
  createApi,
  getApi,
  post_module_redux,
  getCart,
} from "../Repository/Api";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated } from "../store/authSlice";
import { addToCart } from "../store/DummyCart";
import { ViewDescription } from "../Helper/Herlper";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import FullScreenLoader from "./Loader/FullScreenLoader";
import DynamicHelmet from "./Helmet/DynamicHelmet";
import { ImageLazyLoading } from "../utils/helpingComponent";
import endPoints from "../Repository/apiConfig";

const ProductDetails = () => {
  const { name } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get("id");
  const [product, setProduct] = useState({});
  const [img, setImg] = useState("");
  const [relatedProducts, setRelatedProducts] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [sizes, setSizes] = useState([]);
  const [price, setPrice] = useState(0);
  const isLoggedIn = useSelector(isAuthenticated);
  const [priceId, setPriceId] = useState("");
  const [size, setSize] = useState("");
  const [recentProduct, setRecentProduct] = useState({});
  const [isWishlist, setIsWishlist] = useState(null);
  const [FBarr, setFBArr] = useState([]);
  const [inCart, setInCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [metaResponse, setMetaResponse] = useState(null);

  let payload;

  const fetchMetaTags = useCallback(() => {
    if (productId) {
      getApi({
        url: endPoints.metaTags.productDetailPage(productId),
        setResponse: setMetaResponse,
      });
    }
  }, [productId]);

  if (size) {
    payload = {
      priceId,
      quantity,
      size,
      sizePrice: price,
    };
  } else {
    payload = {
      quantity,
      sizePrice: price,
    };
  }

  const navigationHandler = (res) => {
    const url = res?.session?.url;
    window.location.href = url;
  };

  function buyWithStripe() {
    let payload;
    if (priceId) {
      payload = {
        productId: product?._id,
        priceId,
        quantity,
      };
    } else {
      payload = {
        productId: product?._id,
        quantity,
      };
    }

    const additionalFunctions = [navigationHandler];
    createApi({
      url: "api/v1/placeOrderForGuest",
      payload,
      additionalFunctions,
      setLoading,
    });
  }

  function addToFav() {
    const additionalFunctions = [fetchProduct];
    createApi({
      url: `api/v1/user/createWishlist/${productId}`,
      payload: {},
      additionalFunctions,
    });
  }

  function removeFromFav() {
    const additionalFunctions = [fetchProduct];
    createApi({
      url: `api/v1/user/removeFromWishlist/${productId}`,
      payload: {},
      additionalFunctions,
    });
  }

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const cartHandler = async () => {
    if (isLoggedIn === true) {
      const dispatchFunc = [getCart];
      const additionalFunctions = [fetchProduct];
      dispatch(
        post_module_redux({
          url: `api/v1/add-to-cart/product/${productId}`,
          payload,
          dispatchFunc,
          additionalFunctions,
          setLoading,
        })
      );
    } else {
      let payload;
      if (size) {
        payload = {
          _id: priceId,
          quantity,
          product: {
            _id: product._id,
            name: product.name,
            images: product.productImages,
          },
          priceId,
          size,
          sizePrice: price,
        };
      } else {
        payload = {
          _id: product._id,
          quantity,
          product: {
            _id: product._id,
            name: product.name,
            images: product.productImages,
          },
          sizePrice: price,
        };
      }
      await dispatch(addToCart(payload));
      setInCart(true);
    }
  };

  const FBHandler = (id) => {
    const ids = FBarr?.map((i) => i._id);
    const payload = {
      quantity: 1,
      productId: ids,
    };
    dispatch(addFBP(id, payload));
  };

  useEffect(() => {
    getFrequently(setRelatedProducts, productId);
  }, [productId]);

  useEffect(() => {
    fetchMetaTags();
  }, [fetchMetaTags]);

  const fetchProduct = async () => {
    try {
      if (isLoggedIn === true) {
        await getSingleProductAuth(
          setProduct,
          productId,
          setImg,
          setSizes,
          setPrice,
          setSize,
          setPriceId,
          setIsWishlist,
          setInCart
        );
      } else {
        await getSingleProduct(
          setProduct,
          name,
          setImg,
          setSizes,
          setPrice,
          setSize,
          setPriceId
        );
      }
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [name, isLoggedIn, productId]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [productId]);

  // useEffect(() => {
  //   setProductId(product?._id)
  // }, [product])

  const MyComp = ({ desc, list, listes }) => {
    return (
      <div className="content">
        {desc && <ViewDescription description={desc} />}

        {list && (
          <ul>
            {list?.map((i, index) => (
              <div style={{ marginTop: "10px" }} key={`Step${i.step}${index}`}>
                <span> {i?.step} </span>
                <ViewDescription description={i?.description} />
              </div>
            ))}
          </ul>
        )}
        {listes && <ViewDescription description={listes?.[0]} />}
      </div>
    );
  };

  const items = [
    product?.description && {
      key: " DESCRIPTION1",
      label: "DESCRIPTION",
      children: <MyComp desc={product?.description} />,
    },
    product?.ingredients && {
      key: "INGREDIENTS2",
      label: "INGREDIENTS",
      children: <MyComp desc={product?.ingredients} />,
    },
    product?.howTouse && {
      key: "HOWTOUSE3",
      label: "HOW TO USE",
      children: <MyComp list={product?.howTouse} />,
    },
    product?.benfit && {
      key: "BENEFITS4",
      label: "BENEFITS",
      children: <MyComp listes={product?.benfit} />,
    },
    product?.returnPolicy && {
      key: "ReturnPolicy5",
      label: "RETURN POLICY",
      children: <MyComp desc={product?.returnPolicy} />,
    },
  ].filter(Boolean);

  useEffect(() => {
    if (isLoggedIn === true) {
      getApi({
        url: `api/v1/getRecentlyProductView/${productId}`,
        setResponse: setRecentProduct,
      });
    }
  }, [isLoggedIn, productId]);

  useEffect(() => {
    if (relatedProducts) {
      setFBArr(relatedProducts?.products);
    }
  }, [relatedProducts]);

  const handleCheck = (i) => {
    if (isItemInCart(i._id)) {
      removeFromFBarr(i._id);
    } else {
      setFBArr((prev) => [...prev, i]);
    }
  };

  const isItemInCart = (itemId) => {
    return FBarr?.some((i) => i?._id === itemId);
  };

  const fbpTotal = FBarr?.reduce(
    (total, item) => total + parseFloat(item.price || 0),
    0
  );

  const removeFromFBarr = (itemId) => {
    setFBArr((prevItems) => prevItems.filter((item) => item._id !== itemId));
  };

  const membership_fetcher = () => {
    if (product?.multipleSize === false) {
      const greterThan =
        product?.membershipDiscountPer > 0 && product?.membershipDiscount > 0;
      return (
        greterThan && (
          <div className="Membership_discount">
            <div>
              <span className="title"> Membership Discount %:</span>
              <span className="desc"> {product?.membershipDiscountPer}% </span>
            </div>
            <div>
              <span className="title">Total savings of:</span>
              <span className="desc"> ${product?.membershipDiscount} </span>
            </div>
          </div>
        )
      );
    } else {
      const filtered = product?.sizePrice?.filter((i) => i._id === priceId);
      const greterThan =
        filtered?.[0]?.membershipDiscountPer > 0 &&
        filtered?.[0]?.membershipDiscount > 0;

      return (
        greterThan && (
          <div className="Membership_discount">
            <div>
              <span className="title"> Membership Discount %:</span>
              <span className="desc">
                {" "}
                {filtered?.[0]?.membershipDiscountPer}%{" "}
              </span>
            </div>
            <div>
              <span className="title">Total savings of:</span>
              <span className="desc">
                {" "}
                ${filtered?.[0]?.membershipDiscount}{" "}
              </span>
            </div>
          </div>
        )
      );
    }
  };

  return (
    <>
      {metaResponse && (
        <DynamicHelmet
          title={metaResponse?.data?.title}
          description={metaResponse?.data?.description}
        />
      )}
      {loading && <FullScreenLoader />}

      <div className="Backward_Heading step_Heading">
        <div>
          <ImageLazyLoading
            img={"/Image/1.png"}
            onClick={() => navigate(-1)}
            alt={"Go Back"}
          />
        </div>
      </div>

      <div className="indivisual-product">
        <div className="left">
          <div className="upperImage">
            <ImageLazyLoading img={img} alt={product?.name} />

            {isWishlist === true && (
              <FaHeart onClick={removeFromFav} className="heart" />
            )}
            {isWishlist === false && (
              <FaRegHeart className="heart" onClick={() => addToFav()} />
            )}
          </div>

          <div className="multi-Images">
            {product?.productImages?.map((i, index) => (
              <ImageLazyLoading
                img={i?.image}
                alt={"product Image"}
                key={`Product-Image${index}`}
                className="cursor-pointer text-[10px]"
                onClick={() => setImg(i.image)}
              />
            ))}
          </div>
        </div>

        <div className="right">
          <h1 className="title">{product?.name}</h1>

          {product?.isShowAddToCart &&
            <div className="price-container">
              <span className="price">${price}</span>
            </div>
          }

          {membership_fetcher()}
          {product?.isShowAddToCart &&
            <>
              <p className="quantity">QUANTITY</p>

              <div style={{ width: "40%" }} className="Quantity_Container">
                <div className="qty">
                  <span
                    className="input cursor-pointer"
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  >
                    <AiOutlineMinus />
                  </span>
                  <span className="item"> {quantity} </span>
                  <span
                    className="input cursor-pointer"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <AiOutlinePlus />
                  </span>
                </div>
              </div>
            </>
          }

          {sizes?.length > 0 && (
            <div className="multiple-sizes">
              <p> Select Size </p>
              <div className="Main">
                {sizes?.map((i, index) => (
                  <div
                    key={`multiple-sizes${index}`}
                    className={`box ${size === i.size ? "active" : ""} `}
                    onClick={() => {
                      setSize(i.size);
                      setPrice(i.price);
                      setPriceId(i._id);
                    }}
                  >
                    {i.size}
                  </div>
                ))}
              </div>
            </div>
          )}

          {product?.acneType || product?.considerAcne ? (
            <div className="multiple-sizes">
              <p>
                Categories : {product?.acneType} , {product?.considerAcne}
              </p>
            </div>
          ) : (
            ""
          )}


          {
            product === undefined ? (
              <div><FullScreenLoader /></div>
            ) :
              product?.isShowAddToCart ? (
                <div className="buttons">
                  <button className="cart" onClick={() => cartHandler()}>
                    {inCart ? "ADDED" : "ADD TO CART"}
                  </button>

                  <button className="stripe" onClick={() => buyWithStripe()}>
                    BUY WITH STRIPE
                  </button>
                </div>
              ) : (
                <div className="py-8">
                  <p className="text-lg text-black">
                    Please contact the office for more information <br />
                    at{" "}
                    <a href="tel:+1 (469) 823-0402" className="text-[#BA6B5D] hover:underline">
                      +1 (469) 823-0402
                    </a>{" "}
                    or{" "}
                    <a
                      href="mailto:info@shahinahoja.com"
                      className="text-[#BA6B5D] hover:underline"
                    >
                      info@shahinahoja.com
                    </a>
                  </p>
                </div>
              )}

          <div className="tabs-container">
            <Tabs defaultActiveKey="DESCRIPTION1" items={items} />
          </div>
        </div>
      </div>
      {product?.keyIngredients?.[0]?.length > 15 && (
        <div className="Product_Key_Ingredeints">
          <div className="container">
            <div className="Item">
              <div class="ingredients">
                <h3 class="heading">Key Ingredients</h3>
                <ViewDescription description={product?.keyIngredients?.[0]} />
              </div>
              <div className="Image_Container">
                <ImageLazyLoading img={img} alt={"Key Ingredient"} />
              </div>
            </div>
          </div>
        </div>
      )}

      {relatedProducts?.products?.length > 0 && (
        <div className="frequently-bought">
          <p className="title">Frequently Bought Together</p>

          <div className="container">
            <div className="left">
              {FBarr?.map((i, index) => (
                <>
                  <ImageLazyLoading
                    img={i.productImages?.[0]?.image}
                    className={"Image text-[10px]"}
                    alt={i?.name}
                    key={`Product_Image_Carousel_Images${index}`}
                  />

                  <ImageLazyLoading
                    img={"/Image/96.png"}
                    className={"plus text-[10px]"}
                    alt={"plus"}
                    key={`Product_Image_Carousel_Images_Img${index}`}
                  />
                </>
              ))}
            </div>
            {FBarr?.length > 0 && (
              <div className="right">
                <p className="heading">TOTAL PRICE</p>
                <p className="price">${fbpTotal} </p>
                <button onClick={() => FBHandler(relatedProducts?._id)}>
                  ADD SELECTED TO CART
                </button>
              </div>
            )}
          </div>

          <div className="list">
            {relatedProducts?.products?.map((i, index) => (
              <div className="Item" key={`Related_Product${index}`}>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "flex-start",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isItemInCart(i._id)}
                    onChange={() => handleCheck(i)}
                  />

                  <p className="head">{i.name} </p>
                </div>
                <p className="price">
                  $
                  {i.multipleSize === true ? i?.sizePrice?.[0]?.price : i.price}{" "}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {recentProduct?.cart?.length > 0 && (
        <>
          <h2 className="text-4xl font-medium  text-primary text-center my-14">
            You May Also Like
          </h2>
          <div className="multi-product">
            {recentProduct?.cart?.slice(0, 4)?.map((i, index) => (
              <div
                className="Item"
                key={`related-product${index}`}
                onClick={() =>
                  navigate(`/product/${i.products?.name}?id=${i.products?._id}`)
                }
              >
                <div className="thumbnail">
                  <ImageLazyLoading
                    img={i.products?.productImages?.[0]?.image}
                    alt={i.products?.name}
                  />
                </div>
                <p className="price">
                  $
                  {i.products?.sizePrice?.[0]?.price
                    ? i.products?.sizePrice?.[0]?.price
                    : i.products?.price}{" "}
                </p>
                <p className="title">{i.products?.name}</p>
              </div>
            ))}
          </div>{" "}
        </>
      )}
    </>
  );
};

export default ProductDetails;
