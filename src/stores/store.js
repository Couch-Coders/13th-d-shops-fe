import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userReducer from "./auth/authSlice";
import myInfoReducer from "./myInfoSlice";

const rootReducer = combineReducers({
  user: userReducer,
  myInfo: myInfoReducer,
});

const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  // preloadedState (서버 사이드 렌더링 전용)
});
export default store;
