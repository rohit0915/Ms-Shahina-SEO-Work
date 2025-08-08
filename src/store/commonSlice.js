import { createSlice } from "@reduxjs/toolkit";

const commonSlice = createSlice({
  name: "common",
  initialState: null,
  reducers: {
    setCountries: (state, action) => {
      state.initialState = action.payload;
    },
  },
});

export const { setCountries } = commonSlice.actions;
export default commonSlice.reducer;