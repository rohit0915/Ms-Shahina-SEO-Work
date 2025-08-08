/** @format */

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ViewDescription } from "../../Helper/Herlper";
import { createApi_withRes, showMsg } from "../../Repository/Api";
import { isAuthenticated } from "../../store/authSlice";
import FullScreenLoader from "../Loader/FullScreenLoader";
import { ImageLazyLoading } from "../../utils/helpingComponent";

const MembershipCard = ({
  medal,
  price,
  type,
  list,
  bg,
  require,
  id,
  term,
  profile,
}) => {
  const isLoggedIn = useSelector(isAuthenticated);
  const navigate = useNavigate("");
  const [loading, setLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    const openUrl = (url) => {
      window.location.href = url;
    };

    const additionalFunctions = [(res) => openUrl(res?.data?.session?.url)];
    createApi_withRes({
      url: `api/v1/takeSubscriptionFromWebsiteAlsoOnStripe/${id}`,
      setLoading,
      additionalFunctions,
    });
  };

  function handleLogin() {
    showMsg("", " Please login to continue", "info");
    navigate("/login");
  }

  const ActivePlan = profile?.subscriptionId?.plan?.toLowerCase();
  const planName = type?.toLowerCase();

  let btnTitle;
  switch (ActivePlan) {
    case "silver":
      btnTitle = "UPGRADE NOW";
      break;
    case "gold":
      if (planName === "silver") {
        btnTitle = "UPDATE NOW";
      } else {
        btnTitle = "UPGRADE NOW";
      }
      break;
    case "platinum":
      if (planName === "silver" || planName === "gold") {
        btnTitle = "UPDATE NOW";
      } else {
        btnTitle = "UPGRADE NOW";
      }
      break;
    case "diamond":
      btnTitle = "UPDATE NOW";
      break;
    default:
      btnTitle = "UPGRADE NOW";
      break;
  }

  const MembershipBtn = () => {
    if (isLoggedIn) {
      if (profile && profile?.isSubscription === true) {
        if (profile?.subscriptionId?.plan === type) {
          return;
        } else {
          return (
            <button
              className="py-2 mx-auto w-11/12 rounded-md shadow-sm text-primary text-lg bg-secondary font-bold"
              type="submit"
              style={{ display: "block", margin: " auto", marginTop: "20px" }}
            >
              {btnTitle}
            </button>
          );
        }
      } else {
        return (
          <button
            className="py-2 mx-auto w-11/12 rounded-md shadow-sm text-primary text-lg bg-secondary font-bold"
            type="submit"
            style={{ display: "block", margin: " auto", marginTop: "20px" }}
          >
            BECOME A MEMBER
          </button>
        );
      }
    } else {
      return (
        <button
          className="py-2 mx-auto w-11/12 rounded-md shadow-sm text-primary text-lg bg-secondary font-bold"
          type="button"
          onClick={handleLogin}
          style={{ display: "block", margin: " auto", marginTop: "20px" }}
        >
          BECOME A MEMBER
        </button>
      );
    }
  };

  return (
    <>
      {loading && <FullScreenLoader />}
      <section
        className={`${bg} flex flex-col    box-border py-4 rounded-md space-y-8 justify-center card membership_card`}
        style={{ border: "2px solid rgb(229, 216, 150)" }}
      >
        <div className="flex gap-3 px-4 membership_card_header">
          <ImageLazyLoading
            img={medal}
            className="w-10 h-10 image_subs text-[10px]"
            alt={type}
          />

          <div>
            <h1 className="text-2xl text-secondary flex items-center gap-2 font-bold">
              <span>
                <span className="Price">{price}</span>
                <span className="mon" style={{ fontSize: "10px" }}>
                  {" "}
                  /month
                </span>
              </span>
              <span className="text-white font-semibold plan_mobile ">
                {type}{" "}
              </span>
            </h1>

            <p className="text-secondary text-sm font-bold">{require}</p>
          </div>
        </div>
        <form onSubmit={submitHandler}>
          <div className="text-sm text-white px-8">
            <ViewDescription description={list} />

            <ul className="membership_check_box">
              {term && (
                <li>
                  <a
                    href={term}
                    className="terms"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Membership Terms
                  </a>
                </li>
              )}
              {profile?.subscriptionId?.plan === type ? (
                ""
              ) : (
                <li>
                  <input type="checkbox" required />
                  <span>I agree to membership terms and conditions</span>
                </li>
              )}
            </ul>
          </div>

          {MembershipBtn()}
        </form>
      </section>
    </>
  );
};

export default MembershipCard;
