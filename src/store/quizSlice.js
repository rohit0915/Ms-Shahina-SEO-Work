/** @format */

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  step: 1,
  isQuizOpen: false,
};
const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    increaseStep: (state) => {
      state.step++;
    },
    decreaseStep: (state) => {
      state.step--;
    },
    openQuiz: (state) => {
      state.isQuizOpen = !state.isQuizOpen;
    },
  },
});

export const { increaseStep, openQuiz } = quizSlice.actions;
export const selectIsQuizOpen = (state) => state.quiz.isQuizOpen;

export default quizSlice.reducer;
