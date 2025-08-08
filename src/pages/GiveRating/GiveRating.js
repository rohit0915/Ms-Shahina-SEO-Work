/** @format */

import React, { useEffect, useState } from "react";
import { Rate } from "antd";
import { createApi, getApi } from "../../Repository/Api";
import ClipLoader from "react-spinners/ClipLoader";
import { DefaultModal } from "../../components/Drawer/Modal";
import DynamicHelmet from "../../components/Helmet/DynamicHelmet";
import endPoints from "../../Repository/apiConfig";
import { ImageLazyLoading } from "../../utils/helpingComponent";
import { useNavigate } from "react-router-dom";

const GiveRating = () => {
  const [rating, setRating] = useState(1);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [metaResponse, setMetaResponse] = useState(null);
  const navigate = useNavigate();

  const fetchMetaTags = () => {
    getApi({
      url: endPoints.metaTags.giveRatingPage,
      setResponse: setMetaResponse,
    });
  };

  useEffect(() => {
    fetchMetaTags();
  }, []);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const payload = {
    rating,
    description,
  };

  const submitHandler = (e) => {
    e.preventDefault();
    createApi({
      url: "api/v1/clientReview/createReviewByClient",
      payload,
      additionalFunctions: [() => setModalOpen(true)],
      setLoading,
    });
  };

  return (
    <>
      {metaResponse && (
        <DynamicHelmet
          title={metaResponse?.data?.title}
          description={metaResponse?.data?.description}
        />
      )}
      <section className="feedback-container MaxComponent">
        <div className="Backward_Heading step_Heading">
          <div>
            <ImageLazyLoading
              img={"/Image/1.png"}
              onClick={() => navigate(-1)}
              alt={"Go Back"}
            />
          </div>
          <h5 className="heading">We’d love to hear your thoughts!</h5>
        </div>

        <form className="feedback-form" onSubmit={submitHandler}>
          <div className="feedback-rating">
            <p className="label">Rate your experience</p>
            <Rate onChange={handleRatingChange} value={rating} />
          </div>

          <div className="feedback-description">
            <p className="label">Share your feedback</p>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="We would love to hear what delighted you or what we can improve!"
              required
            />
          </div>

          <button
            type="submit"
            className="feedback-button"
            disabled={!rating || !description}
          >
            {loading ? <ClipLoader color="#000" /> : "Submit"}
          </button>
        </form>
      </section>

      <DefaultModal
        open={modalOpen}
        setOpen={setModalOpen}
        className={"Checkout_Modal"}
      >
        <div className="close_icon_btn">
          <img
            src="/Image/x.svg"
            onClick={() => setModalOpen(false)}
            alt=""
            loading="lazy"
          />
        </div>
        <p className="title">Thank You!</p>
        <p className="description">
          {" "}
          We appreciate you taking the time to share your feedback with us.{" "}
        </p>

        {rating === 5 && (
          <div className="google-share-section">
            <p className="description">
              Would you like to share your experience with others on Google?
            </p>
            <div className="btn-container">
              <a
                href="https://www.google.com/search?sca_esv=159f37a1251190f9&rlz=1C1CHBF_enIN989IN989&q=Shahina+Hoja+Aesthetics&si=ACC90nxp5PteNmYcqmoXxlml2xQ2QM8noJmQUYMLhp4J5SbXM2yEBifQxGYxV7474G5asPj7971_1If6CL4F4Gj8BI7OZDVX8RhKvGiyuvlx4WTdO08Af--wPcQ3-nPSk9QUWXulIyfavmndvq7xCjNY75I3x6OhWOIIwqohyTGc0dcV8tWINj2iMGVilr-b_J1lFwu4U-BJ3grmeVq8FQxO9z9wIZaNG9MFmqeyed7tFsvsF-Mfm31YHeriOC8jtutcaDVOqjRtxFW5fCJHFLyLKJCCn5Nkw4wg5HbsywWOP_u17OAHIC_F7AJdkcD4xQRbJPsnnKTr&sa=X&ved=2ahUKEwj-y4DEq_6IAxXi4TgGHeJFAPoQ6RN6BAgWEAE&biw=1920&bih=953&dpr=1"
                target="_blank"
                rel="noreferrer"
              >
                <button className="share">Leave a review on google</button>
              </a>
              <button className="close">Close</button>
            </div>
          </div>
        )}
      </DefaultModal>
    </>
  );
};

export default GiveRating;
