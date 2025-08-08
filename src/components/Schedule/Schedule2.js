/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllSlot,
  getApi,
  getCart,
  showMsg,
  TimeandSlot,
} from "../../Repository/Api";
import SwipCal from "../SwipCal";
import ContactComponent from "../Contact/ContactComponent";
import DynamicHelmet from "../Helmet/DynamicHelmet";
import { ImageLazyLoading } from "../../utils/helpingComponent";
import endPoints from "../../Repository/apiConfig";

const Schedule2 = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState({});
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow?.setDate(today?.getDate() + 1);
  const formattedToday = tomorrow.toISOString().split("T")[0];
  const [date1, setDate] = useState(formattedToday);
  const [time, setTime] = useState("");
  const [response, setResponse] = useState([]);
  const [crossDates, setCrossDates] = useState({ allSlot: [] });
  const [nextAvailableDate, setNextAvailable] = useState();
  const [loading, setLoading] = useState(false);
  const [metaResponse, setMetaResponse] = useState(null);

  const fetchMetaTags = () => {
    getApi({
      url: endPoints.metaTags.confirmAppointmentPage,
      setResponse: setMetaResponse,
    });
  };

  const getHandler = () => {
    const date = date1;
    getAllSlot(setResponse, date, setLoading);
  };

  useEffect(() => {
    if (date1) {
      getHandler();
    }
  }, [date1]);

  const updatedTime = time?.split("T")[1]?.slice(0, 5);
  const payload = { date: date1, time: updatedTime };

  const submitHandler = () => {
    if (date1 && time) {
      TimeandSlot(payload, navigate);
    } else {
      showMsg("", "Select Date and Time", "danger");
    }
  };

  function BackNavigation() {
    navigate(-1);
  }
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  const fetchCart = () => {
    getCart(setCart);
  };

  useEffect(() => {
    fetchCart();
    fetchMetaTags();
  }, []);

  function formatDate(date) {
    if (date) {
      const custome = new Date(date);
      const year = custome.getFullYear();
      const month = String(custome.getMonth() + 1).padStart(2, "0");
      const day = String(custome.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
  }

  useEffect(() => {
    if (date1) {
      getApi({
        url: `api/v1/admin/Slot/getAvailableSlotOnwhichDate?date=${date1}`,
        setResponse: setCrossDates,
      });
    }
  }, [date1]);

  const findNextAvailableDate = (date) => {
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);

    const isDate = crossDates?.allSlot?.some(
      (i) =>
        new Date(i.date).toISOString().split("T")[0] ===
          nextDay.toISOString().split("T")[0] && i.allBooked === "yes"
    );

    if (isDate) {
      return findNextAvailableDate(nextDay);
    }
    return nextDay.toISOString().split("T")[0];
  };

  useEffect(() => {
    if (crossDates && crossDates?.allSlot?.length > 0) {
      const formattedSelectedDate = formatDate(new Date(date1));
      const isDateBooked = crossDates?.allSlot?.some(
        (d) => formatDate(new Date(d.date)) === formattedSelectedDate
      );

      if (isDateBooked) {
        setNextAvailable(findNextAvailableDate(new Date(date1)));
      }
    }
  }, [crossDates, date1]);

  return (
    <>
      {metaResponse && (
        <DynamicHelmet
          title={metaResponse?.data?.title}
          description={metaResponse?.data?.description}
        />
      )}
      <div className="Backward_Heading step_Heading">
        <div>
          <ImageLazyLoading
            img={"/Image/1.png"}
            alt={"Go Back"}
            onClick={() => BackNavigation()}
            className={"text-[10px]"}
          />
          <p style={{ width: "50%" }}>STEP 2 OF 3</p>
        </div>
        <p className="title">Select Time</p>
      </div>

      <div className="schedule_1">
        <div className="left_div">
          <SwipCal
            selectedDate={date1}
            setDate={setDate}
            slots={response}
            selectSlot={setTime}
            selectedSlot={time}
            nextDate={nextAvailableDate}
            crossDates={crossDates?.allSlot}
            loading={loading}
          />
        </div>

        <div className="right_div">
          <div className="Box">
            <ContactComponent />

            {/* Service */}
            {cart?.services?.map((i, index) => (
              <div className="Items" key={index}>
                <div className="two-div">
                  <p className="head"> {i?.serviceId?.name} </p>
                  <p className="head">
                    {" "}
                    $
                    {i?.serviceId?.discountActive === true
                      ? i?.serviceId?.discountPrice
                      : i?.serviceId?.price}{" "}
                  </p>
                </div>
              </div>
            ))}

            {/* Ad on Service */}
            {cart?.AddOnservicesSchema?.map((i, index) => (
              <div className="Items" key={index}>
                <div className="two-div">
                  <p className="head"> {i?.addOnservicesId?.name} </p>
                  <p className="head"> ${i.addOnservicesId?.price}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="book" onClick={() => submitHandler()}>
            BOOK NOW
          </button>
        </div>
      </div>
    </>
  );
};

export default Schedule2;
