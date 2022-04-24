import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../Auth/authSlice";
// Change Slice to Reducer because the export ir fooSlice.reducer
import counterReducer from "../components/counter/counterSlice";
import headerReducer from "../components/header/headerSlice";
import themeManagerReducer from "../components/managers/themeManager/themeManagerSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  counter: counterReducer,
  header: headerReducer,
  themeManager: themeManagerReducer,
});

export default rootReducer;
