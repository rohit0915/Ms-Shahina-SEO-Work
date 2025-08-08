/** @format */

import React, { useEffect, useState } from "react";
import { getContactDetails } from "../../Repository/Api";
import { AiFillStar, AiFillInstagram } from "react-icons/ai";
import { Call, Mail } from "../Helping/Mail";
import { BsFillTelephoneFill } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import { BiCurrentLocation } from "react-icons/bi";
import { ImageLazyLoading } from "../../utils/helpingComponent";

const ContactComponent = () => {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    getContactDetails(setContact);
  }, []);

  const starArray = Array.from({ length: contact?.ratings });
  return (
    contact && (
      <>
        <div className="two-sec">
          <ImageLazyLoading img={contact?.image} alt={""} />
          <div>
            <p className="title"> {contact?.name} </p>
            <span className="Stars">
              {starArray.map((_, index) => (
                <div className="Rat" key={`star ${index}`}>
                  <AiFillStar
                    className="fill_star"
                    style={{ color: "#ff9529", fontSize: "20px" }}
                  />
                </div>
              ))}
              <span> ({contact?.numOfReviews}) </span>
            </span>
            <div
              className="contact-info cursor-pointer"
              onClick={() => Call(contact?.phone)}
            >
              <BsFillTelephoneFill />
              <p> {contact?.phone} </p>
            </div>
            <div
              className="contact-info cursor-pointer"
              onClick={() => Mail(contact?.email)}
            >
              <GrMail />
              <p> {contact?.email} </p>
            </div>
            <div className="contact-info">
              <a href={contact?.instagram}>
                <AiFillInstagram />
              </a>

              <a href={contact?.instagram}>
                <p>nurse.shahina </p>
              </a>
            </div>
          </div>
        </div>

        <div className="two-sec mt-3">
          <BiCurrentLocation style={{ fontSize: "20px" }} />
          <div>
            <p className="title" style={{ fontSize: "16px" }}>
              {contact?.address}
            </p>
          </div>
        </div>

        <a href={contact?.mapLink} target="_blank">
          <button className="locate_btn">LOCATE ON GOOGLE MAPS</button>
        </a>
      </>
    )
  );
};

export default ContactComponent;
