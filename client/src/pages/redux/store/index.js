import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import counterSlice from '../reducerSlices/counterSlice'
import userSlice from "../reducerSlices/userSlice";
import logger from 'redux-logger'
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  counter: counterSlice,
  user: userSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [ logger];

export const store = configureStore({
  reducer: persistedReducer,
  middleware,
});

export const persistor = persistStore(store); 

export default store;
