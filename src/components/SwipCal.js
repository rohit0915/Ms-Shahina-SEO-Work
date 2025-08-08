/** @format */

import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getCorrectTime2 } from "../Helper/Herlper";
import FullScreenLoader from "./Loader/FullScreenLoader";
import { getCorrectTime } from "../utils/utilsFunc";
import { calenderSvg } from "../assest";
import { ImageLazyLoading } from "../utils/helpingComponent";

const SwipCal = ({
  selectedDate,
  setDate,
  slots,
  selectSlot,
  selectedSlot,
  nextDate,
  crossDates,
  loading,
}) => {
  const [generatedDates, setGeneratedDates] = useState([]);
  const [lastGeneratedDate, setLastGeneratedDate] = useState(null);
  const [currentRowContent, setCurrentRowContent] = useState([]);
  const [month, setMonth] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [checkDate, setCheckDate] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  function generateDates(startDate, numberOfDays) {
    const dates = [...generatedDates];
    let lastDate = lastGeneratedDate || startDate;

    for (let i = 0; i < numberOfDays; i++) {
      const date = new Date(lastDate);
      date.setDate(lastDate.getDate() + 1);
      dates.push(date);
      lastDate = date;
    }
    setLastGeneratedDate(lastDate);
    setGeneratedDates(dates);
  }

  const handleGenerateDates = () => {
    const oneDayBeforeToday = new Date();
    oneDayBeforeToday.setDate(oneDayBeforeToday.getDate());
    generateDates(oneDayBeforeToday, 14);
  };

  const formatDate = (date) => {
    const day = date?.toLocaleDateString("en-US", {
      day: "numeric",
    });
    const weekDay = date?.toLocaleDateString("en-US", {
      weekday: "long",
    });
    const month = date?.toLocaleDateString("en-US", {
      month: "numeric",
    });

    const year = date?.toLocaleDateString("en-US", {
      year: "numeric",
    });

    const formattedDate = `${year}-${month < 10 ? `${0}${month}` : month}-${
      day < 10 ? `${0}${day}` : day
    }`;

    const checkAvailable = crossDates?.some(
      (i) => i.date?.slice(0, 10) === formattedDate && i.allBooked === "yes"
    );

    const isCutted =
      weekDay === "Wednesday" ||
      weekDay === "Sunday" ||
      checkAvailable === true;

    return (
      <div
        className={`date_shower ${isCutted ? "cutted_date" : ""}`}
        onClick={() => {
          setDate(formattedDate);
          setCheckDate(date);
          setSelectedDay(weekDay);
        }}
      >
        <div
          className={`day_container ${
            selectedDate === formattedDate ? "active" : ""
          }   `}
        >
          <span className="day"> {day} </span>
        </div>
        <span className="weekDay"> {weekDay?.slice(0, 3)} </span>
      </div>
    );
  };

  useEffect(() => {
    handleGenerateDates();
  }, []);

  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: false,
    focusOnSelect: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    autoplay: false,
    swipeToSlide: false,
    swipe: false,
    afterChange: (current) => {
      setCurrentIndex(current);
    },
  };

  const nextSlide = () => {
    handleGenerateDates();
    sliderRef.current.slickNext();
  };

  const prevSlide = () => {
    sliderRef.current.slickPrev();
  };

  useEffect(() => {
    if (generatedDates?.length > 0) {
      if (currentIndex > 0) {
        setCurrentRowContent(
          generatedDates?.slice(currentIndex, currentIndex + 7)
        );
      } else {
        setCurrentRowContent(generatedDates?.slice(0, 7));
      }
    }
  }, [currentIndex, generatedDates]);

  useEffect(() => {
    if (currentRowContent) {
      const data = currentRowContent?.slice(-1)?.[0];
      setMonth(data);
    }
  }, [currentRowContent]);

  const getYear = new Date(month)?.toLocaleDateString("en-US", {
    year: "numeric",
  });
  const getMonth = new Date(month)?.toLocaleDateString("en-US", {
    month: "long",
  });

  function getSlot(myOne) {
    const getTime = new Date(myOne)?.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    });
    return getTime;
  }

  const nextDateDay = getCorrectTime2(nextDate)?.toLocaleDateString("en-US", {
    month: "long",
  });

  const nextDateDate = getCorrectTime2(nextDate)?.toLocaleDateString("en-US", {
    day: "numeric",
  });

  const combinedNextDate = nextDateDate + " " + nextDateDay;

  useEffect(() => {
    if (checkDate && generatedDates) {
      const finalDate = generatedDates?.slice(-1)?.[0];
      if (checkDate === finalDate) {
        handleGenerateDates();
      }
    }
  }, [checkDate, generatedDates]);

  useEffect(() => {
    if (selectedDate) {
      const myDate = getCorrectTime(selectedDate);
      const weekDay = myDate?.toLocaleDateString("en-US", {
        weekday: "long",
      });
      setSelectedDay(weekDay);
    }
  }, [selectedDate]);

  return (
    <div className="custome-fres-calender">
      {loading && <FullScreenLoader />}
      <div className="buttons_container">
        <div className="content">
          <p className="month"> {getMonth} </p>
          <p className="year"> {getYear}</p>
        </div>
        <div className="btns">
          <button onClick={prevSlide}>
            <FaChevronLeft />
          </button>
          <button onClick={nextSlide}>
            <FaChevronRight />{" "}
          </button>
        </div>
      </div>
      <Slider {...settings} ref={sliderRef} className="Slider_Here">
        {generatedDates?.map((date, i) => (
          <div className="Main_div" key={i}>
            {formatDate(date)}
          </div>
        ))}
      </Slider>

      <div className="slots">
        <ul>
          {selectedDay === "Wednesday" || selectedDay === "Sunday" ? (
            <div className="fully_booked_slots">
              <ImageLazyLoading img={calenderSvg} alt={"Closed"} />
              <h6>We're closed</h6>
              <p>but you can book for {combinedNextDate} </p>
              <button onClick={() => setDate(nextDate)}>
                Go to {combinedNextDate}{" "}
              </button>
            </div>
          ) : slots?.length > 0 ? (
            slots?.map((i, index) =>
              i.isBooked === false ? (
                <li
                  key={`slot${index}`}
                  className={`${selectedSlot === i.from ? "active" : ""}`}
                  onClick={() => selectSlot(i.from)}
                >
                  {getSlot(i.from)}
                </li>
              ) : (
                <>
                  <div className="fully_booked_slots">
                    <ImageLazyLoading img={calenderSvg} alt={"Closed"} />
                    <h6>We're fully booked</h6>
                    <p>but you can book for {combinedNextDate} </p>
                    <button onClick={() => setDate(nextDate)}>
                      Go to {combinedNextDate}{" "}
                    </button>
                  </div>
                </>
              )
            )
          ) : (
            <div className="fully_booked_slots">
              <ImageLazyLoading img={calenderSvg} alt={"Closed"} />
              <h6>We're fully booked</h6>
              <p>but you can book for {combinedNextDate} </p>
              <button onClick={() => setDate(nextDate)}>
                Go to {combinedNextDate}{" "}
              </button>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SwipCal;
