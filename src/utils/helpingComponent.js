/** @format */

import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { lazy } from "react";

export const Header = ({ heading, styles }) => {
  const navigate = useNavigate();
  return (
    <header className="relative Heading_Container_Second ">
      <h1
        className={`text-6xl  py-14 ${styles ? styles : "font-light"
          }  text-center  text-primary`}
      >
        {heading}
      </h1>
      <div className="absolute top-0 bottom-0 py-14 left-12 img-container">
        <img
          onClick={() => navigate(-1)}
          className="cursor-pointer"
          src="/asessts/back-button.svg"
          alt="back-button"
          loading="lazy"
        />
      </div>
    </header>
  );
};

export const PrimaryButton = ({ btnName, styles }) => {
  return (
    <button
      className={`w-96 py-6 ${styles ? styles : "bg-secondary text-primary"
        } text-2xl font-bold`}
    >
      {btnName}
    </button>
  );
};

export const ValidInput = ({ props }) => {
  const { label, placeholder, type, register, name } = props;

  return (
    <label
      htmlFor={label}
      className="w-full flex flex-col gap-5 font-medium text-2xl text-secondary"
    >
      {label}
      <input
        type={type}
        placeholder={placeholder}
        id={label}
        {...register(name, { required: true })}
        className="w-full py-6 appearance-none px-12 border-none text-gray-700"
      />
    </label>
  );
};

export const ImageLazyLoading = ({ img = "", className, alt, onClick }) => {

  return (
    <img
      src={img}
      alt={alt}
      className={className}
      loading="lazy"
      onClick={onClick}
      width="150"
      height="150"
    />
  );
};


export const DateFormatter = (date) => {
  const original = new Date(date);
  const month = original.getMonth() + 1;
  const day = original.getDate();
  const year = original.getFullYear();
  const hasAll = month && year && day;
  return (
    hasAll &&
    `${month <= 9 ? `0${month}` : month}-${day <= 9 ? `0${day}` : day
    }-${year}  `
  );
};

export const DOBFormater = (date) => {
  const slicedDate = date?.slice(0, 10);
  const splittedDate = slicedDate?.split("-");
  const month = splittedDate?.[1];
  const day = splittedDate?.[2];
  const year = splittedDate?.[0];
  const hasAll = month && year && day;
  return hasAll && `${month}-${day}-${year}`;
};
