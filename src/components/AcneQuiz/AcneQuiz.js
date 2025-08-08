/** @format */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { openQuiz } from "../../store/quizSlice";
import { useDispatch } from "react-redux";
import { ImageLazyLoading } from "../../utils/helpingComponent";

const AcneQuiz = ({ onClose }) => {
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function ValidateEmial(userEmail) {
    if (isValidEmail(userEmail)) {
      setIsValid(true);
      localStorage.setItem("acneEmail", userEmail);
    } else {
      setIsValid(false);
      localStorage.setItem("acneEmail", "");
    }
  }

  return (
    <div
      className="fixed flex flex-col items-center justify-center   Quiz_Input_Handler Acne_Quiz_Container "
      style={{ minHeight: "100vh" }}
    >
      <h1 className="text-[4rem] font-light text-primary">
        Enter your Email to Start!
      </h1>
      <div className="flex flex-col gap-32 items-center justify-center mt-44 Input_Cont">
        <input
          className="w-[50rem] py-5 px-14 border border-black outline-none "
          type="text"
          placeholder="Enter your Email"
          onChange={(e) => ValidateEmial(e.target.value)}
        />{" "}
        {isValid ? (
          <Link
            onClick={() => {
              dispatch(openQuiz());
              onClose();
            }}
            to={"/acnequiz"}
            
          >
            <button className="w-[31rem] bg-primary text-darkSecondary text-2xl font-bold py-5">
              NEXT
            </button>
          </Link>
        ) : (
          <button
            className="w-[31rem]  text-darkSecondary text-2xl font-bold py-5"
            style={{ background: "rgb(235, 235, 228)" }}
            disabled
          >
            NEXT
          </button>
        )}
      </div>
      <div className="acne_quiz_close_btn">
        <ImageLazyLoading
          img={"/Image/14.png"}
          alt={"Close"}
          className={"text-[10px]"}
          onClick={() => {
            dispatch(openQuiz());
            onClose();
          }}
        />
      </div>
    </div>
  );
};

export default AcneQuiz;
