/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getApi, showMsg, updateApi } from "../../Repository/Api";
import SwipCal from "../SwipCal";
import ContactComponent from "../Contact/ContactComponent";
import FullScreenLoader from "../Loader/FullScreenLoader";
import DynamicHelmet from "../Helmet/DynamicHelmet";
import { ImageLazyLoading } from "../../utils/helpingComponent";

const Reschedule = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow?.setDate(today?.getDate() + 1);
  const formattedToday = tomorrow.toISOString().split("T")[0];
  const [date1, setDate] = useState(formattedToday);
  const [time, setTime] = useState("");
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [crossDates, setCrossDates] = useState({ allSlot: [] });
  const [nextAvailableDate, setNextAvailable] = useState();

  useEffect(() => {
    if (date1) {
      getApi({
        url: `api/v1/user/Slot/allSlot?date=${date1}&orderId=${id}`,
        setResponse,
      });
    }
  }, [date1, id]);

  const updatedTime = time?.split("T")[1]?.slice(0, 5);
  const payload = { time: updatedTime };

  const submitHandler = () => {
    const additionalFunctions = [
      (res) => navigate(`/booking-msg/rescheduled?${res?.data?.toTime}`),
    ];
    if (date1 && time) {
      updateApi({
        url: `api/v1/user/reSechduleOrderByUser/${id}/${date1}`,
        payload,
        additionalFunctions,
        setLoading,
      });
    } else {
      showMsg("", "Select Date and Time", "danger");
    }
  };

  function BackNavigation() {
    navigate(-1);
  }

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
        url: `api/v1/user/getAvailableSlotForReSechduleOrder?date=${date1}&orderId=${id}`,
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
      <DynamicHelmet />
      {loading && <FullScreenLoader />}
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
            slots={response?.data}
            selectSlot={setTime}
            selectedSlot={time}
            nextDate={nextAvailableDate}
            crossDates={crossDates?.allSlot}
          />
        </div>

        <div className="right_div">
          <div className="Box">
            <ContactComponent />
          </div>

          <button className="book" onClick={() => submitHandler()}>
            Reschedule
          </button>
        </div>
      </div>
    </>
  );
};

export default Reschedule;
