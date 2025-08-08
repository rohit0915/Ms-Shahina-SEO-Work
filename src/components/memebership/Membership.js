/** @format */

import React, { useEffect, useState } from "react";
import { ViewDescription } from "../../Helper/Herlper";
import { getApi, getProfile, MembershipFaq } from "../../Repository/Api";
import FAQ from "../Helper/FAQ";
import MembershipCard from "./MembershipCard";
import FullScreenLoader from "../Loader/FullScreenLoader";
import DynamicHelmet from "../Helmet/DynamicHelmet";
import endPoints from "../../Repository/apiConfig";
import { ImageLazyLoading } from "../../utils/helpingComponent";
import { useNavigate } from "react-router-dom";

const Membership = () => {
  const [response, setResponse] = useState([]);
  const [profile, setProfile] = useState({});
  const [faq, setFaq] = useState([]);
  const [loading, setLoading] = useState(false);
  const [metaResponse, setMetaResponse] = useState(null);
  const navigate = useNavigate();

  const fetchMetaTags = () => {
    getApi({
      url: endPoints.metaTags.membershipPage,
      setResponse: setMetaResponse,
    });
  };

  const fetchSubscription = () => {
    getApi({
      url: "api/v1/getSubscription",
      setLoading,
      setResponse,
    });
  };

  const fetchProfile = () => {
    getProfile(setProfile);
  };

  useEffect(() => {
    fetchSubscription();
    fetchProfile();
    MembershipFaq(setFaq);
    fetchMetaTags();
  }, []);

  function ShipHandler(query) {
    const TotolData = response?.data?.filter((i) =>
      i?.plan?.toLowerCase().includes(query?.toLowerCase())
    );
    return TotolData;
  }

  const stylePara = {
    textAlign: "center",
    fontSize: "20px",
    color: "rgb(229 216 150)",
    padding: "20px",
  };

  const getItems = faq?.map((i, index) => ({
    key: index,
    label: <ViewDescription description={i.question} />,
    children: <ViewDescription description={i.answer} />,
  }));

  // Membership Data
  const data = [
    {
      image: "/Image/72.png",
      price: ShipHandler(`silver`)?.[0]?.price,
      type: ShipHandler(`silver`)?.[0]?.plan,
      require: ShipHandler(`silver`)?.[0]?.month,
      bg: "silver",
      list: ShipHandler(`silver`)?.[0]?.details,
      id: ShipHandler(`silver`)?.[0]?._id,
      term: ShipHandler(`silver`)?.[0]?.term,
    },
    {
      image: "/Image/73.png",
      price: ShipHandler(`gold`)?.[0]?.price,
      type: ShipHandler(`gold`)?.[0]?.plan,
      require: ShipHandler(`gold`)?.[0]?.month,
      bg: "gold",
      list: ShipHandler(`gold`)?.[0]?.details,
      id: ShipHandler(`gold`)?.[0]?._id,
      term: ShipHandler(`gold`)?.[0]?.term,
    },
    {
      image: "/Image/74.png",
      price: ShipHandler(`platinum`)?.[0]?.price,
      type: ShipHandler(`platinum`)?.[0]?.plan,
      require: ShipHandler(`platinum`)?.[0]?.month,
      bg: "platinum",
      list: ShipHandler(`platinum`)?.[0]?.details,
      id: ShipHandler(`platinum`)?.[0]?._id,
      term: ShipHandler(`platinum`)?.[0]?.term,
    },
    {
      image: "/Image/75.png",
      price: ShipHandler(`diamond`)?.[0]?.price,
      type: ShipHandler(`diamond`)?.[0]?.plan,
      require: ShipHandler(`diamond`)?.[0]?.month,
      bg: "diamond",
      list: ShipHandler(`diamond`)?.[0]?.details,
      id: ShipHandler(`diamond`)?.[0]?._id,
      term: ShipHandler(`diamond`)?.[0]?.term,
    },
  ];

  return (
    <>
      {metaResponse && (
        <DynamicHelmet
          title={metaResponse?.data?.title}
          description={metaResponse?.data?.description}
        />
      )}
      {loading && <FullScreenLoader />}
      <section className="bg-primary MemberShip">
        <div className="Backward_Heading step_Heading">
          <div>
            <ImageLazyLoading
              img={"/Image/1.png"}
              alt={"Go Back"}
              onClick={() => navigate(-1)}
              className={"text-[10px]"}
            />
          </div>
        </div>

        <h1 className="text-5xl font-light text-secondary text-center py-14 box-border heading_bold">
          Membership
        </h1>
        <h6 style={stylePara} className="memn_in_mobile">
          Our membership programs are designed to give you a variety of fabulous
          monthly treatments at a very affordable price. Like any fitness or
          diet plan, consistency is the key to success. These memberships help
          you achieve more beautiful skin by promoting frequent and effective
          skin rejuvenation treatments plus a host of other beauty benefits.
        </h6>
        <div className="Membersip_new_contaimer">
          {data?.map((i, index) => (
            <MembershipCard
              medal={i?.image}
              price={i?.price}
              type={i?.type}
              require={`${i?.require} MONTH COMMITMENT REQUIRED`}
              bg={i?.bg}
              list={i?.list}
              id={i?.id}
              term={i?.term}
              profile={profile}
              key={`Membership${index}`}
            />
          ))}
        </div>
        <h1 className="text-5xl font-light text-secondary text-center py-14 box-border">
          Membership FAQs
        </h1>
        <FAQ response={getItems} />
      </section>
    </>
  );
};

export default Membership;
