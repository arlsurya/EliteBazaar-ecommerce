import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger';
import counterSlice from '../reducerSlices/counterSlice';

const store = configureStore({
  reducer: {
    count: counterSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
