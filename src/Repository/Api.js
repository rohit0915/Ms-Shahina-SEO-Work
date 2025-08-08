/** @format */

import axios from "axios";
import { Store } from "react-notifications-component";
import { Login, LOGOUT } from "../store/authSlice";
import { getCartItems } from "../store/cartSlice";

const Baseurl = process.env.React_App_Baseurl;

export const showMsg = (title, message, type) => {
  Store.addNotification({
    title,
    message,
    type,
    insert: "top",
    container: "top-center",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 4000,
      onScreen: true,
    },
  });
};

export const getAllProducts = async (setResponse, url, setTotal) => {
  try {
    const response = await axios.get(
      `${Baseurl}api/v1/Product/all/paginateProductSearch?${url}`
    );
    const data = response.data.data.docs;
    const total = response?.data?.data?.totalDocs;
    setTotal(total);
    setResponse(data);
  } catch {}
};

const getLimitedOffer = async (setResponse, query) => {
  try {
    const response = await axios.get(
      `${Baseurl}api/v1/Banner/getBanner/${query}`
    );
    const data = response.data.data;
    setResponse(data);
  } catch {}
};

const getOfferService = async (setResponse) => {
  try {
    const response = await axios.get(
      `${Baseurl}api/v1/Service/getOnSaleByToken/Service`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );
    const data = response.data.data;
    setResponse(data);
  } catch {}
};

export const getOfferServicebeforeLogin = async (setResponse) => {
  try {
    const response = await axios.get(
      `${Baseurl}api/v1/Service/getOnSale/Service`
    );
    const data = response.data.data;
    setResponse(data);
  } catch {}
};

const getSkinType = async (setResponse) => {
  try {
    const response = await axios.get(
      `${Baseurl}api/v1/admin/SkinType/allSkinType`
    );
    const data = response.data.data;
    setResponse(data);
  } catch {}
};

const getProductType = async (setResponse) => {
  try {
    const response = await axios.get(
      `${Baseurl}api/v1/admin/ProductType/allProductType`
    );
    const data = response.data.data;
    setResponse(data);
  } catch {}
};

const getAllBrands = async (setResponse) => {
  try {
    const response = await axios.get(`${Baseurl}api/v1/admin/Brand/allBrand`);
    const data = response.data.data;
    setResponse(data);
  } catch {}
};

const getSkinCondition = async (setResponse) => {
  try {
    const response = await axios.get(
      `${Baseurl}api/v1/admin/SkinCondition/allSkinCondition`
    );
    const data = response.data.data;
    setResponse(data);
  } catch {}
};

const getAllNutrition = async (setResponse) => {
  try {
    const response = await axios.get(
      `${Baseurl}api/v1/admin/Nutrition/allNutrition`
    );
    const data = response.data.data;
    setResponse(data);
  } catch {}
};

const getPrivacyPolicy = async (setResponse) => {
  try {
    const response = await axios.get(`${Baseurl}api/v1/static/getPrivacy`);
    const data = response.data.data;
    setResponse(data);
  } catch {}
};

const getTerms = async (setResponse) => {
  try {
    const response = await axios.get(`${Baseurl}api/v1/static/getTerms`);
    const data = response.data.data;
    setResponse(data);
  } catch {}
};

const getContactDetails = async (setResponse) => {
  try {
    const response = await axios.get(
      `${Baseurl}api/v1/ContactDetails/viewContactDetails`
    );
    const data = response.data.data;
    setResponse(data);
  } catch {}
};

const verifyOtp = async (payload, navigate, loading) => {
  loading(true);
  try {
    const response = await axios.post(
      `${Baseurl}api/v1/user/forgotVerifyotp`,
      payload
    );
    const userId = response.data.data.userId;
    localStorage.setItem("changeId", userId);
    navigate("/changePassword");
  } catch (e) {
    const msg = e.response.data.message || "Something went wrong";
    showMsg("", msg, "danger");
  } finally {
    loading(false);
  }
};

const getSingleProduct = async (
  setResponse,
  query,
  setImg,
  setSizes,
  setPrice,
  setSingleSize,
  setPriceId
) => {
  try {
    const response = await axios.get(
      `${Baseurl}api/v1/Product/ByName/${query}`
    );
    const data = response.data.data;
    const img = response.data.data?.productImages?.[0]?.image;
    setImg(img);
    setResponse(data);
    if (data.multipleSize === true) {
      setSizes(data.sizePrice);
      setPrice(data?.sizePrice?.[0]?.price);
      setSingleSize(data?.sizePrice?.[0]?.size);
      setPriceId(data?.sizePrice?.[0]?._id);
    } else {
      setPrice(data.price);
    }
  } catch {}
};

export const getSingleProductAuth = async (
  setResponse,
  query,
  setImg,
  setSizes,
  setPrice,
  setSingleSize,
  setPriceId,
  setIsWishlist,
  setInCart
) => {
  try {
    // const response = await axios.get(
    //   `${Baseurl}api/v1/Product/nameByToken/${query}`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("Token")}`,
    //     },
    //   }
    // );
    const response = await axios.get(
      `${Baseurl}api/v1/Product/byToken/${query}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );
    const data = response.data.data;
    const img = response.data.data?.productImages?.[0]?.image;
    setImg(img);
    setResponse(data);
    if (data.multipleSize === true) {
      setSizes(data.sizePrice);
      setPrice(data?.sizePrice?.[0]?.price);
      setSingleSize(data?.sizePrice?.[0]?.size);
      setPriceId(data?.sizePrice?.[0]?._id);
    } else {
      setPrice(data.price);
    }
    setIsWishlist(response?.data?.isWishList);
    setInCart(response?.data?.isCart);
  } catch {}
};

const getFrequently = async (setResponse, id) => {
  try {
    const response = await axios.get(
      `${Baseurl}api/v1/FrequentlyBuyProduct/byProduct/${id}`
    );
    const data = response.data.data;
    setResponse(data);
  } catch {}
};

const addFBP = (id, payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${Baseurl}api/v1/addToCartFrequentlyByProduct/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      if (response.status === 200) {
        dispatch(getCart());
      }
    } catch (e) {
      const msg = e.response.data.message;
      showMsg("", msg, "danger");
    }
  };
};

const getCart = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${Baseurl}api/v1/cart`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      });
      const data = response.data.cart;
      dispatch(getCartItems(data));
    } catch {}
  };
};

export const CartwithLoader = (setLoading) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${Baseurl}api/v1/cart`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      });
      const data = response.data.cart;
      dispatch(getCartItems(data));
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };
};

const updateDeliveyOpt = (setLoader) => {
  setLoader(true);
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${Baseurl}api/v1/updatePickupFromStore`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      if (response.status === 200) {
        dispatch(getCart());
        setLoader(false);
      }
    } catch {
      setLoader(false);
    }
  };
};

const getGiftCard = async (setResponse) => {
  try {
    const response = await axios.get(
      `${Baseurl}api/v1/admin/GiftCards/allgiftCard`
    );
    const data = response?.data?.data;
    setResponse(data);
  } catch {}
};

export const updateProductInCart = (productId, payload, setLoading) => {
  setLoading(true);
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${Baseurl}api/v1/updateProductToCart/${productId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      if (response.status === 200) {
        dispatch(CartwithLoader(setLoading));
      }
    } catch (e) {
      const msg = e.response.data.message;
      showMsg("", msg, "danger");
      setLoading(false);
    }
  };
};

const deleteFBP = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${Baseurl}api/cart/delete/frequentlyBuyProduct/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      dispatch(getCart());
    } catch (e) {
      const msg = e.response.data.message;
      showMsg("", msg, "danger");
    }
  };
};

const getQuiz = async (setResponse) => {
  try {
    const response = await axios.get(`${Baseurl}api/v1/AcneQuiz`);
    const data = response.data.data;
    setResponse(data);
  } catch {}
};

const ReviewQuiz = async (
  answer1,
  answer2,
  answer3,
  answer4,
  email,
  navigate
) => {
  try {
    const response = await axios.get(
      `${Baseurl}api/v1/AcneQuizSuggession/getAcneQuizSuggessionByAnswer?answer1=${answer1}&answer2=${answer2}&answer3=${answer3}&answer4=${answer4}&email=${email}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );
    let product;
    if (response?.data?.data?.productId) {
      const id = response?.data?.data?.productId?._id;
      navigate(`/product/${id}`);
    } else if (response?.data?.data?.frequentlyBuyProductId) {
      product = JSON.stringify(response?.data?.data?.frequentlyBuyProductId);
      localStorage.setItem("QuizBundeledProduct", product);
      localStorage.removeItem("QuizSingleProduct");
      navigate("/acnequiz/recomended");
    }
  } catch {}
};

const getIngredeints = async (type, setResponse) => {
  try {
    const response = await axios.get(
      `${Baseurl}api/v1/admin/Ingredient/allIngredientbyType/${type}`
    );
    const data = response.data.data;
    if (Array.isArray(data) && data?.length > 0) {
      setResponse(data);
    } else {
      setResponse([]);
    }
  } catch {}
};

const checkIngredients = async (name, setResponse) => {
  try {
    const response = await axios.get(
      `${Baseurl}api/v1/admin/Ingredient/checkIngredient/${name}`
    );
    const data = response.data.message;
    setResponse(data);
  } catch {}
};

const getProfile = async (setResponse) => {
  try {
    const response = await axios.get(`${Baseurl}api/v1/user/getProfile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    });
    const data = response.data.data;
    setResponse(data);
  } catch {}
};

const getAddress = async (setResponse) => {
  try {
    const response = await axios.get(`${Baseurl}api/v1/user/getAddress`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    });
    const data = response.data.data;
    setResponse(data);
  } catch {}
};

const addAdOnInCart = (payload, quantity) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${Baseurl}api/v1/add-to-cart/addOnservices/${payload}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch(getCart());
      }
    } catch (e) {
      const msg = e.response.data.message;
      showMsg("", msg, "danger");
    }
  };
};

const getOnService = async (setResponse) => {
  try {
    const response = await axios.get(
      `${Baseurl}api/v1/admin/AddOnServices/allAddOnServices`
    );
    const data = response?.data?.data;
    if (data) {
      setResponse(data);
    } else {
      setResponse([]);
    }
  } catch {}
};

const TimeandSlot = async (formData, navigate) => {
  try {
    const response = await axios.put(
      `${Baseurl}api/v1/cart/addDateAndtimetoServiceCart`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );
    navigate("/mycart");
  } catch (e) {
    const msg = e?.response?.data?.message;
    showMsg("", msg, "danger");
  }
};

const updateServiceQuan = (payload, formDetail) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${Baseurl}api/v1/add-to-cart/service/${payload}`,
        formDetail,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      if (response.status === 200) {
        dispatch(getCart());
      }
    } catch (e) {
      const msg = e.response.data.message;
      showMsg("", msg, "danger");
    }
  };
};

const updateAdOnQuantity = (payload, quantity) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${Baseurl}api/v1/add-to-cart/addOnservices/${payload}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      if (response.status === 200) {
        dispatch(getCart());
      }
    } catch (e) {
      const msg = e.response.data.message;
      showMsg("", msg, "danger");
    }
  };
};

const placeOrder = async (orderId) => {
  try {
    const response = await axios.post(
      `${Baseurl}api/v1/placeOrder/${orderId} `,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );
    const url = response.data?.session?.url;
    window.location.href = url;
  } catch (e) {
    const msg = e.response.data.message;
    showMsg("", msg, "danger");
  }
};

const orderSuccess = ({ id, navigate, setLoading, setGiftCardPresent }) => {
  return async (dispatch) => {
    setLoading(true);
    try {
      const response = await axios.get(`${Baseurl}api/v1/successOrder/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      });
      setLoading(false);
      const isProduct = response?.data?.data?.productOrder;
      console.log(isProduct);
      dispatch(getCart());
      if (isProduct) {
        setGiftCardPresent(false);
      } else {
        setGiftCardPresent(true);
      }
    } catch {
      setLoading(false);
      navigate("/thanks/failed");
    }
  };
};

const orderFailed = async (payload) => {
  try {
    const response = await axios.get(
      `${Baseurl}api/v1/cancelOrder/${payload}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );
  } catch {}
};

const removeAddress = async (payload) => {
  try {
    const response = await axios.delete(
      `${Baseurl}api/v1/user/address/${payload}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );
  } catch {}
};

const verifySubscription = async (id, setResponse) => {
  try {
    const response = await axios.post(
      `${Baseurl}api/v1/verifySubscription/${id}`,
      {
        Status: "Paid",
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );
    setResponse(true);
  } catch {}
};

const cancelSubscription = async (payload) => {
  try {
    const response = await axios.post(
      `${Baseurl}api/v1/cancelMemberShips`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );
  } catch {}
};

const getReviews = async (setResponse) => {
  try {
    const response = await axios.get(`${Baseurl}api/v1/clientReview`);
    const data = response?.data?.data;
    setResponse(data);
  } catch {}
};

const AddToCartInBulk = (productId, payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${Baseurl}api/v1/add-to-cart/product/${productId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
    } catch (e) {
      const msg = e.response.data.message;
      showMsg("", msg, "danger");
    }
  };
};

const AddServiceBulk = (payload, form) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${Baseurl}api/v1/add-to-cart/service/${payload}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
    } catch (e) {
      const msg = e.response.data.message;
      showMsg("", msg, "danger");
    }
  };
};

const getProductOrder = async (setResponse) => {
  try {
    const response = await axios.get(`${Baseurl}api/v1/productOrders`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    });
    const data = response?.data?.data?.reverse();
    setResponse(data);
  } catch {}
};

const getAllSlot = async (setResponse, date, setLoading) => {
  if (setLoading) {
    setLoading(true);
  }
  try {
    const res = await axios.get(
      `${Baseurl}api/v1/admin/Slot/allSlot?date=${date}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );
    const data = res?.data?.data;
    if (Array.isArray(data)) {
      setResponse(data);
    } else {
      setResponse([]);
    }
    if (setLoading) {
      setLoading(false);
    }
  } catch {
    setResponse([]);

    if (setLoading) {
      setLoading(false);
    }
  }
};

const getShippingPrivacy = async (setResponse) => {
  try {
    const res = await axios.get(`${Baseurl}api/v1/static/getShippingPrivacy`);
    const data = res.data.data?.[0]?.privacy;
    setResponse(data);
  } catch {}
};

const getReturnPolicy = async (setResponse) => {
  try {
    const res = await axios.get(`${Baseurl}api/v1/static/getReturnPrivacy`);
    const data = res.data.data?.[0]?.privacy;
    setResponse(data);
  } catch {}
};
const filterProduct = async (payload, setResponse) => {
  try {
    const res = await axios.get(
      `${Baseurl}api/v1/Product/all/paginateProductSearch?search=${payload}`
    );
    const data = res.data.data?.docs;
    setResponse(data);
  } catch {}
};

export const getSession = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`${Baseurl}api/v1/user/checkSession`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      });
      const isLoggedIn = res.data.data;
      if (isLoggedIn === false) {
        dispatch(LOGOUT());
      }
    } catch {
      dispatch(LOGOUT());
    }
  };
};

export const getWishlist = async (setResponse) => {
  try {
    const res = await axios.get(
      `${Baseurl}api/v1/user/myWishlist`,

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );
    const data = res?.data?.wishlist?.products;
    if (res.status === 200) {
      setResponse(data);
    }
  } catch {}
};

export const serviceCheckout = (setStatus) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${Baseurl}api/v1/checkoutService`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      if (response.status === 200) {
        dispatch(getCart());
      }
    } catch (e) {
      const msg = e.response.data.msg;
      setStatus(msg);
      showMsg("Error !", msg, "danger");
    }
  };
};

export const MembershipFaq = async (setResponse) => {
  try {
    const res = await axios.get(
      `${Baseurl}api/v1/static/faq/AllMembershipFaqs`
    );
    if ((res.status = 200)) {
      setResponse(res.data.data);
    }
  } catch {}
};

export const getServiceCount = async (setShow) => {
  try {
    const res = await axios.get(`${Baseurl}api/v1/getServiceOrdersCount`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    });
    if (res.status === 200) {
      const count = res.data.data;
      if (count === 0) {
        setShow(true);
      }
    }
  } catch {}
};

export const savedBookingCard = async () => {
  try {
    const res = await axios.post(
      `${Baseurl}api/v1/user/card/updateCardDetailSavedThroughToken`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );
  } catch {}
};

export const guestIntentMaker = async ({ email, clientSecret }) => {
  try {
    const res = await axios.post(
      `${Baseurl}api/v1/user/card/savecardBeforLogin/${email}`
    );
    if (res.status === 200) {
      const id = res?.data?.client_secret?.client_secret;
      console.log(id);
      clientSecret = id;
    } else {
      clientSecret = null;
    }
  } catch {}
};

export const getUserOrder = async (id, setResponse) => {
  try {
    const res = await axios.get(`${Baseurl}api/v1/user/getOrderDetails/${id}`);
    setResponse(res?.data);
  } catch {}
};

export const getAddressCart = async (setResponse) => {
  try {
    const response = await axios.get(
      `${Baseurl}api/v1/getAddressDataForCart`,

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );
    setResponse(response.data);
  } catch (e) {
    const msg = e.response.data.message;
    showMsg("", msg, "danger");
  }
};

// Service Checkout
export const checkoutService = async ({
  setShowComplete,
  setShow,
  setSubmitLoading,
  navigate,
  additionalFunctions = [],
}) => {
  setShowComplete(false);
  setShow(false);
  setSubmitLoading(true);
  try {
    const response = await axios.post(
      `${process.env.React_App_Baseurl}api/v1/checkoutService`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );
    const orderId = response?.data?.data?.orderId;
    if (orderId) {
      additionalFunctions.forEach((func) => {
        if (typeof func === "function") {
          func(orderId);
        }
      });
    }
  } catch (e) {
    const msg = e?.response?.data?.message;
    showMsg("Error !", msg, "danger");
    if (
      msg === "This Slot already booked. " ||
      msg ===
        "Your service time is greater than 05:00 pm, so move to next date."
    ) {
      navigate("/schedule2");
    }
  } finally {
    console.log("checkout handler complete");
    setSubmitLoading(false);
  }
};

export const saveCardDetails = async ({
  additionalFunctions = [],
  orderId,
  payload,
}) => {
  try {
    const res = await axios.post(
      `${process.env.React_App_Baseurl}api/v1/user/card/updateCardDetailSaved/${orderId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (res) {
      additionalFunctions.forEach((func) => {
        if (typeof func === "function") {
          func(orderId);
        }
      });
    }
  } catch (e) {
    const msg = e?.response?.data?.message || "Something went wrong";
    showMsg("Error !", msg, "danger");
  }
};

// Api Modules
export const createApi = async ({
  url,
  payload,
  successMsg,
  setLoading,
  additionalFunctions = [],
}) => {
  if (setLoading) {
    setLoading(true);
  }
  try {
    const res = await axios.post(
      `${process.env.React_App_Baseurl}${url}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );
    if (res) {
      if (successMsg) {
        showMsg("", successMsg, "success");
      }
      additionalFunctions.forEach((func) => {
        if (typeof func === "function") {
          func(res?.data);
        }
      });
    }
  } catch (e) {
    const msg =
      e?.response?.data?.message ||
      e?.response?.data?.msg ||
      "Something went wrong";
    showMsg("Error !", msg, "danger");
  } finally {
    if (setLoading) {
      setLoading(false);
    }
  }
};

export const updateApi = async ({
  url,
  payload,
  successMsg,
  setLoading,
  additionalFunctions = [],
}) => {
  if (setLoading) {
    setLoading(true);
  }
  try {
    const res = await axios.put(
      `${process.env.React_App_Baseurl}${url}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );
    if (res) {
      if (successMsg) {
        showMsg("", successMsg, "success");
      }
      additionalFunctions.forEach((func) => {
        if (typeof func === "function") {
          func(res.data);
        }
      });
    }
  } catch (e) {
    if (e?.code === "ERR_NETWORK") {
      showMsg("", "Image size exceeds 1 MB limit", "danger");
    } else {
      const msg = e?.response?.data?.message || "Something went wrong";
      showMsg("Error !", msg, "danger");
    }
  } finally {
    if (setLoading) {
      setLoading(false);
    }
  }
};

export const getApi = async ({
  url,
  setLoading,
  additionalFunctions = [],
  setResponse,
}) => {
  if (setLoading) {
    setLoading(true);
  }
  try {
    const res = await axios.get(`${process.env.React_App_Baseurl}${url}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    });
    if (res) {
      setResponse(res?.data);
      additionalFunctions.forEach((func) => {
        if (typeof func === "function") {
          func();
        }
      });
    }
  } catch (e) {
    console.log(url, e);
    setResponse({});
  } finally {
    if (setLoading) {
      setLoading(false);
    }
  }
};

export const createApi_withRes = async ({
  url,
  payload,
  successMsg,
  setLoading,
  additionalFunctions = [],
}) => {
  if (setLoading) {
    setLoading(true);
  }
  try {
    const res = await axios.post(
      `${process.env.React_App_Baseurl}${url}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );
    if (res) {
      const data = res?.data;
      if (successMsg) {
        showMsg("", successMsg, "success");
      }
      additionalFunctions.forEach((func) => {
        if (typeof func === "function") {
          func(res);
        }
      });
    }
  } catch (e) {
    const msg = e?.response?.data?.message || "Something went wrong";
    showMsg("Error !", msg, "danger");
  } finally {
    if (setLoading) {
      setLoading(false);
    }
  }
};

// API REDUX MODULES
export const edit_module_redux = ({
  url,
  payload,
  setLoading,
  additionalFunctions = [],
  errorMsg,
  dispatchFunc = [],
}) => {
  return async (dispatch) => {
    if (setLoading) {
      setLoading(true);
    }
    try {
      const res = await axios.put(
        `${process.env.React_App_Baseurl}${url}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      if (res) {
        dispatchFunc.forEach((func) => {
          if (typeof func === "function") {
            dispatch(func());
          }
        });
        additionalFunctions.forEach((func) => {
          if (typeof func === "function") {
            func();
          }
        });
      }
    } catch (e) {
      const msg = e?.response?.data?.message || "Something went worng !";
      if (errorMsg && e?.response?.data?.message === undefined) {
        showMsg("", errorMsg, "danger");
      } else {
        showMsg("", msg, "danger");
      }
    } finally {
      if (setLoading) {
        setLoading(false);
      }
    }
  };
};

export const post_module_redux = ({
  url,
  payload,
  setLoading,
  additionalFunctions = [],
  dispatchFunc = [],
}) => {
  return async (dispatch) => {
    if (setLoading) {
      setLoading(true);
    }
    try {
      const res = await axios.post(
        `${process.env.React_App_Baseurl}${url}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      if (res) {
        dispatchFunc.forEach((func) => {
          if (typeof func === "function") {
            dispatch(func());
          }
        });
        additionalFunctions.forEach((func) => {
          if (typeof func === "function") {
            func();
          }
        });
      }
    } catch (e) {
      const msg = e?.response?.data?.message || "Something went wrong !";
      showMsg("", msg, "danger");
    } finally {
      if (setLoading) {
        setLoading(false);
      }
    }
  };
};

export const create_module_redux = ({
  url,
  payload,
  setLoading,
  additionalFunctions = [],
  dispatchFunc = [],
}) => {
  return async (dispatch) => {
    if (setLoading) {
      setLoading(true);
    }
    try {
      const res = await axios.post(`${Baseurl}${url}`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      });
      const Token = res?.data?.accessToken;
      localStorage.setItem("Token", Token);
      const myToken = localStorage.getItem('Token')
      if (res && myToken) {
        dispatchFunc.forEach((func) => {
          if (typeof func === "function") {
            dispatch(func(res));
          }
        });
        additionalFunctions.forEach((func) => {
          if (typeof func === "function") {
            func(res);
          }
        });
      }
    } catch (e) {
      const msg = e?.response?.data?.message || "Something went wrong !";
      showMsg("", msg, "danger");
    } finally {
      if (setLoading) {
        setLoading(false);
      }
    }
  };
};

// API REDUX MODULES REQUEST

const handleError = (error, customErrorMsg) => {
  const msg =
    error?.response?.data?.message ||
    customErrorMsg ||
    "Something went wrong !";
  if (customErrorMsg && !error?.response?.data?.message) {
    showMsg("", customErrorMsg, "danger");
  } else {
    showMsg("", msg, "danger");
  }
};

const apiRequest_with_redux = (method, url, payload = null, options = {}) => {
  const {
    setResponse,
    setLoading,
    additionalFunctions = [],
    successMsg,
    errorMsg,
    dispatchFunc = [],
  } = options;
  return async (dispatch) => {
    if (setLoading) setLoading(true);
    try {
      let response;
      if (method === "get" || method === "delete") {
        response = await axios[method](`${Baseurl}${url}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        });
      } else {
        response = await axios[method](`${Baseurl}${url}`, payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        });
      }
      if (setResponse) setResponse(response.data);
      if (successMsg) showMsg("", successMsg, "success");
      dispatchFunc.forEach(
        (func) =>
          func && typeof func === "function" && dispatch(func(response?.data))
      );
      additionalFunctions.forEach(
        (func) => func && typeof func === "function" && func(response?.data)
      );
    } catch (e) {
      handleError(e, errorMsg);
    } finally {
      if (setLoading) setLoading(false);
    }
  };
};

export const putApiWithRedux = (url, payload, options) =>
  apiRequest_with_redux("put", url, payload, options);

export {
  filterProduct,
  getReturnPolicy,
  getShippingPrivacy,
  getAllSlot,
  getProductOrder,
  getLimitedOffer,
  getOfferService,
  getSkinType,
  getProductType,
  getAllBrands,
  getSkinCondition,
  getAllNutrition,
  getPrivacyPolicy,
  getTerms,
  getContactDetails,
  verifyOtp,
  getSingleProduct,
  getFrequently,
  addFBP,
  getCart,
  updateDeliveyOpt,
  getGiftCard,
  deleteFBP,
  getQuiz,
  ReviewQuiz,
  getIngredeints,
  checkIngredients,
  getProfile,
  getAddress,
  addAdOnInCart,
  getOnService,
  TimeandSlot,
  updateServiceQuan,
  updateAdOnQuantity,
  placeOrder,
  orderSuccess,
  orderFailed,
  removeAddress,
  verifySubscription,
  cancelSubscription,
  getReviews,
  AddToCartInBulk,
  AddServiceBulk,
};
