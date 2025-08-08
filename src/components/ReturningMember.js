/** @format */

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AddServiceBulk,
  AddToCartInBulk,
  create_module_redux,
  getApi,
} from "../Repository/Api";
import { useDispatch, useSelector } from "react-redux";
import { FaEye } from "react-icons/fa6";
import { PiEyeClosedBold } from "react-icons/pi";
import PhoneInput from "react-phone-input-2";
import { isAuthenticated, Login } from "../store/authSlice";
import FullScreenLoader from "./Loader/FullScreenLoader";
import { DummyCartItems, removeFromCart } from "../store/DummyCart";
import { removeServiceDummy, ServiceItems } from "../store/DummySerivce";
import DynamicHelmet from "./Helmet/DynamicHelmet";
import { ImageLazyLoading } from "../utils/helpingComponent";
import endPoints from "../Repository/apiConfig";

const ReturningMember = () => {
  const [isPushingItems, setIsPushingItems] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const isLoggedIn = useSelector(isAuthenticated);
  const dummyCart = useSelector(DummyCartItems);
  const serviceCart = useSelector(ServiceItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const payload = { phone, password };
  const [metaResponse, setMetaResponse] = useState(null);

  const fetchMetaTags = () => {
    getApi({
      url: endPoints.metaTags.returningMemberPage,
      setResponse: setMetaResponse,
    });
  };

  useEffect(() => {
    fetchMetaTags();
  }, []);

  const pushItemInApi = async () => {
    if (isPushingItems) return;
    setIsPushingItems(true);
    for (const item of dummyCart) {
      const ProductId = item?.product?._id;
      const quantity = item?.quantity;
      const sizePrice = item?.sizePrice;
      let payload;
      if (item.size) {
        const size = item?.size;
        const priceId = item?.priceId;
        payload = { size, priceId, quantity, sizePrice };
      } else {
        payload = { quantity, sizePrice };
      }
      await dispatch(AddToCartInBulk(ProductId, payload));
      let removePayload;
      if (item.size) {
        removePayload = item.priceId;
      } else {
        removePayload = item.product?._id;
      }
      dispatch(removeFromCart(removePayload));
    }
    setIsPushingItems(false);
  };

  const pushDummyService = async () => {
    const processedProductIds = new Set();
    for (const item of serviceCart) {
      const ProductId = item.id;
      if (processedProductIds.has(ProductId)) {
        continue;
      }
      processedProductIds.add(ProductId);
      let payload;
      if (item?.payload?.memberprice) {
        payload = {
          quantity: item?.payload?.quantity,
          priceId: item?.payload?.priceId,
          size: item?.payload?.size,
          sizePrice: item?.payload?.sizePrice,
          memberprice: item?.payload?.memberprice,
        };
      } else {
        payload = {
          quantity: item?.payload?.quantity,
        };
      }
      await dispatch(AddServiceBulk(ProductId, payload));
      dispatch(removeServiceDummy(ProductId));
    }
  };

  const tokenSaver = (res) => {
    const Token = res?.data?.accessToken;
    localStorage.setItem("Token", Token);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(
      create_module_redux({
        url: "api/v1/user/signin",
        payload,
        setLoading,
        additionalFunctions: [
          (res) => tokenSaver(res),
          () => pushItemInApi(),
          () => pushDummyService(),
          () => navigate("/schedule1"),
        ],
        dispatchFunc: [(res) => Login(res?.data?.data)],
      })
    );
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/schedule1");
    }
  }, [isLoggedIn]);

  function BackNavigation() {
    navigate(-1);
  }
  return (
    <section>
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
            alt={"Go Back"}
            onClick={() => BackNavigation()}
            className={"text-[10px]"}
          />
        </div>
        <p className="title">Login</p>
      </div>

      <div className="forget-password">
        <form onSubmit={submitHandler}>
          <div className="mt-4">
            <p>Phone No.</p>
          </div>
          <div
            className="Indivisual-Appointment"
            style={{ maxWidth: "100%", margin: "0", padding: 0 }}
          >
            <PhoneInput country={"us"} onChange={setPhone} />
          </div>
          <div className="mt-4">
            <p>Password</p>
            <div className="input-div">
              <input
                type={show ? "text" : "password"}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              {show ? (
                <FaEye onClick={() => setShow(false)} />
              ) : (
                <PiEyeClosedBold onClick={() => setShow(true)} />
              )}
            </div>
          </div>
          <button className="verify" type="submit">
            SIGN IN
          </button>

          <div className="password-for">
            <span>Forgot Password?</span>
            <Link to="/forget-password">
              CLICK HERE
            </Link>
          </div>

          <hr className=" bg-secondary my-3" />

          <div className="password-for">
            <span> Don’t Have an Account? </span>
            <Link to="/signup">
              {" "}
              SIGN UP NOW
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ReturningMember;
