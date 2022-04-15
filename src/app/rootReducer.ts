import { combineReducers } from "@reduxjs/toolkit";
// Change Slice to Reducer because the export ir fooSlice.reducer
import counterReducer from "../components/counter/counterSlice";
import headerReducer from "../components/header/headerSlice";
import themeManagerReducer from "../components/managers/themeManager/themeManagerSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  themeManager: themeManagerReducer,
  header: headerReducer,
});

export default rootReducer;
