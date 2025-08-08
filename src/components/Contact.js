/** @format */

import React, { useEffect, useState } from "react";
import { MAP_IMG } from "../constants/constant";
import { createApi, getApi, getContactDetails } from "../Repository/Api";
import { BsTelephoneFill } from "react-icons/bs";
import { HiMail } from "react-icons/hi";
import { ImLocation } from "react-icons/im";
import { AiFillStar } from "react-icons/ai";
import { Call, Mail } from "./Helping/Mail";
import MessageModal from "./Drawer/MessageModal";
import ClipLoader from "react-spinners/ClipLoader";
import { ImageLazyLoading } from "../utils/helpingComponent";
import DynamicHelmet from "./Helmet/DynamicHelmet";
import endPoints from "../Repository/apiConfig";
import { useNavigate } from "react-router-dom";

const msg =
  "Thank you for reaching out to us. Rest assured, one of our team members will be in touch with you shortly. We appreciate your patience and look forward to assisting you.";

const Contact = () => {
  const [response, setResponse] = useState({});
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [metaResponse, setMetaResponse] = useState(null);
  const navigate = useNavigate();

  const fetchMetaTags = () => {
    getApi({
      url: endPoints.metaTags.contactPage,
      setResponse: setMetaResponse,
    });
  };

  useEffect(() => {
    fetchMetaTags();
  }, []);

  const payload = {
    query,
    name,
    email,
    mobile,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const additionalFunctions = [() => setOpen(true), () => setQuery("")];
    await createApi({
      url: "api/v1/help/addQuery",
      payload,
      setLoading: setSubmitLoading,
      additionalFunctions,
    });
  };

  const starArray = Array.from({ length: response?.ratings });

  function fetchHandler() {
    getContactDetails(setResponse);
  }

  useEffect(() => {
    fetchHandler();
  }, []);

  return (
    <>
      {metaResponse && (
        <DynamicHelmet
          title={metaResponse?.data?.title}
          description={metaResponse?.data?.description}
        />
      )}
      <MessageModal open={open} setOpen={setOpen} msg={msg} />

      <section className="contact-us">
        <div className="Backward_Heading step_Heading">
          <div>
            <ImageLazyLoading
              img={"/Image/1.png"}
              onClick={() => navigate(-1)}
              alt={"Go Back"}
            />
          </div>

          <h1 className="text-5xl text-center font-light text-primary title">
            Contact
          </h1>
        </div>

        <div className="container">
          {response && (
            <section>
              <div className="flex gap-5 items-start mt-3 Detail_Section ">
                <div className="w-52 h-52 Img-C ">
                  <ImageLazyLoading
                    img={response?.image}
                    alt={response?.name}
                    className="object-fill Img-C text-[10px]"
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <span className="text-lg font-semibold">
                    {response?.name}
                  </span>

                  <div className="flex gap-2 items-center">
                    {" "}
                    {starArray.map((_, index) => (
                      <div className="Rat" key={`star ${index}`}>
                        <AiFillStar
                          className="fill_star"
                          style={{ color: "#ff9529", fontSize: "20px" }}
                        />
                      </div>
                    ))}
                    <span>({response?.numOfReviews})</span>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div
                      className="flex items-center gap-4 cursor-pointer"
                      onClick={() => Call(response?.phone)}
                    >
                      <span className="text-2xl">
                        {" "}
                        <BsTelephoneFill />{" "}
                      </span>
                      <span>{response?.phone} </span>
                    </div>
                    <div
                      className="flex items-center gap-4 cursor-pointer "
                      onClick={() => Mail(response?.email)}
                    >
                      <span className="text-2xl">
                        {" "}
                        <HiMail />{" "}
                      </span>
                      <span>{response?.email} </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">
                        {" "}
                        <ImLocation />{" "}
                      </span>
                      <span>{response?.address} </span>
                    </div>
                  </div>
                  <a href={response?.google} target="_blank" rel="noreferrer">
                    <button
                      className="flex items-center gap-3 font-semibold text-green justify-center border-2 py-2  border-green"
                      style={{ padding: "10px" }}
                    >
                      <ImageLazyLoading
                        img={MAP_IMG}
                        alt={"location"}
                        className="w-5 h-5 text-[10px]"
                      />
                      LOCATE ON GOOGLE MAPS
                    </button>
                  </a>
                </div>
              </div>
            </section>
          )}

          <section className="flex flex-col justify-between gap-7 w-1/3 query_Section">
            <h1 className="text-2xl font-semibold text-primary ">
              How Can We Best Serve You?
            </h1>

            <form onSubmit={submitHandler} className="query_Container">
              <input
                type="text"
                placeholder="Enter Your Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Enter Your Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="tel"
                minLength={8}
                maxLength={12}
                placeholder="Enter Mobile Number"
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <textarea
                className="border border-black w-full py-5 px-5"
                placeholder="Write Your message..."
                name=""
                id=""
                cols="30"
                rows="5"
                required
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                type="submit"
                className="bg-primary w-[300px] text-secondary py-2 font-semibold"
              >
                {submitLoading ? <ClipLoader color="#fff" /> : "SUBMIT"}
              </button>
            </form>
          </section>
        </div>
      </section>
    </>
  );
};

export default Contact;
