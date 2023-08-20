import { createSlice } from "@reduxjs/toolkit";


export const initialState = {
  count: 0,
};

const countSlice = createSlice({
  name: "count", 
  initialState,
  reducers: {
    increment: (state, action) => {
      state.count = state.count + 1;
    },
    decrement: (state, action) => {
      state.count = state.count - 1;
    },
  },
});

export const { increment, decrement } = countSlice.actions;
export default countSlice.reducer;
