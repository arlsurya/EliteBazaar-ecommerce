import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import counterSlice from '../reducerSlices/counterSlice'
import logger from 'redux-logger'

const reducer = combineReducers({
  count: counterSlice,

});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
