/** @format */

// src/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const Localdata = localStorage.getItem("dummyCart");

let cartData = [];

try {
  cartData = JSON.parse(Localdata);
} catch (error) {
  console.error("Invalid JSON in localStorage:", error);
}

const initialState = {
  items: Array.isArray(cartData) ? cartData : [],
};

const DummyCart = createSlice({
  name: "dummyCart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const isProductInCart = state.items.some(
        (item) => item._id === product._id
      );
      if (!isProductInCart) {
        state.items.push(product);
        localStorage.setItem(
          "dummyCart",
          JSON.stringify([...state.items, action.payload])
        );
      } else {
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item._id !== itemId);
      localStorage.setItem("dummyCart", JSON.stringify(state.items));
    },
  },
});

export const { addToCart, removeFromCart } = DummyCart.actions;
export const DummyCartItems = (state) => state.dummyCart.items;
export default DummyCart.reducer;
