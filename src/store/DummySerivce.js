/** @format */

// src/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { showMsg } from "../Repository/Api";

const Localdata = localStorage.getItem("serviceCart");

let cartData = [];

try {
  cartData = JSON.parse(Localdata);
} catch (error) {
  console.error("Invalid JSON in localStorage:", error);
}

const initialState = {
  items: Array.isArray(cartData) ? cartData : [],
};

const ServiceCart = createSlice({
  name: "serviceCart",
  initialState,
  reducers: {
    addServiceLocally: (state, action) => {
      const product = action.payload;
      const isProductInCart = state.items.some(
        (item) => item.id === product.id
      );
      if (!isProductInCart) {
        state.items.push(product);
        localStorage.setItem(
          "serviceCart",
          JSON.stringify([...state.items, action.payload])
        );
      } else {
      }
    },
    removeServiceDummy: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
      localStorage.setItem("serviceCart", JSON.stringify(state.items));
    },
  },
});

export const { addServiceLocally, removeServiceDummy } = ServiceCart.actions;
export const ServiceItems = (state) => state.serviceCart.items;
export default ServiceCart.reducer;
