import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the slice
export const initialState = {
  count: 0,
};

// createSlice is a higher-order function that generates a slice of the Redux store
const countSlice = createSlice({
  name: "count", // The slice name
  initialState, // The initial state for the slice
  reducers: {
    increment: (state, action) => {
      // Reducer for the increment action
      state.count = state.count + 1;
    },
    decrement: (state, action) => {
      // Reducer for the decrement action
      state.count = state.count - 1;
    },
  },
});

// Extract the actions and reducer from the slice
export const { increment, decrement } = countSlice.actions;
export default countSlice.reducer;
