/** @format */

import { createSlice } from "@reduxjs/toolkit";

const savedData = JSON.parse(localStorage.getItem("user"));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: savedData ? true : false,
  },
  reducers: {
    Login: (state, action) => {
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    LOGOUT: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("Token");
    },
  },
});

export const { Login, LOGOUT } = authSlice.actions;

export const isAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
