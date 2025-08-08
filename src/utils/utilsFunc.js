/** @format */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PhoneNumberFormatter = (value) => {
  const number = value;
  const countryCode = number?.slice(0, 1);
  const bracketCode = number?.slice(1, 4);
  const another = number?.slice(4, 7);
  const remaining = number?.slice(7);
  return `+${countryCode}(${bracketCode})${another}-${remaining}`;
};

const DateOfBirthFormat = (e, setValue) => {
  let value = e.target.value;
  value = value.replace(/\D/g, "");
  if (value.length > 2 && value.length <= 4) {
    value = `${value.slice(0, 2)}/${value.slice(2)}`;
  } else if (value.length > 4) {
    value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4, 8)}`;
  }
  setValue(value);
};

const getCorrectTime = (time) => {
  const updateTime = new Date(time);
  const timezoneOffset = updateTime?.getTimezoneOffset();
  const adjustedTime = new Date(updateTime.getTime() + timezoneOffset * 60000);
  return adjustedTime;
};

const checkServiceTime = (date, setShowBtn) => {
  const orderDate = getCorrectTime(date);
  const currentDate = new Date();
  const timeDifferenceInMilliseconds = Math.abs(
    orderDate.getTime() - currentDate.getTime()
  );
  const timeDifferenceInHours = timeDifferenceInMilliseconds / (1000 * 60 * 60);
  if (timeDifferenceInHours < 48) {
    setShowBtn(true);
  } else {
    setShowBtn(false);
  }
};

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

const debouncedSetQuery = (term, setQuery) => {
  clearTimeout(debouncedSetQuery.timeoutId);
  debouncedSetQuery.timeoutId = setTimeout(() => {
    setQuery(term);
  }, 500);
};

export {
  checkServiceTime,
  ScrollToTop,
  DateOfBirthFormat,
  PhoneNumberFormatter,
  debouncedSetQuery,
  getCorrectTime,
};
