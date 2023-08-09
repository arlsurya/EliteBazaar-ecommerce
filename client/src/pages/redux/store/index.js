import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userSlice from "../reducerSlices/userSlice"

const reducer = combineReducers({
  user: userSlice,
//other slices will be here
});


const store = configureStore({
    reducer,
});

export default store;