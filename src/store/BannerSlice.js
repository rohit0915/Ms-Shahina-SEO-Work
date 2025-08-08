/** @format */
import { createSlice } from "@reduxjs/toolkit";

const bannerSlice = createSlice({
  name: "offer",
  initialState: {
    isOpen: true,
  },
  reducers: {
    openBanner: (state) => {
      state.isOpen = true;
    },
    closeBanner: (state) => {
      state.isOpen = false;
    },
  },
});

export const { closeBanner, openBanner } = bannerSlice.actions;

export const isBannerOpen = (state) => state.offer.isOpen;

export default bannerSlice.reducer;
