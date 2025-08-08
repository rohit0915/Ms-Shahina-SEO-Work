/** @format */

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { verifySubscription } from "../Repository/Api";
import Loader from "./Loader/Loader";
import DynamicHelmet from "./Helmet/DynamicHelmet";

const VerifySubScription = () => {
  const { id } = useParams();
  const [response, setResponse] = useState(false);

  useEffect(() => {
    verifySubscription(id, setResponse);
  }, [id]);

  return (
    <>
      <DynamicHelmet />
      {response === false ? (
        <div className="Thanks_Container">
          <Loader />
          <p className="desc" style={{ textTransform: "none" }}>
            Please do not reload this page while processing payment
          </p>
          <p className="desc mt-5" style={{ textTransform: "none" }}>
            Our system is diligently checking the details to confirm your
            subscription. <br /> This process may take a few seconds, but rest
            assured, we appreciate your patience.
          </p>
        </div>
      ) : (
        <div className="Thanks_Container">
          <p className="title">Congratulations🎉</p>
          <p className="desc" style={{ textTransform: "none" }}>
            Thank you for becoming a member. <br /> We are looking forward to
            provide you the best experience!
          </p>
          <Link
            to="/"
            style={{ cursor: "pointer", marginTop: "20px" }}
            
          >
            <button>RETURN TO HOMEPAGE</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default VerifySubScription;
